"use client";
import LoginRegisterForm from "@/components/LoginRegisterForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [greenText, setGreenText] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form[0] as HTMLInputElement).value;
    const password = (form[1] as HTMLInputElement).value;

    if (!isValidEmail(email)) {
      setError("Invalid Email.");
      return;
    } else {
      setError("verifying...");
      setGreenText("verifying...");
    }
    try {
      const res = await fetch("api/register", {
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

      if (res.status === 400) {
        setError(data.message);
      }

      if (res.status === 200) {
        await setError(data.message);
        setGreenText(data.message);
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (err) {
      setError(err + "");
    }
  };
  return (
    <>
      <LoginRegisterForm
        handleSubmit={handleSubmit}
        error={error}
        greenText={greenText}
      />
    </>
  );
}
