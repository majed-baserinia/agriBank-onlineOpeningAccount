import { createBrowserRouter } from "react-router-dom";
import ActivationFirstStep from "ui/pages/activation/ActivationFirstStep";
import ActivationSecondStep from "ui/pages/activation/ActivationSecondStep";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import IssueCheck from "ui/pages/IssueCheck/SelectCheck";

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
        path: "/cheque/Issue/firstStep",
        element: <IssueCheck />
      }
    ]
  }
]);

export default router;
