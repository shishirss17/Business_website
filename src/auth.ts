import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import Otp from "@/models/Otp"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        // --- Provider 1: Email + Password ---
        Credentials({
            id: "email-password",
            name: "Email and Password",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                await dbConnect();
                const email = credentials.email as string;
                const password = credentials.password as string;

                if (!email || !password) {
                    throw new Error("Missing email or password");
                }

                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("User not found");
                }

                if (!user.password) {
                    throw new Error("Invalid credentials");
                }

                const bcrypt = require('bcryptjs');
                const isValid = await bcrypt.compare(password, user.password);

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
                };
            },
        }),

        // --- Provider 2: Mobile OTP ---
        Credentials({
            id: "mobile-otp",
            name: "Mobile OTP",
            credentials: {
                phoneNumber: { label: "Phone Number", type: "tel" },
                otp: { label: "OTP", type: "text" },
            },
            authorize: async (credentials) => {
                await dbConnect();
                const phoneNumber = credentials.phoneNumber as string;
                const otp = credentials.otp as string;

                if (!phoneNumber || !otp) {
                    throw new Error("Phone number and OTP are required");
                }

                // Find the stored OTP record
                const otpRecord = await Otp.findOne({ phoneNumber });

                if (!otpRecord) {
                    throw new Error("OTP not found or already used. Please request a new one.");
                }

                // Check expiry
                if (new Date() > otpRecord.expiresAt) {
                    await Otp.deleteOne({ _id: otpRecord._id });
                    throw new Error("OTP has expired. Please request a new one.");
                }

                // Compare OTP using timing-safe comparison
                const crypto = require('crypto');
                const isMatch = crypto.timingSafeEqual(
                    Buffer.from(otpRecord.code),
                    Buffer.from(otp)
                );

                if (!isMatch) {
                    throw new Error("Invalid OTP");
                }

                // Delete the used OTP immediately (one-time use)
                await Otp.deleteOne({ _id: otpRecord._id });

                // Find the user linked to this phone number
                const user = await User.findOne({ phoneNumber });
                if (!user) {
                    throw new Error("No account found for this phone number");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
                };
            },
        }),
    ],
})
