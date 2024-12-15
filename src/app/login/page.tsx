"use client";
import LoginRegisterForm from "@/components/LoginRegisterForm";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
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
        setError("Authenticating...");
        setGreenText("Authenticating...");
      }

      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (response?.error) {
        // User doesn't exist! || Error Connecting to DB || Invalid Password
        await setError(response.error);
      }

      if (response?.ok) {
        // All Ok, User Login Done
        await setError("Login Successfull!");
        setGreenText("Login Successfull!");
        setTimeout(() => router.replace("/profile"), 500);
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
