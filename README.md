# Employee payslip for a flexible pay cycle

### React + NodeJS + Material UI

When a user input’s the employee's details: first name, last name, annual salary (natural numbers) and super rate (0% - 12% inclusive), payment start date, the program should generate payslip information with name, pay period, gross income, income tax, net income and superannuation.

Example calculation for a calendar month is as follows:
- pay period = per calendar month
- gross-income = annual-salary / 12 months
- income-tax = based on the tax table provide below
- net-income = gross-income - income-tax
- super = gross-income x super-rate

### How to test on Local system

    npm install
    npm start

Open the browser to http://localhost:3000, the API will listen requests.

### End