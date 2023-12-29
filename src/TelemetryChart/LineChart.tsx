import React from "react";
import { LineChartProps } from "../types";
import { getMinAndMaxs } from "./utils";

const margin = 10;

const LineChart: React.FC<LineChartProps> = ({
  data,
  width,
  height,
  DataType,
  ChartType,
  dataToCompare,
  dataToCompareType,
}) => {
  const { minX, maxX, minY, maxY } = getMinAndMaxs(DataType, data);

  const xScale = (value: number) => ((value - minX) / (maxX - minX)) * width;
  const yScale = (value: number) => height - ((value - minY) / (maxY - minY)) * height + margin;

  const linePath = `M${xScale(data[0].lapData)} ${yScale(data[0].value)} ${data
    .map((point) => `L${xScale(point.lapData)} ${yScale(point.value)}`)
    .join(" ")}`;

  let otherPath;
  if (dataToCompare?.length) {
    otherPath = `M${xScale(dataToCompare[0].lapData)} ${yScale(dataToCompare[0].value)} ${dataToCompare
      .map((point) => `L${xScale(point.lapData)} ${yScale(point.value)}`)
      .join(" ")}`;
  }

  const horizontalLines = [0, 0.25, 0.5, 0.75, 1].map((percentage) => (
    <g key={percentage}>
      <line
        x1={0}
        y1={height * percentage + margin}
        x2={width}
        y2={height * percentage + margin}
        stroke={percentage === 0 || percentage === 1 ? "black" : "gray"}
        strokeDasharray={"5,5"}
      />
      <text
        x={5}
        y={percentage === 1 ? height * percentage : height * percentage + 30}
        fill={percentage === 0 || percentage === 1 ? "black" : "black"}
      >
        {percentage === 1 ? `${minY}` : percentage === 0 ? `${maxY}` : `${(maxY - minY) * (1 - percentage) + minY}`}
      </text>
    </g>
  ));

  const verticalLines = [0, 0.25, 0.5, 0.75, 1].map((percentage) => (
    <g key={percentage}>
      <line
        x1={width * percentage < 1 ? 1 : width * percentage}
        y1={margin}
        x2={width * percentage < 1 ? 1 : width * percentage}
        y2={height + margin}
        stroke={"gray"}
      />
      <text x={width * percentage - 25} y={height - 10} fill={percentage === 0 || percentage === 1 ? "black" : "black"}>
        {percentage === 0
          ? ``
          : percentage === 1
          ? `${Math.floor(maxX)}`
          : `${Math.floor((maxX - minX) * percentage + minX)}`}
      </text>
    </g>
  ));

  return (
    <div>
      <p>{ChartType == "Duel" ? `${DataType} - ${dataToCompareType} összehasonlítás` : DataType}</p>
      <div style={{ display: "flex" }}>
        <svg width={width + 100} height={height + 100} style={{}}>
          {horizontalLines}
          {verticalLines}
          <path style={{ zIndex: 9999 }} d={linePath} stroke="blue" fill="none" strokeWidth={2} />
          {ChartType == "Duel" ? (
            <path style={{ zIndex: 9999 }} d={otherPath} stroke="red" fill="none" strokeWidth={2} />
          ) : (
            <></>
          )}
        </svg>
        <div
          style={{
            height: 100,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 50, height: 20, backgroundColor: "blue" }}></div>
            <p>{DataType}</p>
          </div>
          {dataToCompareType ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 50, height: 20, backgroundColor: "red" }}></div>
              <p>{dataToCompareType}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default LineChart;
