interface Props {
  ClassName?: string;
}

export default function LoginRegister({ ClassName }: Props) {
  const buttons = ["Register", "Login"];
  return (
    <>
      <div className={`${ClassName} space-x-4`}>
        {buttons.map((item, index) => (
          <button
            key={index}
            className="bg-slate-900 px-4 py-1 text-xl text-purple-200 border-2 border-purple-300 rounded-xl ease-in duration-200 hover:bg-slate-950"
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}
