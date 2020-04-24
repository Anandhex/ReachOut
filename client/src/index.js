import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
toast.configure({
  draggable: true,
  autoClose: 3000,
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
