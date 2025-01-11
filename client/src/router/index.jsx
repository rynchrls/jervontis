import { createBrowserRouter } from "react-router-dom";
import HomePage from "../component";
import WelcomePage from "../component/welcome";

const userId = JSON.parse(localStorage.getItem("userId"));

const router = createBrowserRouter([
  {
    path: "/:cId?",
    element: userId ? <HomePage /> : <WelcomePage />,
    errorElement: <div>404 Not Found</div>,
  },
]);

export default router;
