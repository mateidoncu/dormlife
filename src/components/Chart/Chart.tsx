'use client';

import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { FC } from 'react';
import { Bar } from 'react-chartjs-2';

import { Rent } from '@/models/rent';

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const Chart: FC<{ userRents: Rent[] }> = ({ userRents }) => {
  const labels = userRents.map(rent => rent.dormRoom.name);
  const amountSpent = userRents.map(rent => rent.price);

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: 'Amount spent',
            data: amountSpent,
            borderWidth: 1,
            backgroundColor: '#6B9AC4',
            hoverBackgroundColor: '#4059AD',
          },
        ],
      }}
    />
  );
};

export default Chart;