
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillChart = ({ skills }) => {
  const labels = Object.keys(skills);
  const values = Object.values(skills);

  const data = {
    labels: labels.length > 0 ? labels : ["Analytical", "Technical", "Leadership", "Creative", "Execution"],
    datasets: [
      {
        label: "Market Proficiency Profile",
        data: values.length > 0 ? values : [0, 0, 0, 0, 0],
        backgroundColor: "rgba(99, 102, 241, 0.15)",
        borderColor: "#818cf8",
        borderWidth: 4,
        pointBackgroundColor: "#818cf8",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: "rgba(255, 255, 255, 0.1)" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        pointLabels: {
          color: "rgba(255, 255, 255, 0.7)",
          font: { size: 10, weight: "bold", family: "Inter" }
        },
        ticks: {
          display: false,
          stepSize: 1,
          beginAtZero: true,
          max: 5
        },
        suggestedMin: 0,
        suggestedMax: 5
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="h-80 w-full flex items-center justify-center">
      <Radar data={data} options={options} />
    </div>
  );
};

export default SkillChart;