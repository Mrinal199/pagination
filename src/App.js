import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchEmployees();
  }, [currentPage]);

  const fetchEmployees = () => {
    fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => {
        console.error('Failed to fetch data:', error);
        alert('Failed to fetch data');
      });
  };

  const indexOfLastEmployee = currentPage * 10;
  const indexOfFirstEmployee = indexOfLastEmployee - 10;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const nextPage = () => {
    if (currentPage < Math.ceil(employees.length / 10)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2 className="title">Employee Data Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button disabled>{currentPage}</button>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(employees.length / 10)}>Next</button>
      </div>
    </div>
  );
}

export default App;
