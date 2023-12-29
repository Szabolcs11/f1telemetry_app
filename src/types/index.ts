export type DataType = "Speed" | "Brake" | "Throttle" | "Gear" | "engineRPM" | "Steer" | "DRS";

export interface LineChartProps {
    data: {
      lapData: number;
      value: number;
    }[];
    width: number;
    height: number;
    DataType: DataType;
    dataToCompare?: {
      lapData: number;
      value: number;
    }[];
    dataToCompareType?: DataType;
    ChartType?: "Single" | "Duel";
  }