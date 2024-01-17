import React from "react";
import { LineChartProps } from "../../types";
import { getMinAndMaxs } from "./utils";

const margin = 10;

const LineChart: React.FC<LineChartProps> = ({ data, width, height, DataType, ChartType, dataToCompare }) => {
  // console.log(data);
  let minXFinal = 10000;
  let maxXFinal = -10000;
  let minYFinal = 10000;
  let maxYFinal = -15000;
  const { minX, maxX, minY, maxY } = getMinAndMaxs(DataType, data);

  const {
    minX: minXToCompare,
    maxX: maxXToCompare,
    minY: minYToCompare,
    maxY: maxYToCompare,
  } = ChartType == "Duel" ? getMinAndMaxs(DataType, dataToCompare) : { minX: 1000, maxX: 0, minY: 0, maxY: 0 };

  minXFinal = Math.min(minX, minXToCompare);
  maxXFinal = Math.max(maxX, maxXToCompare);
  minYFinal = Math.min(minY, minYToCompare);
  maxYFinal = Math.max(maxY, maxYToCompare);

  // minYFinal = -1;
  // maxYFinal = 1;
  // minXFinal = 4240;
  // minXFinal = 350;
  // maxXFinal = 600;

  // console.log(minXFinal, maxXFinal, minYFinal, maxYFinal);

  const xScale = (value: number) => ((value - minXFinal) / (maxXFinal - minXFinal)) * width;
  const yScale = (value: number) => height - ((value - minYFinal) / (maxYFinal - minYFinal)) * height + margin;

  const linePath = `M${xScale(data[0].lapDistance)} ${yScale(data[0].value)} ${data
    .map((point) => `L${xScale(point.lapDistance)} ${yScale(point.value)}`)
    .join(" ")}`;

  let otherPath;
  if (dataToCompare?.length) {
    otherPath = `M${xScale(dataToCompare[0].lapDistance)} ${yScale(dataToCompare[0].value)} ${dataToCompare
      .map((point) => `L${xScale(point.lapDistance)} ${yScale(point.value)}`)
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
        {percentage === 1
          ? `${minYFinal}`
          : percentage === 0
          ? `${maxYFinal}`
          : `${(maxYFinal - minYFinal) * (1 - percentage) + minYFinal}`}
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
      <text x={width * percentage - 40} y={height} fill={percentage === 0 || percentage === 1 ? "black" : "black"}>
        {percentage === 0
          ? ``
          : percentage === 1
          ? `${Math.floor(maxXFinal)}`
          : `${Math.floor((maxXFinal - minXFinal) * percentage + minXFinal)}`}
      </text>
    </g>
  ));

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center", backgroundColor: "", width: "100%" }}>
        <svg width={width + 100} height={height + 50} style={{}}>
          {horizontalLines}
          {verticalLines}
          {ChartType == "Duel" ? (
            <path style={{ zIndex: 9999 }} d={otherPath} stroke="red" fill="none" strokeWidth={2} />
          ) : (
            <></>
          )}
          <path
            style={{ zIndex: 9999 }}
            d={linePath}
            stroke="blue"
            opacity={ChartType == "Duel" ? 0.6 : 1}
            fill="none"
            strokeWidth={2}
          />
        </svg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 12,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            width: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 50, height: 20, backgroundColor: "blue" }}></div>
            <div>{ChartType == "Duel" ? DataType + " - " + data[0].lapTime : DataType}</div>
          </div>
          {ChartType == "Duel" ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
              <div style={{ width: 50, height: 20, backgroundColor: "red" }}></div>
              <div>{DataType + " - " + dataToCompare![0].lapTime}</div>
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
