import React from "react";
import { useParams } from "react-router-dom";

const Overview = (props) => {
  const { name } = useParams();
  console.log(name);
  return <div>오버뷰입니다.</div>;
};

export default Overview;
