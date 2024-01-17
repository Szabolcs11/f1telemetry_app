import { LapData } from "../../types";
import LineChart from "../TelemetryChart/LineChart";

type ChartProps = {
  data: LapData[];
  Type: "Single" | "Duel";
  dataToCompare?: LapData[];
  totalLapTime: number;
  totalLapTimeToCompare?: number;
};

function Charts({ data, Type, dataToCompare, totalLapTime, totalLapTimeToCompare }: ChartProps) {
  const throttleData = data.map((item) => ({
    lapData: item.currentLapTime,
    lapDistance: item.currentLapDistance,
    value: item.inputdata.throttle,
    lapTime: totalLapTime,
  }));
  const brakeData = data.map((item) => ({
    lapData: item.currentLapTime,
    lapDistance: item.currentLapDistance,
    value: item.inputdata.brake,
    lapTime: totalLapTime,
  }));
  const speedData = data.map((item) => ({
    lapData: item.currentLapTime,
    lapDistance: item.currentLapDistance,
    value: item.inputdata.speed,
    lapTime: totalLapTime,
  }));
  const steerData = data.map((item) => ({
    lapData: item.currentLapTime,
    lapDistance: item.currentLapDistance,
    value: item.inputdata.steer,
    lapTime: totalLapTime,
  }));
  const gearData = data.map((item) => ({
    lapData: item.currentLapTime,
    lapDistance: item.currentLapDistance,
    value: item.inputdata.gear,
    lapTime: totalLapTime,
  }));
  const engineRPMData = data.map((item) => ({
    lapData: item.currentLapTime,
    lapDistance: item.currentLapDistance,
    value: item.inputdata.engineRPM,
    lapTime: totalLapTime,
  }));

  if (Type === "Duel" && dataToCompare) {
    const throttleDataToCompare = dataToCompare?.map((item) => ({
      lapData: item.currentLapTime,
      value: item.inputdata.throttle,
      lapDistance: item.currentLapDistance,
      lapTime: totalLapTimeToCompare,
    }));
    const brakeDataToCompare = dataToCompare?.map((item) => ({
      lapData: item.currentLapTime,
      value: item.inputdata.brake,
      lapDistance: item.currentLapDistance,
      lapTime: totalLapTimeToCompare,
    }));
    const speedDataToCompare = dataToCompare?.map((item) => ({
      lapData: item.currentLapTime,
      value: item.inputdata.speed,
      lapDistance: item.currentLapDistance,
      lapTime: totalLapTimeToCompare,
    }));
    const steerDataToCompare = dataToCompare?.map((item) => ({
      lapData: item.currentLapTime,
      value: item.inputdata.steer,
      lapDistance: item.currentLapDistance,
      lapTime: totalLapTimeToCompare,
    }));
    const gearDataToCompare = dataToCompare?.map((item) => ({
      lapData: item.currentLapTime,
      value: item.inputdata.gear,
      lapDistance: item.currentLapDistance,
      lapTime: totalLapTimeToCompare,
    }));
    const engineRPMDataToCompare = dataToCompare?.map((item) => ({
      lapData: item.currentLapTime,
      value: item.inputdata.engineRPM,
      lapDistance: item.currentLapDistance,
      lapTime: totalLapTimeToCompare,
    }));

    const delta = data.map((item, index) => ({
      value: parseFloat(item.currentLapTime.toFixed(3)),
      lapDistance: item.currentLapDistance,
      lapTime: totalLapTime,
    }));

    const detaCompare = dataToCompare.map((item, index) => ({
      value: parseFloat(item.currentLapTime.toFixed(3)),
      lapDistance: item.currentLapDistance,
      lapTime: totalLapTimeToCompare,
    }));
    return (
      <>
        {/* <LineChart
          DataType="Delta"
          ChartType="Single"
          data={delta}
          // dataToCompare={detlaa}
          width={1600}
          height={200}
        /> */}
        <LineChart
          DataType="Delta"
          ChartType="Duel"
          data={delta}
          dataToCompare={detaCompare}
          width={1600}
          height={200}
        />
        <LineChart
          DataType="Throttle"
          ChartType="Duel"
          data={throttleData}
          dataToCompare={throttleDataToCompare}
          width={1600}
          height={200}
        />
        <LineChart
          DataType="Brake"
          ChartType="Duel"
          data={brakeData}
          dataToCompare={brakeDataToCompare}
          width={1600}
          height={200}
        />
        <LineChart
          DataType="Speed"
          ChartType="Duel"
          data={speedData}
          dataToCompare={speedDataToCompare}
          width={1600}
          height={200}
        />
        <LineChart
          DataType="Steer"
          ChartType="Duel"
          data={steerData}
          dataToCompare={steerDataToCompare}
          width={1600}
          height={200}
        />
        <LineChart
          DataType="Gear"
          ChartType="Duel"
          data={gearData}
          dataToCompare={gearDataToCompare}
          width={1600}
          height={200}
        />
        <LineChart
          DataType="engineRPM"
          ChartType="Duel"
          data={engineRPMData}
          dataToCompare={engineRPMDataToCompare}
          width={1600}
          height={200}
        />
        <LineChart DataType="Delta" ChartType="Single" data={engineRPMData} width={1600} height={200} />
      </>
    );
  }
  return (
    <>
      <LineChart DataType="Throttle" data={throttleData} width={1600} height={200} />
      <LineChart DataType="Brake" data={brakeData} width={1600} height={200} />
      <LineChart DataType="Speed" data={speedData} width={1600} height={200} />
      <LineChart DataType="Steer" data={steerData} width={1600} height={200} />
      <LineChart DataType="Gear" data={gearData} width={1600} height={200} />
      <LineChart DataType="engineRPM" data={engineRPMData} width={1600} height={200} />
      {/* <LineChart DataType="Throttle" data={throttleData.slice(600, 750)} width={1600} height={200} /> */}
    </>
  );
}

export default Charts;
