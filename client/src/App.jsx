import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";
import { connectToBe } from "./api/connectToBE.js";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const connect = async () => {
      const { data } = await connectToBe();
      console.log(data.message);
    };
    connect();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
