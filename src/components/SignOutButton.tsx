import { signOut } from "next-auth/react";

interface Props {
  ClassName?: string;
}

export default function SignOutButton({ ClassName }: Props) {
  return (
    <>
      <button
        onClick={() => signOut()}
        className={`${ClassName} bg-slate-900 px-4 py-1 text-xl text-purple-200 border-2 border-purple-300 rounded-xl ease-in duration-200 hover:bg-slate-950`}
      >
        LogOut
      </button>
    </>
  );
}
