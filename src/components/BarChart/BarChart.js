import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Categories from "../../constant/Categories";
const BarChart = ({ chartData, Amount }) => {
  const [data, setData] = useState({
    data: {
      labels: Categories.map((c) => c.name),
      datasets: [
        {
          label: "Harcamanızın Dağılımı",
          data: Categories.map((c) => 0),
          backgroundColor: ["#C3ECEA"],
        },
      ],
    },
  });
  const options = {
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        formatter: function (value) {
          return value + " TL";
        },
        anchor: "end",
        offset: -20,
        align: "start",
      },
      legend: {
        display: true,
      },
      subtitle: {
        color: "#349590",
        display: true,
        align: "center",
        text: "Toplam harcamanız " + Amount + " TL",
      },
    },
    responsive: true,
    animations: {
      tension: {
        easing: "linear",
      },
    },
  };

  useEffect(() => {
    if (chartData) {
      setData({
        ...data,
        data: {
          labels: Object.keys(chartData),
          datasets: [
            {
              backgroundColor: ["#C3ECEA"],
              label: "Harcamanızın Dağılımı",
              data: Object.values(chartData),
            },
          ],
        },
      });
    }
  }, [chartData]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "400px",
      }}
    >
      <Bar data={data.data} plugins={[ChartDataLabels]} options={options} />
    </div>
  );
};
export default BarChart;
