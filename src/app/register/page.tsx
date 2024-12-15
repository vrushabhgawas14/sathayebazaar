"use client";
import LoginRegisterForm from "@/components/LoginRegisterForm";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Register() {
  const [error, setError] = useState("");
  const [greenText, setGreenText] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/shops");
    }
  }, [session, router]);

  if (session) return <p className="text-center py-20 text-3xl">Loading...</p>;

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
        setError("Verifying...");
        setGreenText("Verifying...");
      }

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

      if (res.status === 201) {
        // All Ok, User Registered
        await setError(data.message);
        setGreenText(data.message);
        signIn("credentials", { redirect: false, email, password });
        setTimeout(() => router.replace("/profile"), 700);
      }

      if (res.status === 400 || res.status === 500) {
        // User is Already Registered || Error in Connecting to Database
        await setError(data.message);
      }
      // eslint-disable-next-line
    } catch (err: any) {
      // Something might went wrong with fetching json or else.
      setError("Error := " + err.message);
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
