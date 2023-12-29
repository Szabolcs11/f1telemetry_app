import { DataType } from "../types";

export const getMinAndMaxs = (type: DataType, data: any) => {
    const config = {
      Speed: () => {
        const maxY =
          Math.ceil(
            data.reduce((max: number, item: { value: number }) => {
              return Math.max(max, item.value);
            }, 0) / 50
          ) * 50;
        return { maxY };
      },
      Steer: () => {
        const maxY = 1;
        const minY = -1;
        return { maxY, minY };
      },
      default: () => {
        const minX = 0;
        const maxX = Math.max(...data.map((e: { lapData: any }) => e.lapData));
        const minY = data.reduce((max: number, item: { value: number }) => {
          return Math.min(max, item.value);
        }, 0);
        const maxY = data.reduce((max: number, item: { value: number }) => {
          return Math.max(max, item.value);
        }, 0);
  
        return { minX, maxX, minY, maxY };
      },
    };
  
    let maxY;
  
    //@ts-ignore
    const { minX, maxX, minY, ...rest } = {
      minX: 0,
      maxX: Math.max(...data.map((e: { lapData: any }) => e.lapData)),
      minY: data.reduce((max: number, item: { value: number }) => {
        return Math.min(max, item.value);
      }, 0),
      //@ts-ignore
      ...(config[type] || config.default)(),
    };
  
    // Assign maxY from the destructured object
    if (rest.hasOwnProperty("maxY")) {
      maxY = rest.maxY;
    }
  
    return { minX, maxX, minY, maxY };
  };
