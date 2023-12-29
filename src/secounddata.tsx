import { AustriaData } from "./data";

export const newdata = AustriaData.map((e) => {
  return {
    ...e,
    inputdata: {
      ...e.inputdata,
      speed: e.inputdata.speed + 10,
    },
  };
});
