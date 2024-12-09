"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
    return <p className="text-center py-20 text-3xl">Loading...!</p>;

  return (
    <>
      <main className="text-center py-20">
        <div className="py-2 text-3xl">
          Hello {session.user?.name || session.user?.email}
        </div>
        {session.user?.image && (
          <Image
            height={200}
            width={200}
            src={session.user?.image}
            alt="My Image"
          />
        )}
      </main>
    </>
  );
}
