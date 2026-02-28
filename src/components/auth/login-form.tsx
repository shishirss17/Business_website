"use client"

import { useState, useRef, useEffect } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { registerUser } from "@/actions/auth-actions"
import { Loader2, AlertCircle, CheckCircle2, Mail, Phone, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LoginFormProps {
    onSuccess?: () => void;
}

type LoginTab = "email" | "mobile"
type MobileStep = "phone" | "otp"

// ─── OTP Input: 6 individual boxes ───────────────────────────────────────────
function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const inputs = useRef<Array<HTMLInputElement | null>>([])

    const handleChange = (index: number, char: string) => {
        const digits = value.split("")
        // Handle paste of full OTP
        if (char.length > 1) {
            const pasted = char.replace(/\D/g, "").slice(0, 6)
            onChange(pasted.padEnd(6, " ").trim())
            inputs.current[Math.min(pasted.length, 5)]?.focus()
            return
        }
        const digit = char.replace(/\D/g, "")
        digits[index] = digit
        onChange(digits.join(""))
        if (digit && index < 5) inputs.current[index + 1]?.focus()
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace") {
            const digits = value.split("")
            if (!digits[index] && index > 0) {
                inputs.current[index - 1]?.focus()
            }
            digits[index] = ""
            onChange(digits.join(""))
        }
    }

    return (
        <div className="flex gap-2 justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
                <input
                    key={i}
                    ref={el => { inputs.current[i] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={value[i] || ""}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    onFocus={e => e.target.select()}
                    className="w-11 h-12 text-center text-lg font-bold border-2 rounded-lg
                               bg-background border-input focus:border-primary focus:ring-2
                               focus:ring-primary/20 outline-none transition-all"
                    aria-label={`OTP digit ${i + 1}`}
                />
            ))}
        </div>
    )
}

// ─── Main LoginForm ───────────────────────────────────────────────────────────
export function LoginForm({ onSuccess }: LoginFormProps) {
    const [activeTab, setActiveTab] = useState<LoginTab>("email")
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    // Mobile OTP state
    const [mobileStep, setMobileStep] = useState<MobileStep>("phone")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [countdown, setCountdown] = useState(0)

    // Countdown timer for OTP resend
    useEffect(() => {
        if (countdown <= 0) return
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
        return () => clearTimeout(timer)
    }, [countdown])

    const resetState = () => {
        setError("")
        setSuccessMsg("")
        setLoading(false)
    }

    const switchTab = (tab: LoginTab) => {
        setActiveTab(tab)
        setMobileStep("phone")
        setPhoneNumber("")
        setOtp("")
        resetState()
    }

    // ── Email/Password submit ───────────────────────────────────────────────
    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccessMsg("")

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            if (isLogin) {
                const res = await signIn("email-password", {
                    email,
                    password,
                    redirect: false,
                })
                if (res?.error) {
                    setError("Invalid email or password")
                } else {
                    onSuccess ? onSuccess() : window.location.reload()
                }
            } else {
                const res = await registerUser(formData)
                if (res.success) {
                    setIsLogin(true)
                    setSuccessMsg("Registration successful! Please login.")
                } else {
                    setError(res.message || "Registration failed")
                }
            }
        } catch {
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // ── Send OTP ─────────────────────────────────────────────────────────────
    const handleSendOtp = async () => {
        if (!phoneNumber) {
            setError("Please enter your mobile number")
            return
        }

        // Normalize: if user enters 10-digit Indian number, add +91
        let normalizedPhone = phoneNumber.trim()
        if (/^\d{10}$/.test(normalizedPhone)) {
            normalizedPhone = `+91${normalizedPhone}`
        } else if (/^0\d{10}$/.test(normalizedPhone)) {
            normalizedPhone = `+91${normalizedPhone.slice(1)}`
        }

        setLoading(true)
        setError("")
        setSuccessMsg("")

        try {
            const res = await fetch("/api/otp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: normalizedPhone }),
            })
            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Failed to send OTP")
            } else {
                setPhoneNumber(normalizedPhone)
                setMobileStep("otp")
                setCountdown(60)
                setSuccessMsg("OTP sent! Check your messages.")
            }
        } catch {
            setError("Network error. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // ── Verify OTP and sign in ───────────────────────────────────────────────
    const handleOtpVerify = async () => {
        const cleanOtp = otp.replace(/\s/g, "")
        if (cleanOtp.length !== 6) {
            setError("Please enter the complete 6-digit OTP")
            return
        }

        setLoading(true)
        setError("")
        setSuccessMsg("")

        try {
            const res = await signIn("mobile-otp", {
                phoneNumber,
                otp: cleanOtp,
                redirect: false,
            })

            if (res?.error) {
                setError("Invalid or expired OTP. Please try again.")
            } else {
                setSuccessMsg("Login successful!")
                setTimeout(() => {
                    onSuccess ? onSuccess() : window.location.reload()
                }, 500)
            }
        } catch {
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="border-0 shadow-none w-full max-w-sm mx-auto">
            <CardHeader className="px-0">
                <CardTitle className="text-2xl">
                    {activeTab === "email"
                        ? (isLogin ? "Login" : "Create Account")
                        : "Login with Mobile"}
                </CardTitle>
                <CardDescription>
                    {activeTab === "email"
                        ? (isLogin ? "Enter your email and password to sign in" : "Create an account to get started")
                        : mobileStep === "phone"
                            ? "Enter your registered mobile number"
                            : `OTP sent to ${phoneNumber}`}
                </CardDescription>
            </CardHeader>

            <CardContent className="px-0 space-y-5">
                {/* ── Tab Switcher ── */}
                <div className="flex rounded-lg border border-input p-1 bg-muted/50">
                    <button
                        type="button"
                        onClick={() => switchTab("email")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === "email"
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <Mail className="h-4 w-4" />
                        Email
                    </button>
                    <button
                        type="button"
                        onClick={() => switchTab("mobile")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === "mobile"
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <Phone className="h-4 w-4" />
                        Mobile OTP
                    </button>
                </div>

                {/* ── Alert Messages ── */}
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {successMsg && (
                    <Alert className="border-green-200 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription>{successMsg}</AlertDescription>
                    </Alert>
                )}

                {/* ══════════════ EMAIL TAB ══════════════ */}
                {activeTab === "email" && (
                    <>
                        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                            {!isLogin && (
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        required={!isLogin}
                                        disabled={loading}
                                    />
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLogin ? "Login" : "Register"}
                            </Button>
                        </form>

                        <div className="text-center text-sm">
                            <button
                                type="button"
                                onClick={() => { setIsLogin(!isLogin); resetState() }}
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                            </button>
                        </div>
                    </>
                )}

                {/* ══════════════ MOBILE OTP TAB ══════════════ */}
                {activeTab === "mobile" && (
                    <div className="flex flex-col gap-4">
                        {/* Step 1: Phone Input */}
                        {mobileStep === "phone" && (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Mobile Number</Label>
                                    <div className="flex gap-2">
                                        <div className="flex items-center border rounded-md px-3 bg-muted text-muted-foreground text-sm font-medium select-none">
                                            +91
                                        </div>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="9876543210"
                                            value={phoneNumber.startsWith("+91") ? phoneNumber.slice(3) : phoneNumber}
                                            onChange={e => setPhoneNumber(e.target.value)}
                                            maxLength={10}
                                            disabled={loading}
                                            className="flex-1"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Enter the 10-digit number linked to your account
                                    </p>
                                </div>

                                <Button
                                    type="button"
                                    className="w-full"
                                    onClick={handleSendOtp}
                                    disabled={loading || phoneNumber.replace(/\D/g, "").length < 10}
                                >
                                    {loading ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending OTP...</>
                                    ) : (
                                        <>Send OTP <Phone className="ml-2 h-4 w-4" /></>
                                    )}
                                </Button>
                            </>
                        )}

                        {/* Step 2: OTP Verification */}
                        {mobileStep === "otp" && (
                            <>
                                <div className="grid gap-3">
                                    <Label className="text-center block">Enter 6-digit OTP</Label>
                                    <OtpInput value={otp} onChange={setOtp} />
                                    <p className="text-xs text-muted-foreground text-center">
                                        OTP sent to <span className="font-semibold text-foreground">{phoneNumber}</span>
                                    </p>
                                </div>

                                <Button
                                    type="button"
                                    className="w-full"
                                    onClick={handleOtpVerify}
                                    disabled={loading || otp.replace(/\s/g, "").length !== 6}
                                >
                                    {loading ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</>
                                    ) : (
                                        "Verify & Login"
                                    )}
                                </Button>

                                <div className="flex items-center justify-between text-sm">
                                    <button
                                        type="button"
                                        onClick={() => { setMobileStep("phone"); setOtp(""); resetState() }}
                                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <ArrowLeft className="h-3.5 w-3.5" /> Change number
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => { setCountdown(0); setMobileStep("phone") }}
                                        disabled={countdown > 0}
                                        className={`transition-colors ${countdown > 0
                                                ? "text-muted-foreground cursor-not-allowed"
                                                : "text-primary hover:underline"
                                            }`}
                                    >
                                        {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
