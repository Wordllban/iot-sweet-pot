import React, { useEffect, useState } from "react";
import styles from "./Sensor.module.scss";

import { ESensor, TSensor } from "../../types/sensor";
import { getSensorData } from "../../services/api";

interface SensorProps {
  type: ESensor;
}

const Sensor: React.FC<SensorProps> = ({ type }) => {
  const [data, setData] = useState<any>([]);

  const getData = async () => {
    const data = await getSensorData(type);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const refetch = setInterval(async () => {
      const data = await getSensorData(type);
      setData(data);
    }, 15000);
    return () => {
      clearInterval(refetch);
    };
  }, []);

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

  const handleTimeReveceived = (item: TSensor) => {
    const dateTime = item.createdAt.split("T");
    const date = dateTime[0];
    const time = dateTime[1].substring(0, dateTime[1].indexOf("."));
    return { date, time };
  };

  return (
    <div className={styles.sensor}>
      <h2 className={styles.header}>{type}</h2>
      <div className={styles.content}>
        {data &&
          data.map((item: TSensor) => {
            return (
              <div className={styles.value}>
                <span key={`${type}-${item.value}-${item.createdAt}`}>
                  {item.value}
                  {type === ESensor.moisture && "%"}
                </span>
                <span
                  className={styles.status}
                  style={{ backgroundColor: handleValueStatus(item.value) }}
                ></span>
                <span className={styles.time}>
                  {handleTimeReveceived(item).time}
                </span>
                <span className={styles.time}>
                  {handleTimeReveceived(item).date}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sensor;
