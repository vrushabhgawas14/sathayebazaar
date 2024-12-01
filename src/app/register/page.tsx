"use client";
import LoginRegisterForm from "@/components/LoginRegisterForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [error, setError] = useState("");
  const router = useRouter();

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
      setError("Email is not Invalid.");
      return;
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
        setError("");
        router.push("/");
      }
      console.log(error);
    } catch (error) {
      setError("Error, try Again" + error);
      console.log(error);
    }
  };
  return (
    <>
      <LoginRegisterForm handleSubmit={handleSubmit} error={error} />
    </>
  );
}
