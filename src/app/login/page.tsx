"use client";
import LoginRegisterForm from "@/components/LoginRegisterForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState("");
  const [greenText, setGreenText] = useState("");
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("userEmail")?.toString().toLowerCase();
      const password = formData.get("userPassword");

      if (!isValidEmail(email!)) {
        setError("Invalid Email.");
        return;
      } else {
        setError("Authenticating...");
        setGreenText("Authenticating...");
      }

      const res = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        // All Ok, User Login Done
        await setError(data.message);
        setGreenText(data.message);
        setTimeout(() => router.replace("/profile"), 700);
      }

      if (res.status === 400) {
        // User doesn't exist.
        await setError(data.message);
      }

      if (res.status === 500) {
        // Error in Connecting to Database
        await setError(data.message);
      }
    } catch (err) {
      // Something might went wrong with fetching json or else.
      setError("Error in Fetching Details as JSON  = " + err);
    }
  };

  return (
    <>
      <LoginRegisterForm
        isLogin={true}
        handleSubmit={handleSubmit}
        error={error}
        greenText={greenText}
      />
    </>
  );
}
