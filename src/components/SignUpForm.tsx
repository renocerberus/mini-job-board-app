"use client";

import TextField from "@/components/TextField";
import Button from "./Button";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SignUpForm({
  onChangeMode,
}: {
  onChangeMode: (mode: "signin" | "signup") => void;
}) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    supabase.auth
      .signUp({
        email,
        password,
        options: {
          data: {
            company_name: companyName,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.message);
        } else {
          alert("Sign up successful");
          onChangeMode("signin");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="flex flex-col gap-2 w-full h-full mt-10 overflow-y-scroll">
      <TextField
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
      />
      <TextField
        label="Company Name"
        type="string"
        placeholder="Enter your company name"
        value={companyName}
        onChange={setCompanyName}
      />
      <TextField
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
      />
      <TextField
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      <div className="flex flex-col gap-4 mt-10">
        <Button
          type="primary"
          onClick={handleSignUp}
          label={isLoading ? "Signing Up..." : "Sign Up"}
          disabled={isLoading}
        />
        <p className="text-center text-base">
          Already have an account?{" "}
          <span
            className="text-tertiary font-semibold cursor-pointer"
            onClick={() => onChangeMode("signin")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
