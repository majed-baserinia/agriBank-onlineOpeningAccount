import ActivationSecondStep from "ui/pages/activation/ActivationSecondStep";
import ActivationFirstStep from "ui/pages/activation/ActivationFirstStep";
import SelectAccount from "ui/pages/IssueCheck/SelectAccount";
import { createBrowserRouter } from "react-router-dom";
import CheckInfo from "ui/pages/IssueCheck/CheckInfo";

import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import AddRecievers from "ui/pages/IssueCheck/AddRecievers";
import SignatureRegistration from "ui/pages/IssueCheck/SignatureRegistration";
import SignatureGroup from "ui/pages/IssueCheck/SignatureGroup";
import OverView from "ui/pages/IssueCheck/OverView";

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
      },
      {
        path: "/cheque/Issue/CheckInfo",
        element: <CheckInfo />
      },
      {
        path: "/cheque/Issue/addRecievers",
        element: <AddRecievers />
      },
      {
        path: "/cheque/Issue/SignatureRegistration",
        element: <SignatureRegistration />
      },
      {
        path: "/cheque/Issue/SignatureGroup",
        element: <SignatureGroup />
      },
      {
        path: "/cheque/Issue/OverView",
        element: <OverView />
      }
    ]
  }
]);

export default router;
