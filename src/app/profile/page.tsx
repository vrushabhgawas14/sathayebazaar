"use client";
import Button from "@/components/Button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
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
      <main className="text-center pt-20 pb-5">
        <div className="flex items-center justify-center">
          {session.user?.image && (
            <Image
              height={100}
              width={100}
              src={session.user?.image}
              alt="My Image"
              className="border-2 border-background-start rounded-3xl"
            />
          )}
        </div>
        <div className="py-2 pt-4 px-2 text-3xl sm:text-2xl">
          Hello {session.user?.name || session.user?.email}
        </div>
        <p className="sm:text-xl text-3xl font-bold pt-10">
          Welcome to Athawda Bazaar!
        </p>
        <p className="text-lg mt-2 sm:px-4">
          We hope you&apos;re having a great experience.
        </p>
        <p className="text-md italic mt-4">
          &quot;The best time to shop is now!&quot;
        </p>
        <div className=" flex justify-center items-center text-center w-full pt-4">
          <Link
            href={"/shops"}
            className="normalButton flex justify-center items-center space-x-2 px-4 py-2 text-xl sm:text-lg leading-tight tracking-widest text-gray-300 hover:text-gray-100 rounded-lg border-2 border-slate-950"
          >
            View Top Rated Shops!
          </Link>
        </div>
        <div className="mt-10 text-sm">
          <p>
            Need help? Visit our{" "}
            <Link
              href="/support"
              target="_blank"
              className="text-blue-900 underline"
            >
              Support Page
            </Link>
            .
          </p>
        </div>
        <div className="pt-10">
          <Button text="LogOut" url="/" onClick={signOut} />
        </div>
      </main>
    </>
  );
}
