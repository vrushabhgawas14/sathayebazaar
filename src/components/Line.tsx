interface myProps {
  isThin?: boolean;
}
const Line: React.FC<myProps> = (myProps) => {
  const { isThin } = myProps;
  return (
    <div
      className={`${
        isThin
          ? "p-[1px] bg-background-start"
          : "mx-96 md:mx-52 sm:mx-20 p-1 bg-background-start rounded-xl"
      }`}
    />
  );
};

export default Line;
