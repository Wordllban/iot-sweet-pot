import axios from "axios";
import { ESensor } from "../types/sensor";

const server: string = "http://localhost:5050/";

const http = axios.create({
  baseURL: server,
  headers: {
    "Content-type": "application-json",
  },
});

export const getSensorData = async (sensorType: ESensor) => {
  let url: string = server;
  if (sensorType === ESensor.humidity) {
    url += "air-moisture";
  }

  if (sensorType === ESensor.moisture) {
    url += "soil-moisture";
  }

  if (sensorType === ESensor.temperature) {
    url += "temperature";
  }

  console.log("url: ", url);
  return (await http.get(url)).data;
};

export const getDeviceData = async (id: string | number) => {
  let url: string = server;
  url += `sweetpot/${id}`;
  return (await http.get(url)).data;
};
