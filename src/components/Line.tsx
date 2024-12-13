interface myProps {
  isThin?: boolean;
}
const Line: React.FC<myProps> = (myProps) => {
  const { isThin } = myProps;
  return (
    <div
      className={`${
        isThin
          ? "p-[1px] bg-red-100 w-full"
          : "mx-96 md:mx-52 sm:mx-20 p-1 bg-background-start rounded-xl"
      }`}
    />
  );
};

export default Line;
