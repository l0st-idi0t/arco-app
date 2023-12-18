import React, { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import { useTable, useFilters } from "react-table";
import { COLUMNS } from "./components/columns";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const filePath = "/data/dataset.csv";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(filePath);
        if (response.ok) {
          const csvText = await response.text();
          Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
              setData(result.data);
            },
          });
        } else {
          console.error("Failed to fetch CSV file:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching CSV file:", error);
      }
    };
    fetchData();
  }, [filePath]);

  const columns = useMemo(() => COLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters);

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
