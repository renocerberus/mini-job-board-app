"use client";

import TextField from "@/components/TextField";
import Button from "./Button";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignInForm({
  onChangeMode,
  onClose,
}: {
  onChangeMode: (mode: "signin" | "signup") => void;
  onClose?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        alert(error.message);
      } else {
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('session', JSON.stringify(data.session));
        
        // Close modal if onClose function is provided
        if (onClose) {
          onClose();
        }
        
        // Redirect to dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      alert('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
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
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
      />
      <div className="flex flex-col gap-4 mt-10">
        <Button
          type="primary"
          onClick={handleSignIn}
          label={isLoading ? "Signing In..." : "Sign In"}
          disabled={isLoading}
        />
        <p className="text-center text-base">
          Don&apos;t have an account?{" "}
          <span
            className="text-tertiary font-semibold cursor-pointer"
            onClick={() => onChangeMode("signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
