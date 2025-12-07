"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function TablaCSV() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const csvFilePath = "/catalogo.csv";

    fetch(csvFilePath)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true });
        setHeaders(parsedData.meta.fields);
        setData(parsedData.data);
      })
      .catch((error) => console.error("Error al cargar CSV:", error));
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-[#fff] min-h-screen">
      {/* Título */}
     

      {/* Logo debajo del título */}
      <img
  src="/logo2.png"
  alt="Logo"
  className="w-102 h-auto my-15"
/>



      {/* Contenedor de la tabla */}
      <div className="w-[90%] h-[70vh] bg-white rounded-xl shadow-lg overflow-auto">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border-b border-gray-200 px-4 py-3 text-left text-gray-700 font-semibold text-sm uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="border-b border-gray-200 px-4 py-3 text-gray-700 text-sm"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
  
    </div>
  );
}
