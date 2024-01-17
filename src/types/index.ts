export type DataType = "Speed" | "Brake" | "Throttle" | "Gear" | "engineRPM" | "Steer" | "DRS" | "Delta";

export interface LineChartProps {
    data: {
      lapData: number;
      lapDistance: number;
      value: number;
      lapTime: number;
    }[];
    width: number;
    height: number;
    DataType: DataType;
    dataToCompare?: {
      lapData: number;
      value: number;
      lapDistance: number;
      lapTime: number;
    }[];
    ChartType?: "Single" | "Duel";
}

interface InputData {
  speed: number;
  throttle: number;
  brake: number;
  steer: number;
  gear: number;
  engineRPM: number;
  drs: number;
}

export interface LapData {
  inputdata: InputData;
  currentLapTime: number;
  currentLapNum: number;
  currentLapInvalid: number;
  currentLapDistance: number;
}