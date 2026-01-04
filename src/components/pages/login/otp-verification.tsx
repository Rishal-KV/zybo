"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OTPInput, SlotProps } from "input-otp";
import { Pencil } from "lucide-react";

interface OtpVerificationProps {
    phoneNumber: string;
    onBack: () => void;
    onVerify: (otp: string) => void;
    serverOtp?: string | null;
}

const OtpVerification = ({
    phoneNumber,
    onBack,
    onVerify,
    serverOtp,
}: OtpVerificationProps) => {
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(34);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const handleVerify = () => {
        onVerify(otp);
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-2 relative p-4 rounded-lg bg-black/40">
                <h2 className="text-white text-[28px] font-semibold text-center mb-2">
                    Verify phone
                </h2>
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <span>Enter the OTP sent to {phoneNumber}</span>
                    <button onClick={onBack} className="hover:text-white transition-colors">
                        <Pencil size={14} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4 relative p-6 rounded-lg bg-black/40">
                <label className="text-white text-sm font-medium">Enter OTP</label>

                <div className="flex justify-center w-full my-4">
                    <OTPInput
                        maxLength={4}
                        value={otp}
                        onChange={setOtp}
                        render={({ slots }) => (
                            <div className="flex gap-4">
                                {slots.map((slot, idx) => (
                                    <Slot key={idx} {...slot} />
                                ))}
                            </div>
                        )}
                    />
                </div>

                {serverOtp && (
                    <div className="text-green-500 text-sm text-center font-medium">
                        Your OTP is: {serverOtp}
                    </div>
                )}

                <div className="text-gray-500 text-sm">
                    Resend OTP in <span className="text-white font-medium">{timer}s</span>
                </div>

                <Button
                    onClick={handleVerify}
                    className="bg-white text-black p-6 w-full hover:bg-gray-200 transition-colors cursor-pointer mt-4 font-semibold text-lg"
                >
                    Verify
                </Button>
            </div>
        </div>
    );
};

function Slot(props: SlotProps) {
    return (
        <div
            className={`relative w-16 h-16 text-[2rem] flex items-center justify-center transition-all duration-300
      bg-[#1a1a1a] rounded-lg border border-transparent
      ${props.isActive ? "border-white ring-1 ring-white/20" : ""}
      ${props.hasFakeCaret ? "caret-blink" : ""}
    `}
        >
            <div className="text-white font-medium">
                {props.char !== null && <div>{props.char}</div>}
                {props.hasFakeCaret && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[1px] h-8 bg-white/70 animate-caret-blink" />
                    </div>
                )}
                {props.char === null && !props.hasFakeCaret && (
                    <div className="text-gray-600">-</div>
                )}
            </div>
        </div>
    );
}

export default OtpVerification;
