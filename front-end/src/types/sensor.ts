export enum ESensor {
  humidity = "Humidity",
  temperature = "Temperature",
  moisture = "Soil Moisture",
}

export type TSensor = {
  id: string | number;
  value: string | number;
  createAt: string | number;
  updatedAt: string | number;
  sweetPotId: string | number;
}