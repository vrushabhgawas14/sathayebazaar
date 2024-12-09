interface Props {
  type?: "submit";
  text: string;
  onClick?: () => void;
}

export const FormButton = ({ type, text, onClick }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="font-semibold text-xl px-2 py-1 bg-zinc-200 text-background-start hover:bg-zinc-100 hover:text-background-mid rounded-xl text-center"
    >
      {text}
    </button>
  );
};
