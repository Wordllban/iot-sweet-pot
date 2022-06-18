import React from "react";
import styles from "./Sensor.module.scss";

import { ESensor } from "../../types/sensor";

interface SensorProps {
  type: ESensor;
}

const Sensor: React.FC<SensorProps> = ({ type }) => {
  return (
    <div className={styles.sensor}>
      <h2 className={styles.header}>{type}</h2>
      <div className={styles.content}>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
    </div>
  );
};

export default Sensor;
