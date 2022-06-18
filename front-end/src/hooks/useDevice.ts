import { useEffect, useState } from "react";
import { getDeviceData } from "../services/api";
import { TDevice } from "../types/device";

export const useDevice = () => {
  const [device, setDevice] = useState<TDevice>();

  const getDevice = async () => {
    const device = await getDeviceData(1);
    setDevice(device);
  };

  useEffect(() => {
    getDevice();
    return () => {
      setDevice(undefined);
    };
  }, []);

  return { device };
};
