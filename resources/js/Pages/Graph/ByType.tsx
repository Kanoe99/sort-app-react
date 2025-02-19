import { Printer } from "@/types";
import BarChart from "./Partials/BarChart";

const ByType = ({ printers }: { printers: Printer[] }) => {
  const getTypes = (printers: Printer[]) => {
    const typesArray = Array.from(printers, (printer) => printer.type);

    const mapArr: { [key: string]: number } = {};
    typesArray.forEach((type) => {
      mapArr[type] = (mapArr[type] || 0) + 1;
    });

    const result = Object.keys(mapArr).map((type) => {
      return { type: type, count: mapArr[type] };
    });

    return result;
  };

  const uniqueTypes = getTypes(printers);
  const randomColor = (
    hMin: number = 0,
    hMax: number = 360,
    slMin: number = 40,
    slMax: number = 80
  ) => {
    const hue = Math.floor(Math.random() * (hMax - hMin) + hMin);
    const saturation = Math.floor(Math.random() * (slMax - slMin) + slMin);
    const lightness = Math.floor(Math.random() * (slMax - slMin) + slMin);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const min = 80;

  const data = uniqueTypes.map((item) => {
    return {
      width: 50,
      height: item.count,
      type: item.type,
      color: randomColor(),
    };
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-10 border-b-2">По типу</h2>
      {data.map((item, index) => (
        <p
          className="flex gap-3 items-center"
          key={item.color + item.height + item.type}
        >
          <span
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: data[index].color }}
          ></span>
          <span>
            {item.type} в количестве {item.height} единиц
          </span>
        </p>
      ))}
      <BarChart data={data} />
    </div>
  );
};
export { ByType };
