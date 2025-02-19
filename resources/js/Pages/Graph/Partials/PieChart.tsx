import React from "react";
import { Stage, Layer, Arc } from "react-konva";

interface PieChartDataItem {
  part: number;
  color: string;
  label: string;
}

interface PieChartProps {
  data: PieChartDataItem[];
}

const PieChart = ({ data }: PieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.part, 0);

  let startAngle = 0;

  return (
    <Stage width={400} height={400}>
      <Layer>
        {data.map((item, index) => {
          const angle = (item.part / total) * 360;
          const arc = (
            <Arc
              key={index}
              x={150}
              y={250}
              innerRadius={50}
              outerRadius={100}
              angle={angle}
              rotation={startAngle}
              fill={item.color}
            />
          );
          startAngle += angle;
          return arc;
        })}
      </Layer>
    </Stage>
  );
};

export default PieChart;
