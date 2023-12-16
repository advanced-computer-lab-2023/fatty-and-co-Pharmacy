import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartOptions } from "./chart";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";

function SalesLineChart(props) {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [chartData, setChartData] = useState(props.chartData);
  const [chartOptions, setChartOptions] = useState({});
  
  useEffect(() => {
    setChartData(props.chartData);
    setChartOptions(lineChartOptions);
  }, []); 

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
}

export default SalesLineChart;
