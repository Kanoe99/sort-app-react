import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PieChart from "./Partials/PieChart";
import { Printer } from "@/types";

interface Category {
  label: string;
  color: string;
  condition: (counter: number) => boolean;
}

interface ChartDataItem {
  part: number;
  color: string;
  label: string;
}

const ByCounter = ({ printers }: { printers: Printer[] }) => {
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
  const categories: Category[] = [
    {
      label: "Менее 3000 страниц",
      color: `${randomColor(50)}`,
      condition: (counter) => counter < 3000,
    },
    {
      label: "3000 - 6000 страниц",
      color: randomColor(),
      condition: (counter) => counter >= 3000 && counter < 6000,
    },
    {
      label: "6000 - 9000 страниц",
      color: randomColor(80),
      condition: (counter) => counter >= 6000 && counter < 9000,
    },
    {
      label: "Более 9000 страниц",
      color: randomColor(100),
      condition: (counter) => counter >= 9000,
    },
  ];

  const Item = ({
    color,
    label,
    part,
  }: {
    color: string;
    label: string;
    part: number;
  }) => (
    <div className="flex items-center gap-2">
      <span
        className="h-3 w-3 block rounded-sm"
        style={{ backgroundColor: color }}
      ></span>
      <p>
        {label}: {part} штук
      </p>
    </div>
  );

  const chartData: ChartDataItem[] = categories.map((category) => {
    const part = printers.filter((printer) =>
      category.condition(Number(printer.counter))
    ).length;
    return { ...category, part };
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-10 border-b-2">По страницам</h2>
      <div className="space-y-2">
        {chartData.map((item) => (
          <Item
            key={item.label}
            color={item.color}
            label={item.label}
            part={item.part}
          />
        ))}
      </div>

      <PieChart data={chartData} />
    </div>
  );
};

export { ByCounter };
