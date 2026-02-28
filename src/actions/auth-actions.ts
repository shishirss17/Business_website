'use server'

import dbConnect from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function registerUser(formData: FormData) {
    await dbConnect();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    if (!email || !password) {
        return { success: false, message: "Email and password are required" };
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return { success: false, message: "User already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
        email,
        password: hashedPassword,
        name,
        role: 'user'
    });

    return { success: true, message: "User created successfully" };
}
