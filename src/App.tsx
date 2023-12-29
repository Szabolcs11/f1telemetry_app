import React from "react";
import { AustriaData } from "./data";
import LineChart from "./components/TelemetryChart/LineChart";
import { newdata } from "./secounddata";
import { LapsData } from "./lapsdata";
import Navigator from "./navigator";
import { ToastContainer } from "react-toastify";

function App() {
  const brakeData = AustriaData.map((item) => ({ lapData: item.lapData, value: item.inputdata.brake }));
  const throttleData = AustriaData.map((item) => ({ lapData: item.lapData, value: item.inputdata.throttle }));
  const speedData = AustriaData.map((item) => ({ lapData: item.lapData, value: item.inputdata.speed }));
  const steerData = AustriaData.map((item) => ({ lapData: item.lapData, value: item.inputdata.steer }));
  const gerData = AustriaData.map((item) => ({ lapData: item.lapData, value: item.inputdata.gear }));
  const engineRPM = AustriaData.map((item) => ({ lapData: item.lapData, value: item.inputdata.engineRPM }));
  const otherSpeedData = newdata.map((item) => ({ lapData: item.lapData, value: item.inputdata.speed }));

  const lapA = LapsData[0].map((item) => ({ lapData: item.lapData, value: item.inputdata.speed }));
  const lapB = LapsData[1].map((item) => ({ lapData: item.lapData, value: item.inputdata.speed }));

  return (
    <>
      <Navigator />
      <ToastContainer />
      {/* <LineChart
        ChartType="Duel"
        DataType="Speed"
        data={speedData}
        dataToCompare={otherSpeedData}
        dataToCompareType="Speed"
        width={1500}
        height={800}
      /> */}
    </>
    // <div>
    //   <h1>Telemetriai Grafikon</h1>
    //   <div style={{ margin: 20 }}>
    //     <LineChart DataType="Throttle" data={throttleData} width={1500} height={800} />
    //     <LineChart DataType="Brake" data={brakeData} width={1500} height={800} />
    //     <LineChart
    //       ChartType="Duel"
    //       DataType="Throttle"
    //       data={throttleData}
    //       dataToCompare={brakeData}
    //       dataToCompareType={"Brake"}
    //       width={1500}
    //       height={800}
    //     />
    //     <LineChart DataType="Speed" data={speedData} width={1500} height={800} />
    //     <LineChart DataType="Steer" data={steerData} width={1500} height={800} />
    //     <LineChart DataType="Gear" data={gerData} width={1500} height={800} />
    //     <LineChart DataType="engineRPM" data={engineRPM} width={1500} height={800} />

    //     <LineChart
    //       ChartType="Duel"
    //       DataType="Speed"
    //       data={lapA}
    //       dataToCompare={lapB}
    //       dataToCompareType="Speed"
    //       width={1500}
    //       height={800}
    //     />
    //   </div>
    // </div>
  );
}

export default App;
