/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../pages/auth/routes";
import DefaultLayout from "../../layouts/DefaultLayout";
import Logout from "../../pages/auth/views/Logout";
import DriverRoutes from "../../pages/Drivers/routes";
import HomeRoutes from "../../pages/Home/routes";
import RouteScheduleRoutes from "../../pages/RouteSchedule/routes";
import ReportRoutes from "../../pages/Reports/routes";
import InspectorRoutes from "../../pages/Inspectors/routes";

function AppRoutes() {
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect(() => {
    if (user !== null) {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setIsLoggedIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading, isError, isSuccess, message]);

  return (
    <>
      {isLoggedIn ? (
        <PrivateRoutes user={user} />
      ) : (
        <AuthRoutes setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

/**
 * manage private routes
 * @returns Router
 */
const PrivateRoutes = (props) => {
  const { user } = props;
  const routes = [
    {
      path: "/logout",
      element: <Logout />,
      exact: true,
    },
    { path: "", element: <Navigate to="ts/home" /> },
    {
      path: "/ts",
      element: <DefaultLayout />,
      children: [
        // ...EventRoutes(user && user.role),
        ...DriverRoutes,
        ...HomeRoutes,
        ...InspectorRoutes,
        ...ReportRoutes,
        ...RouteScheduleRoutes,
      ],
    },
  ];
  let element = useRoutes(routes);

  return element;
};

export { AppRoutes };
