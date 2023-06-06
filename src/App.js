// react-router components
import { Routes, Route, Navigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React routes
import routes from "routes";

export default function App() {
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
