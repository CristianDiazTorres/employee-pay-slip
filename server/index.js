const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.get("/api", (req, res) => {
  const fullName = `${req.query.firstName} ${req.query.lastName}`;
  const { annualSalary, superRate, paymentDate } = req.query;

  const grossIncome = Math.round(annualSalary / 12);

  const incomeTax = (salary) => {
    let tax = 0;
    if (salary > 0 && salary <= 18200) {
      tax = 0;
    } else if (salary > 18200 && salary <= 37000) {
      tax = Math.round(((grossIncome - 18200) * 0.19) / 12);
    } else if (salary > 37000 && salary <= 87000) {
      tax = Math.round(((salary - 37000) * 0.325 + 3572) / 12);
    } else if (salary > 87000 && salary <= 180000) {
      tax = Math.round(((salary - 87000) * 0.37 + 19822) / 12);
    } else if (salary > 180000) {
      tax = Math.round(((salary - 180000) * 0.45 + 54232) / 12);
    }
    return tax;
  };
  const employeeIncomeTax = incomeTax(annualSalary);
  const netIncome = grossIncome - employeeIncomeTax;
  const superAmount = Math.round((grossIncome * superRate) / 100);
  const newDate = new Date(paymentDate);
  const monthsName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthsName[newDate.getMonth()];
  const date = `${newDate.getDate()} ${month}`;
  const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
  const lastDate = `${lastDay.getDate()} ${month}`;

  res.json({
    name: fullName,
    payPeriod: `${date}-${lastDate}`,
    grossIncome,
    incomeTax: employeeIncomeTax,
    netIncome,
    superAmount,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
