import { createBrowserRouter } from "react-router-dom";
import ActivationFirstStep from "ui/pages/ActivationFirstStep";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../pages/Layout";
import ActivationSecondStep from "ui/pages/ActivationSecondStep";
import ActivationThirdStep from "ui/pages/ActivationThirdStep";

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
        path: "/cheque/activation/thirdStep",
        element: <ActivationThirdStep />
      },
    ]
  }
]);

export default router;
