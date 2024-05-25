import React from "react";
import ReactApexChart from "react-apexcharts";
import { TOTAL_QUESIOTNS_LENGTH } from "../../pages/Questions/Questions";

const PieChart = ({ score, wrongAnswers }) => {
  const options = {
    labels: ["Correct Answers", "Wrong Answers", "Skipped Questions"],
    colors: ["#28a745", "#dc3545", "#6c757d"],
    legend: {
      position: "bottom",
    },
  };

  const series = [score, wrongAnswers, TOTAL_QUESIOTNS_LENGTH - (score + wrongAnswers)];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      height={300}
    />
  );
};

export default PieChart;
