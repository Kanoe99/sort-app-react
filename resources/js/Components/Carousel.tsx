const Carousel = () => {
  const bgColors = [
    "bg-red-500",
    "bg-pink-500",
    "bg-white",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
  ];
  return (
    <div>
      {bgColors.map((bgColor) => (
        <div
          key={bgColor}
          className={`${bgColor} w-[500px] h-[700px] m-2`}
        ></div>
      ))}
    </div>
  );
};
export { Carousel };
