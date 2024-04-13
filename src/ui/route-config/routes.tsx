import { createBrowserRouter } from "react-router-dom";
import SelectAccount from "ui/pages/IssueCheck/SelectAccount";
import ActivationFirstStep from "ui/pages/activation/ActivationFirstStep";
import ActivationSecondStep from "ui/pages/activation/ActivationSecondStep";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "/cheque", element: <HomePage /> },
      {
        path: "/cheque/activation/firstStep",
        element: <ActivationFirstStep />
      },
      {
        path: "/cheque/activation/secondStep",
        element: <ActivationSecondStep />
      },
      {
        path: "/cheque/Issue/SelectAccount",
        element: <SelectAccount />
      }
    ]
  }
]);

export default router;
