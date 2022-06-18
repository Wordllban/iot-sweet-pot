export enum ESensor {
  humidity = "Humidity",
  temperature = "Temperature",
  moisture = "Soil Moisture",
}

export type TSensor = {
  id: string | number;
  value: string | number;
  createdAt: string;
  updatedAt: string;
  sweetPotId: string | number;
};
