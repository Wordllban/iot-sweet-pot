import React from "react";

// styles
import styles from "./App.module.scss";
import Button from "./components/button/Button";

// components
import Sensor from "./components/sensor/Sensor";

// types
import { ESensor } from "./types/sensor";

function App() {
  const handleRefreshData = () => {
    console.log("data refreshed");
  };

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <Sensor type={ESensor.humidity} />
        <Sensor type={ESensor.temperature} />
        <Sensor type={ESensor.moisture} />
      </div>
      <div className={styles.refresh}>
        <Button onClickHandler={handleRefreshData} />
      </div>
    </div>
  );
}

export default App;
