interface Props {
  type?: "submit";
  invert?: boolean;
  text: string;
}

export const Button = ({ type, invert, text }: Props) => {
  return (
    <button
      type={type}
      className={`font-semibold text-xl px-2 py-1 ${
        invert
          ? "bg-purple-800 text-zinc-200 hover:bg-purple-700 hover:text-zinc-100"
          : "bg-zinc-200 text-purple-800 hover:bg-zinc-100 hover:text-purple-900"
      } rounded-xl text-center`}
    >
      {text}
    </button>
  );
};
