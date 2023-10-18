import React, { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartComponent = () => {
  const [chartData, setChartData] = useState({});
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      fetch("http://localhost:4000/api/users")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          // Count the number of patients with the same name
          const patientNameCounts = {};
          data.data.forEach((entry) => {
            const name = entry.patientName;
            if (patientNameCounts[name]) {
              patientNameCounts[name]++;
            } else {
              patientNameCounts[name] = 1;
            }
          });

          // Calculate the average heart rate and body temperature
          const heartRateSum = data.data.reduce(
            (total, entry) => total + parseInt(entry.heartRate, 10),
            0
          );
          const averageHeartRate = heartRateSum / data.data.length;

          const bodyTemperatureSum = data.data.reduce(
            (total, entry) => total + parseInt(entry.bodyTemperature, 10),
            0
          );
          const averageBodyTemperature = bodyTemperatureSum / data.data.length;

          // Find the most common sickness
          const sicknessCounts = {};
          data.data.forEach((entry) => {
            const sickness = entry.patientRequestSickness;
            if (sicknessCounts[sickness]) {
              sicknessCounts[sickness]++;
            } else {
              sicknessCounts[sickness] = 1;
            }
          });

          const commonSickness = Object.keys(sicknessCounts).reduce((a, b) =>
            sicknessCounts[a] > sicknessCounts[b] ? a : b
          );

          // Find the maximum heart rate and body temperature
          const maxHeartRate = Math.max(...data.data.map((entry) => parseInt(entry.heartRate, 10)))
          const maxBodyTemperature = Math.max(...data.data.map((entry) => parseInt(entry.bodyTemperature, 10)))

          const chartData = {
            labels: [
              "Number of Patients",
              "HeartRate",
              "BodyTemperature",
              "Common Sickness"
            ],
            datasets: [
              {
                label: "Data",
                data: [
                  Object.keys(patientNameCounts).length, // Count of unique patient names
                  maxHeartRate, // Maximum heart rate
                  maxBodyTemperature, // Maximum body temperature
                  sicknessCounts[commonSickness] // Count of the common sickness
                ],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                barPercentage: 0.4, // Adjust the bar width as needed (0.5 means 50% of the available space)
              }
            ]
          };

          setChartData(chartData);
          setDataFetched(true);
        });
    }
  }, [dataFetched]);

  return (
    <div>
      <h2>Data in Chart</h2>
      {dataFetched && (
        <Bar
          data={chartData}
          height={200} // Adjust the height as needed
          width={400} // Adjust the width as needed
          options={{
            scales: {
              x: {
                type: "category",
                position: "bottom",
                categorySpacing: 0.1
              },
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default ChartComponent;
