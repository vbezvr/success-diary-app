import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { toCapitalize } from "../../helper";

function GeneralProgressBar() {
  const { data } = useSelector((state) => state.habitData);
  const labels = Object.keys(data).map((elem) => toCapitalize(elem));
  const chartData = {
    labels,
    datasets: [
      {
        data: handleChartData(data),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total history",
      },
    },
  };

  function handleChartData(data) {
    const activeDates = Object.values(data);
    const amountDays = activeDates.map((elem) => elem.active.length - 1);
    return amountDays;
  }
  return (
    <div className="card add-task">
      <div className="task-card">
        <h2>Overview</h2>
        <div><Bar options={options} data={chartData}/></div>
      </div>
    </div>
  );
}

export { GeneralProgressBar };
