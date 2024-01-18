import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { LapData } from "../../types";

type ChartProps = {
  data: LapData[];
  Type: "Single" | "Duel";
  dataToCompare?: LapData[];
  totalLapTime: number;
  totalLapTimeToCompare?: number;
};

function Charts({ data, Type, dataToCompare, totalLapTime, totalLapTimeToCompare }: ChartProps) {
  const throttleData = data?.map((item) => ({
    value: item.inputdata.throttle,
    lapDistance: item.currentLapDistance,
  }));
  const brakeData = data?.map((item) => ({
    value: item.inputdata.brake,
    lapDistance: item.currentLapDistance,
  }));
  const speedData = data?.map((item) => ({
    value: item.inputdata.speed,
    lapDistance: item.currentLapDistance,
  }));
  const steerData = data?.map((item) => ({
    value: item.inputdata.steer,
    lapDistance: item.currentLapDistance,
  }));
  const gearData = data?.map((item) => ({
    value: item.inputdata.gear,
    lapDistance: item.currentLapDistance,
  }));
  const engineRPMData = data?.map((item) => ({
    value: item.inputdata.engineRPM,
    lapDistance: item.currentLapDistance,
  }));

  if (Type === "Duel" && dataToCompare) {
    console.clear();
    const findClosestLapDistance = (lapDistance: number, dataToCompare: LapData[], i: number) => {
      let closest = dataToCompare[0];
      for (let i = 0; i < dataToCompare.length; i++) {
        if (
          Math.abs(dataToCompare[i].currentLapDistance - lapDistance) <
          Math.abs(closest.currentLapDistance - lapDistance)
        ) {
          closest = dataToCompare[i];
        }
      }
      if (Math.abs(closest.currentLapDistance - lapDistance) > 1) return false;
      return closest;
    };

    let max = Math.max(data.length, dataToCompare.length);
    let { maxObject, minObject } =
      data.length > dataToCompare.length
        ? { maxObject: data, minObject: dataToCompare }
        : { maxObject: dataToCompare, minObject: data };

    let compareDeltaData = [];
    let comparedThrottleData = [];
    let comparedBrakeData = [];
    let comparedSpeedData = [];
    let comparedSteerData = [];
    let comparedGearData = [];
    let comparedEngineRPMData = [];

    let lastA: LapData;
    let lastB: LapData;
    for (let i = 0; i < max; i++) {
      let closesT = findClosestLapDistance(maxObject[i]?.currentLapDistance, minObject, i);
      if (closesT) {
        let lapTime = isNaN(maxObject[i]?.currentLapTime) ? lastA!.currentLapTime : maxObject[i]?.currentLapTime;
        let lapTimeToCompare = isNaN(closesT?.currentLapTime) ? lastB!.currentLapTime : closesT?.currentLapTime;
        let delta = lapTime - lapTimeToCompare;
        compareDeltaData.push({
          value: 0,
          valueToCompare: totalLapTime > totalLapTimeToCompare! ? -delta : +delta,
          lapDistance: maxObject[i]?.currentLapDistance,
        });
        let throttleData = isNaN(maxObject[i]?.inputdata.throttle)
          ? lastA!.inputdata.throttle
          : maxObject[i]?.inputdata.throttle;
        let throttleDataToCompare = isNaN(closesT?.inputdata.throttle)
          ? lastB!.inputdata.throttle
          : closesT?.inputdata.throttle;
        comparedThrottleData.push({
          value: totalLapTime > totalLapTimeToCompare! ? throttleData : throttleDataToCompare,
          valueToCompare: totalLapTime > totalLapTimeToCompare! ? throttleDataToCompare : throttleData,
          lapDistance: maxObject[i]?.currentLapDistance,
        });
        let brakeData = isNaN(maxObject[i]?.inputdata.brake) ? lastA!.inputdata.brake : maxObject[i]?.inputdata.brake;
        let brakeDataToCompare = isNaN(closesT?.inputdata.brake) ? lastB!.inputdata.brake : closesT?.inputdata.brake;
        comparedBrakeData.push({
          value: totalLapTime > totalLapTimeToCompare! ? brakeData : brakeDataToCompare,
          valueToCompare: totalLapTime > totalLapTimeToCompare! ? brakeDataToCompare : brakeData,
          lapDistance: maxObject[i]?.currentLapDistance,
        });
        let speedData = isNaN(maxObject[i]?.inputdata.speed) ? lastA!.inputdata.speed : maxObject[i]?.inputdata.speed;
        let speedDataToCompare = isNaN(closesT?.inputdata.speed) ? lastB!.inputdata.speed : closesT?.inputdata.speed;
        comparedSpeedData.push({
          value: totalLapTime > totalLapTimeToCompare! ? speedData : speedDataToCompare,
          valueToCompare: totalLapTime > totalLapTimeToCompare! ? speedDataToCompare : speedData,
          lapDistance: maxObject[i]?.currentLapDistance,
        });
        let steerData = isNaN(maxObject[i]?.inputdata.steer) ? lastA!.inputdata.steer : maxObject[i]?.inputdata.steer;
        let steerDataToCompare = isNaN(closesT?.inputdata.steer) ? lastB!.inputdata.steer : closesT?.inputdata.steer;
        comparedSteerData.push({
          value: totalLapTime > totalLapTimeToCompare! ? steerData : steerDataToCompare,
          valueToCompare: totalLapTime > totalLapTimeToCompare! ? steerDataToCompare : steerData,
          lapDistance: maxObject[i]?.currentLapDistance,
        });
        let gearData = isNaN(maxObject[i]?.inputdata.gear) ? lastA!.inputdata.gear : maxObject[i]?.inputdata.gear;
        let gearDataToCompare = isNaN(closesT?.inputdata.gear) ? lastB!.inputdata.gear : closesT?.inputdata.gear;
        comparedGearData.push({
          value: totalLapTime > totalLapTimeToCompare! ? gearData : gearDataToCompare,
          valueToCompare: totalLapTime > totalLapTimeToCompare! ? gearDataToCompare : gearData,
          lapDistance: maxObject[i]?.currentLapDistance,
        });
        let engineRPMData = isNaN(maxObject[i]?.inputdata.engineRPM)
          ? lastA!.inputdata.engineRPM
          : maxObject[i]!.inputdata.engineRPM;
        let engineRPMDataToCompare = isNaN(closesT?.inputdata.engineRPM);
        comparedEngineRPMData.push({
          value: totalLapTime > totalLapTimeToCompare! ? engineRPMData : engineRPMDataToCompare,
          valueToCompare: totalLapTime > totalLapTimeToCompare! ? engineRPMDataToCompare : engineRPMData,
          lapDistance: maxObject[i]?.currentLapDistance,
        });

        if (!isNaN(maxObject[i]?.currentLapTime)) lastA = maxObject[i];
        if (!isNaN(minObject[i]?.currentLapTime)) lastB = minObject[i];
      }
    }

    return (
      <>
        <LineChart
          width={1600}
          height={200}
          data={compareDeltaData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="lapDistance" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#f5f5f5" />
          <Line dot={false} stroke="#0088FE" strokeWidth={1} type="linear" dataKey="value" />
          <Line dot={false} stroke="#FFBB28" strokeWidth={1} type="linear" dataKey="valueToCompare" />
        </LineChart>
        <LineChart
          width={1600}
          height={200}
          data={comparedThrottleData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="lapDistance" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#f5f5f5" />
          <Line dot={false} stroke="#0088FE" strokeWidth={1} type="linear" dataKey="value" />
          <Line dot={false} stroke="#FFBB28" strokeWidth={1} type="linear" dataKey="valueToCompare" />
        </LineChart>
        <LineChart
          width={1600}
          height={200}
          data={comparedBrakeData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="lapDistance" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#f5f5f5" />
          <Line dot={false} stroke="#0088FE" strokeWidth={1} type="linear" dataKey="value" />
          <Line dot={false} stroke="#FFBB28" strokeWidth={1} type="linear" dataKey="valueToCompare" />
        </LineChart>
        <LineChart
          width={1600}
          height={200}
          data={comparedSpeedData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="lapDistance" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#f5f5f5" />
          <Line dot={false} stroke="#0088FE" strokeWidth={1} type="linear" dataKey="value" />
          <Line dot={false} stroke="#FFBB28" strokeWidth={1} type="linear" dataKey="valueToCompare" />
        </LineChart>
        <LineChart
          width={1600}
          height={200}
          data={comparedSteerData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="lapDistance" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#f5f5f5" />
          <Line dot={false} stroke="#0088FE" strokeWidth={1} type="linear" dataKey="value" />
          <Line dot={false} stroke="#FFBB28" strokeWidth={1} type="linear" dataKey="valueToCompare" />
        </LineChart>
        <LineChart
          width={1600}
          height={200}
          data={comparedGearData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="lapDistance" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#f5f5f5" />
          <Line dot={false} stroke="#0088FE" strokeWidth={1} type="linear" dataKey="value" />
          <Line dot={false} stroke="#FFBB28" strokeWidth={1} type="linear" dataKey="valueToCompare" />
        </LineChart>
      </>
    );
  }
  return (
    <>
      <LineChart width={1600} height={200} data={throttleData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="lapDistance" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid stroke="#f5f5f5" />
        <Line dot={false} type="linear" dataKey="value" yAxisId={0} />
      </LineChart>
      <LineChart width={1600} height={200} data={brakeData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="lapDistance" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid stroke="#f5f5f5" />
        <Line dot={false} type="linear" dataKey="value" yAxisId={0} />
      </LineChart>
      <LineChart width={1600} height={200} data={steerData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="lapDistance" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid stroke="#f5f5f5" />
        <Line dot={false} type="linear" dataKey="value" yAxisId={0} />
      </LineChart>
      <LineChart width={1600} height={200} data={speedData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="lapDistance" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid stroke="#f5f5f5" />
        <Line dot={false} type="linear" dataKey="value" yAxisId={0} />
      </LineChart>
      <LineChart width={1600} height={200} data={gearData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="lapDistance" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid stroke="#f5f5f5" />
        <Line dot={false} type="linear" dataKey="value" yAxisId={0} />
      </LineChart>
      <LineChart width={1600} height={200} data={engineRPMData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="lapDistance" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid stroke="#f5f5f5" />
        <Line dot={false} type="linear" dataKey="value" yAxisId={0} />
      </LineChart>
    </>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="custom-tooltip-label">{` ${parseFloat(label).toFixed(0)}`}</p>
        {payload.map((item: any, index: number) => (
          <p className={`custom-tooltip-value ${index % 2 == 0 ? "label-blue" : "label-orange"}`}>
            {parseFloat(item.value).toFixed(3)}
          </p>
        ))}
      </div>
    );
  }

  return null;
};
export default Charts;
