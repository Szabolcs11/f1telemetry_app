import React from "react";
import { LapData } from "../../types";
import LineChart from "../TelemetryChart/LineChart";

type ChartProps = {
  data: LapData[];
};

function Charts({ data }: ChartProps) {
  const throttleData = data.map((item) => ({ lapData: item.currentLapTime, value: item.inputdata.throttle }));
  const brakeData = data.map((item) => ({ lapData: item.currentLapTime, value: item.inputdata.brake }));
  const speedData = data.map((item) => ({ lapData: item.currentLapTime, value: item.inputdata.speed }));
  const steerData = data.map((item) => ({ lapData: item.currentLapTime, value: item.inputdata.steer }));
  const gearData = data.map((item) => ({ lapData: item.currentLapTime, value: item.inputdata.gear }));
  const engineRPMData = data.map((item) => ({ lapData: item.currentLapTime, value: item.inputdata.engineRPM }));

  return (
    <>
      <LineChart DataType="Throttle" data={throttleData} width={1200} height={800} />
      <LineChart DataType="Brake" data={brakeData} width={1200} height={800} />
      <LineChart DataType="Speed" data={speedData} width={1200} height={800} />
      <LineChart DataType="Steer" data={steerData} width={1200} height={800} />
      <LineChart DataType="Gear" data={gearData} width={1200} height={800} />
      <LineChart DataType="engineRPM" data={engineRPMData} width={1200} height={800} />
    </>
  );
}

export default Charts;
