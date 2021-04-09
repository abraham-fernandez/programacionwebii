import React, { useContext } from "react";
import AuthContext from "../AuthContext.js";

const Stats = () => {
  const { user } = useContext(AuthContext);
  const mdColors = [
    '#F44336',
    '#1565C0',
    '#FFCDD2',
    '#66BB6A',
    '#E57373',
    '#827717',
    '#F44336',
    '#E53935',
    '#D32F2F',
    '#EC407A',
    '#E91E63',
    '#D81B60',
    '#C2185B',
    '#AD1457']

  return <p>{user.name}’s stats</p>;
};

export default Stats;
