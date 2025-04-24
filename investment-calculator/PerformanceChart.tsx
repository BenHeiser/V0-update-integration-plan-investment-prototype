import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

const ChartContainer = styled.div`
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 8px;
  height: 400px;
`;

interface PerformanceChartProps {
  data: {
    amount: number;
    frequency: string;
    stock: string;
    startDate: string;
  };
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Mock data for demonstration
        const labels = Array.from({ length: 12 }, (_, i) => {
          const date = new Date(data.startDate);
          date.setMonth(date.getMonth() + i);
          return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        });

        const investmentData = labels.map((_, i) => {
          const baseAmount = data.amount;
          const monthlyGrowth = 0.02; // 2% monthly growth for demonstration
          return baseAmount * Math.pow(1 + monthlyGrowth, i);
        });

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: 'Investment Value',
                data: investmentData,
                borderColor: 'var(--bg-action-primary)',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                  label: (context) => {
                    const value = context.parsed.y;
                    return `$${value.toLocaleString()}`;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `$${Number(value).toLocaleString()}`,
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <ChartContainer>
      <canvas ref={chartRef} />
    </ChartContainer>
  );
};

export default PerformanceChart; 