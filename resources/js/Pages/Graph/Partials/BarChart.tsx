import { Stage, Layer, Rect, Text } from "react-konva";

interface BarChartDataItem {
  width: number;
  height: number;
  type: string;
  color: string;
}

interface BarChartProps {
  data: BarChartDataItem[];
}

const BarChart = ({ data }: BarChartProps) => {
  return (
    <Stage width={500} height={500}>
      <Layer>
        {data.map((item, index) => {
          const rect = (
            <Rect
              key={index}
              x={index * 100}
              y={450 - item.height}
              width={item.width}
              height={item.height}
              fill={item.color}
            />
          );
          return rect;
        })}
        {data.map((item, index) => {
          const text = (
            <Text
              key={index + "t"}
              text={item.height.toString()}
              fill={"white"}
              x={index * 100}
              y={480}
            />
          );
          return text;
        })}
      </Layer>
    </Stage>
  );
};

export default BarChart;
