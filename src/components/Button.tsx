import Link from "next/link";

interface Props {
  onClick?: () => void;
  text: string;
  url: string;
  small?: boolean;
}

export default function Button({ onClick, text, url, small }: Props) {
  return (
    <>
      <Link
        href={url}
        onClick={onClick}
        className={`bg-background-start px-4 py-1 text-xl text-purple-200 border-2 border-purple-300 rounded-xl ease-in duration-200 hover:bg-background-mid ${
          small && "text-base"
        }`}
      >
        {text}
      </Link>
    </>
  );
}
