import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClickHandler: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClickHandler }) => {
  return (
    <button className={styles.button} onClick={onClickHandler}>
      Refresh
    </button>
  );
};

export default Button;
