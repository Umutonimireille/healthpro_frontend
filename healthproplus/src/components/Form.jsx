import React from "react";
import { useState } from "react";
import ChartComponent from "./ChartComponent";

export function Form() {

   const [displayChart, setDisplayChart] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    patientNid: "",
    patientRequestSickness: "",
    heartRate: "",
    bodyTemperature: "",
  });
  const [tableData, setTableData] = useState([]); // Store table data here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const response = await fetch("http://localhost:4000/api/user", {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify(formData)
     });
     console.log("after submitting data");

     if (response.ok) {
       console.log(
         "Data submitted successfully :" + formData.patientRequestSickness
       );
       setDisplayChart(true);

       // Fetch data for the table
       const tableResponse = await fetch("http://localhost:4000/api/users"); // Replace with your actual endpoint
       if (tableResponse.ok) {
         const data = await tableResponse.json();
       
         console.log(data);
       } else {
         const errorResponse = await tableResponse.text(); // Read the error response as text
         console.error("Server error:", errorResponse);
       }
     } else {
       const errorResponse = await response.json(); // Parse the response as JSON
       console.error("Server error:", errorResponse);
     }
   } catch (error) {
     // Handle network or other errors.
     console.error("Network error:", error);
   }
   console.log("Table data length:", tableData.length);

 };


  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
          CREATE HEALTH STATUS
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="patientName"
              className="block text-sm font-semibold text-gray-800"
            >
              patientName
            </label>
            <input
              type="text"
              name="patientName"
              onChange={handleChange}
              value={formData.patientName}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="patientNid"
              className="block text-sm font-semibold text-gray-800"
            >
              PatientNid
            </label>
            <input
              type="text"
              name="patientNid"
              onChange={handleChange}
              value={formData.patientNid}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="patientFrequentSickness"
              className="block text-sm font-semibold text-gray-800"
            >
              patientFrequentSickness
            </label>
            <input
              type="text"
              name="patientRequestSickness"
              onChange={handleChange}
              value={formData.patientRequestSickness}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="heartRate"
              className="block text-sm font-semibold text-gray-800"
            >
              heartRate
            </label>
            <input
              type="text"
              name="heartRate"
              onChange={handleChange}
              value={formData.heartRate}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="bodyTemperature"
              className="block text-sm font-semibold text-gray-800"
            >
              bodyTemperature
            </label>
            <input
              type="text"
              name="bodyTemperature"
              onChange={handleChange}
              value={formData.bodyTemperature}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
              display
            </button>
          </div>
        </form>
      </div>
      {displayChart && <ChartComponent />}
      {/* {tableData.length > 0 && (
        <div className="p-6 mt-6">
          <h2 className="text-2xl font-semibold text-indigo-700">
            Data from the Backend
          </h2>
          <table className="">
            <thead>
              <tr>
                <th className="">Patient Name</th>
                <th className="px-4 py-2">Patient NID</th>
                <th className="px-4 py-2">Body Temperature</th>
                <th className="px-4 py-2">Heart Rate</th>
                <th className="px-4 py-2">Patient Requested Sickness</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{row.patientName}</td>
                  <td className="px-4 py-2">{row.patientNid}</td>
                  <td className="px-4 py-2">{row.bodyTemperature}</td>
                  <td className="px-4 py-2">{row.heartRate}</td>
                  <td className="px-4 py-2">{row.patientRequestSickness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
    </div>
  );
}

