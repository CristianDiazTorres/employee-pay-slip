import { useState, useMemo } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import ReportsLineChart from "components/Charts/LineCharts/ReportsLineChart";
import DataTable from "components/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

function Dashboard() {
  const today = new Date().toISOString().slice(0, 10);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    annualSalary: "",
    superRate: "",
    paymentDate: today,
  });
  const [validates, setValidates] = useState({});
  const [employees, setEmployees] = useState([]);

  const { columns, rows } = authorsTableData(employees);
  let incomes = useMemo(() => reportsLineChartData(employees), [employees]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setValidates("");
    if (!inputs.firstName) {
      setValidates({ firstName: true });
      return;
    }
    if (!inputs.lastName) {
      setValidates({ lastName: true });
      return;
    }
    if (!inputs.annualSalary) {
      setValidates({ annualSalary: true });
      return;
    }
    if (!inputs.superRate || parseInt(inputs.superRate, 10) > 12) {
      setValidates({ superRate: true });
      return;
    }
    if (!inputs.paymentDate) {
      setValidates({ paymentDate: true });
      return;
    }

    axios
      .get("http://localhost:3001/api", {
        params: {
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          annualSalary: inputs.annualSalary,
          superRate: inputs.superRate,
          paymentDate: inputs.paymentDate,
        },
      })
      .then((response) => {
        setEmployees((arr) => [...arr, response.data]);
        incomes = reportsLineChartData(employees);
      });
  };

  return (
    <MDBox m={5} p={7} bgColor="#E5E5E5" borderRadius="10">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4} mb={5}>
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Add the Employee Payslip
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={inputs.firstName}
                    fullWidth
                    required
                    error={validates.firstName}
                    onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={inputs.lastName}
                    fullWidth
                    required
                    error={validates.lastName}
                    onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="number"
                    id="annualSalary"
                    name="annualSalary"
                    label="Annual Salary"
                    value={inputs.annualSalary}
                    fullWidth
                    required
                    error={validates.annualSalary}
                    onChange={(e) => setInputs({ ...inputs, annualSalary: e.target.value })}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="number"
                    id="superRate"
                    name="superRate"
                    label="Super Rate(1-12%)"
                    value={inputs.superRate}
                    fullWidth
                    required
                    error={validates.superRate}
                    onChange={(e) => setInputs({ ...inputs, superRate: e.target.value })}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="date"
                    id="paymentDate"
                    name="paymentDate"
                    label="Payment Date"
                    value={inputs.paymentDate}
                    fullWidth
                    required
                    error={validates.paymentDate}
                    onChange={(e) => setInputs({ ...inputs, paymentDate: e.target.value })}
                  />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    type="submit"
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Add Employee
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <MDBox mb={7}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white">
                      Employees Table
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    <DataTable
                      table={{ columns, rows }}
                      entriesPerPage={false}
                      isSorted={false}
                      showTotalEntries
                    />
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox>
            <ReportsLineChart color="info" title="Employee Net Incomes" chart={incomes} />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Dashboard;
