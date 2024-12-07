import Link from "next/link";

interface Props {
  onClick?: () => void;
  text: string;
  url: string;
}

export default function Button({ onClick, text, url }: Props) {
  return (
    <>
      <Link
        href={url}
        onClick={onClick}
        className="bg-slate-900 px-4 py-1 text-xl text-purple-200 border-2 border-purple-300 rounded-xl ease-in duration-200 hover:bg-slate-950"
      >
        {text}
      </Link>
    </>
  );
}
