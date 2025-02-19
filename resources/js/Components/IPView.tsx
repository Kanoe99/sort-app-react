import { Fragment } from "react/jsx-runtime";

interface IPViewProps {
  IPData: string;
  isIPv4: boolean;
}

const IPView = ({ IPData, isIPv4 }: IPViewProps) => {
  const separator = isIPv4 ? "." : ":";
  const IPArray = IPData ? IPData.split(separator) : "";
  const length = isIPv4 ? 4 : 8;

  return (
    <div className="gap-1 flex text-center items-center">
      <h3 className="font-black mr-1 border-black border rounded-sm px-2 py-1 bg-bg-main">
        {isIPv4 ? "IPv4" : "IPv6"}
      </h3>
      {[...Array(length)].map((_, index) => (
        <Fragment key={index}>
          <span
            className="text-sm rounded-md border-1 h-fit border-black px-1 bg-bg-input-black w-[52px] py-1 focus:border-1 focus:border-black focus:ring-0 focus:outline-none text-center tracking-widest font-bold"
            title="Введите правильный IPv4 адрес"
          >
            {IPArray[index]}
          </span>
          {index < length - 1 && (
            <div className="text-neutral-bright">{separator}</div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
export { IPView };
