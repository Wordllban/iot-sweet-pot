import React from "react";
import styles from "./Sensor.module.scss";

import { ESensor } from "../../types/sensor";
import { useSensorData } from "../../hooks/useSensorData";

interface SensorProps {
  type: ESensor;
}

const Sensor: React.FC<SensorProps> = ({ type }) => {
  const { sensorData } = useSensorData(type);

  const handleValueStatus = (value: string | number) => {
    if (type === ESensor.humidity) {
      if (value < 20) {
        return "red";
      }
      if (value > 20 && value < 35) {
        return "orange";
      }
      if (value > 35) {
        return "green";
      }
    }

    if (type === ESensor.moisture) {
      if (value < 300) {
        return "green";
      }
      if (value > 300 && value < 500) {
        return "orange";
      }
      if (value > 500) {
        return "red";
      }
    }

    if (type === ESensor.temperature) {
      if (value < 10) {
        return "red";
      }
      if (value > 10 && value < 15) {
        return "orange";
      }
      if (value > 15) {
        return "green";
      }
    }
  };

  return (
    <div className={styles.sensor}>
      <h2 className={styles.header}>{type}</h2>
      <div className={styles.content}>
        {sensorData &&
          sensorData.map((item: any) => {
            return (
              <div className={styles.value}>
                <span key={`${type}-${item.value}-${item.createdAt}`}>
                  {item.value}
                </span>
                <span
                  className={styles.status}
                  style={{ backgroundColor: handleValueStatus(item.value) }}
                ></span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sensor;
