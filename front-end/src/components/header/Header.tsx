import React from "react";
import { ESensor } from "../../types/sensor";

interface HeaderProps {
  type: ESensor;
}

const Header: React.FC<HeaderProps> = ({ type }) => {
  return <div>Header</div>;
};

export default Header;
