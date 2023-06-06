// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";

export default function data(employees) {
  const columns = [
    { Header: "name", accessor: "name", align: "center" },
    { Header: "pay period", accessor: "period", align: "center" },
    { Header: "gross income", accessor: "status", align: "center" },
    { Header: "income tax", accessor: "employed", align: "center" },
    { Header: "net income", accessor: "action", align: "center" },
    { Header: "super amount", accessor: "super", align: "center" },
  ];
  const rows = employees.map((employee) => ({
    name: (
      <MDTypography variant="button" color="text" fontWeight="medium">
        {employee.name}
      </MDTypography>
    ),
    period: (
      <MDTypography variant="button" color="text" fontWeight="medium">
        {employee.payPeriod}
      </MDTypography>
    ),
    status: (
      <MDTypography variant="button" color="text" fontWeight="medium">
        {employee.grossIncome}
      </MDTypography>
    ),
    employed: (
      <MDTypography variant="button" color="text" fontWeight="medium">
        {employee.incomeTax}
      </MDTypography>
    ),
    action: (
      <MDTypography variant="button" color="text" fontWeight="medium">
        {employee.netIncome}
      </MDTypography>
    ),
    super: (
      <MDTypography variant="button" color="text" fontWeight="medium">
        {employee.superAmount}
      </MDTypography>
    ),
  }));
  return {
    columns,
    rows,
  };
}
