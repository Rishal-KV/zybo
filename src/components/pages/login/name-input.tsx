"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import { useState } from "react";

const nameSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

type NameFormValues = z.infer<typeof nameSchema>;

interface NameInputProps {
    phoneNumber: string;
    onRegisterSuccess: () => void;
}

const NameInput = ({ phoneNumber, onRegisterSuccess }: NameInputProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NameFormValues>({
        resolver: zodResolver(nameSchema),
    });

    const { registerUser, loading, error: apiError } = useRegisterUser();

    const onSubmit = async (data: NameFormValues) => {
        const response = await registerUser({
            name: data.name,
            phone_number: phoneNumber,
            unique_id: "guest_cart_id", // Using placeholder as per request context
        });

        if (response) {
            onRegisterSuccess();
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-2 relative p-4 rounded-lg bg-black/40 text-center">
                <h2 className="text-white text-[28px] font-semibold mb-2">
                    Welcome, You are?
                </h2>
            </div>

            <div className="flex flex-col gap-4 relative p-6 rounded-lg bg-black/40">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-medium">Name</label>
                        <Input
                            {...register("name")}
                            className="bg-[#1a1a1a] border-0 p-6 placeholder:text-gray-600 placeholder:text-[15px] placeholder:font-normal text-white"
                            placeholder="Eg: John Mathew"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    {apiError && (
                        <p className="text-red-500 text-sm text-center">{apiError}</p>
                    )}

                    <Button
                        type="submit"
                        className="bg-white text-black p-6 w-full hover:bg-gray-200 transition-colors cursor-pointer font-semibold text-lg"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Continue"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default NameInput;
