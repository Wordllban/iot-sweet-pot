import { useEffect, useState } from "react";
import { ESensor } from "./../types/sensor";
import { getSensorData } from "../services/api";

export const useSensorData = (type: ESensor) => {
  const [sensorData, setSensorData] = useState<[]>();

  const getData = async () => {
    const data = await getSensorData(type);
    setSensorData(data);
  };

  useEffect(() => {
    getData();
    return () => {
      setSensorData(undefined);
    };
  }, []);

  return { sensorData };
};
