import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AttendanceChart({ attendanceData }) {
  const attendancePercentages = attendanceData.map(item => 
    item.total === 0 ? 0 : Math.round((item.present / item.total) * 100)
  );

  const barGraphData = {
    labels: attendanceData.map(item => item.subject), 
    datasets: [
      {
        label: "Attendance Percentage",
        data: attendancePercentages, 
        backgroundColor: attendancePercentages.map(percentage => 
          percentage >= 75 ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)"
        ),
        borderColor: attendancePercentages.map(percentage => 
          percentage >= 75 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const barGraphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Attendance Percentage (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Subjects",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="h-96">
      <Bar data={barGraphData} options={barGraphOptions} />
    </div>
  );
}