/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

export default function data(employees) {
  const names = [];
  const incomes = [];

  employees.forEach((employee) => {
    names.push(employee.name);
    incomes.push(employee.netIncome);
  });

  return {
    labels: names,
    datasets: { data: incomes },
  };
}
