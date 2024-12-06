"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session, router]);

  if (!session)
    return <p className="text-center py-20 text-5xl">Please Login!</p>;

  return (
    <>
      <main className="text-center py-20">
        <div className="py-2 text-3xl">Hello {session.user?.email}</div>
      </main>
    </>
  );
}
