import { createBrowserRouter } from "react-router-dom";
import HomePage from "ui/pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true,path: '/cheque', element: <HomePage /> }]
  }
]);

export default router;
