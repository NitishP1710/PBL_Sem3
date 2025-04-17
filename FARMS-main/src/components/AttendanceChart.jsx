import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const generateRandomAttendanceData = () => {
  const subjects = [
    "FDS", 
    "CG", 
    "DM", 
    "OOP", 
    "DELD"
  ];
  
  return subjects.map(subject => {
    const totalClasses = Math.floor(Math.random() * 30) + 10; // 10-40 classes
    const presentClasses = Math.floor(Math.random() * totalClasses);
    
    return {
      subject,
      present: presentClasses,
      total: totalClasses
    };
  });
};

export default function AttendanceChart() {
  const attendanceData = generateRandomAttendanceData();
  
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
      tooltip: {
        callbacks: {
          label: (context) => {
            const data = attendanceData[context.dataIndex];
            return [
              `Present: ${data.present}/${data.total} classes`,
              `Percentage: ${context.raw}%`
            ];
          }
        }
      }
    },
  };

  return (
    <div className="h-96 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Random Attendance Chart</h2>
      <Bar data={barGraphData} options={barGraphOptions} />
      <div className="mt-4 text-sm text-gray-600">
        <p className="flex items-center">
          <span className="inline-block w-3 h-3 bg-green-500 mr-2"></span>
          ≥75% attendance (Good)
        </p>
        <p className="flex items-center">
          <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
          &lt;75% attendance (Needs improvement)
        </p>
      </div>
    </div>
  );
}