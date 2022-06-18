import React from "react";
import styles from "./Sensor.module.scss";

import { ESensor } from "../../types/sensor";
import { useSensorData } from "../../hooks/useSensorData";

interface SensorProps {
  type: ESensor;
}

const Sensor: React.FC<SensorProps> = ({ type }) => {
  const { sensorData } = useSensorData(type);
  return (
    <div className={styles.sensor}>
      <h2 className={styles.header}>{type}</h2>
      <div className={styles.content}>
        {sensorData &&
          sensorData.map((item: any) => {
            return <div>{item.value}</div>;
          })}
      </div>
    </div>
  );
};

export default Sensor;
