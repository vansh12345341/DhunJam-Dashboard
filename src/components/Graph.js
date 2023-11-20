import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraphComponent = ({ data }) => {
  const chartData = {
    labels: ['Custom', 'Category1', 'Category2', 'Category3', 'Category4'],
    datasets: [
      {
        label: 'Song Request Amount',
        data: data,
        backgroundColor: 'rgba(240, 195, 241, 0.6)',
        borderColor: '#FFFFFF',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#FFFFFF',
        },
        grid: {
          display: false, 
          drawBorder: false, 
        },
      },
      x: {
        ticks: {
          color: '#FFFFFF',
        },
        grid: {
          display: false, 
          drawBorder: false, 
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
        labels: {
          color: '#FFFFFF',
        },
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default GraphComponent;

