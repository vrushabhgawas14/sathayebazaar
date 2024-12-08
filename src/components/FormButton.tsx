interface Props {
  type?: "submit";
  text: string;
}

export const FormButton = ({ type, text }: Props) => {
  return (
    <button
      type={type}
      className="font-semibold text-xl px-2 py-1 bg-zinc-200 text-background-start hover:bg-zinc-100 hover:text-background-mid rounded-xl text-center"
    >
      {text}
    </button>
  );
};
