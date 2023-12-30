import { LapData } from "../../types";
import LineChart from "../TelemetryChart/LineChart";

type ChartProps = {
  data: LapData[];
  Type: "Single" | "Duel";
  dataToCompare?: LapData[];
};

function Charts({ data, Type, dataToCompare }: ChartProps) {
  const throttleData = data.map((item) => ({ lapData: item.currentLapTime, value: item.inputdata.throttle }));
  const brakeData = data.map((item) => ({ lapData: item.currentLapTime, value: item.inputdata.brake }));
  const speedData = data.map((item) => ({ lapData: item.currentLapTime, value: item.inputdata.speed }));
  const steerData = data.map((item) => ({ lapData: item.currentLapTime, value: item.inputdata.steer }));
  const gearData = data.map((item) => ({ lapData: item.currentLapTime, value: item.inputdata.gear }));
  const engineRPMData = data.map((item) => ({ lapData: item.currentLapTime, value: item.inputdata.engineRPM }));

  if (Type === "Duel") {
    const throttleDataToCompare = dataToCompare?.map((item) => ({
      lapData: item.currentLapTime,
      value: item.inputdata.throttle,
    }));
    const brakeDataToCompare = dataToCompare?.map((item) => ({
      lapData: item.currentLapTime,
      value: item.inputdata.brake,
    }));
    const speedDataToCompare = dataToCompare?.map((item) => ({
      lapData: item.currentLapTime,
      value: item.inputdata.speed,
    }));
    const steerDataToCompare = dataToCompare?.map((item) => ({
      lapData: item.currentLapTime,
      value: item.inputdata.steer,
    }));
    const gearDataToCompare = dataToCompare?.map((item) => ({
      lapData: item.currentLapTime,
      value: item.inputdata.gear,
    }));
    const engineRPMDataToCompare = dataToCompare?.map((item) => ({
      lapData: item.currentLapTime,
      value: item.inputdata.engineRPM,
    }));
    return (
      <>
        <LineChart
          DataType="Throttle"
          ChartType="Duel"
          data={throttleData}
          dataToCompare={throttleDataToCompare}
          width={1200}
          height={800}
        />
        <LineChart
          DataType="Brake"
          ChartType="Duel"
          data={brakeData}
          dataToCompare={brakeDataToCompare}
          width={1200}
          height={800}
        />
        <LineChart
          DataType="Speed"
          ChartType="Duel"
          data={speedData}
          dataToCompare={speedDataToCompare}
          width={1200}
          height={800}
        />
        <LineChart
          DataType="Steer"
          ChartType="Duel"
          data={steerData}
          dataToCompare={steerDataToCompare}
          width={1200}
          height={800}
        />
        <LineChart
          DataType="Gear"
          ChartType="Duel"
          data={gearData}
          dataToCompare={gearDataToCompare}
          width={1200}
          height={800}
        />
        <LineChart
          DataType="engineRPM"
          ChartType="Duel"
          data={engineRPMData}
          dataToCompare={engineRPMDataToCompare}
          width={1200}
          height={800}
        />
      </>
    );
  }
  return (
    <>
      <LineChart DataType="Throttle" data={throttleData} width={1200} height={800} />
      <LineChart DataType="Brake" data={brakeData} width={1200} height={800} />
      <LineChart DataType="Speed" data={speedData} width={1200} height={800} />
      <LineChart DataType="Steer" data={steerData} width={1200} height={800} />
      <LineChart DataType="Gear" data={gearData} width={1200} height={800} />
      <LineChart DataType="engineRPM" data={engineRPMData} width={1200} height={800} />
      {/* <LineChart DataType="Throttle" data={throttleData.slice(600, 750)} width={1200} height={800} /> */}
    </>
  );
}

export default Charts;
