import React, { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
  //creating alert state
  const [alert, setAlert] = useState(null);

  //creating a function to set alert and show alert
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);  // Auto-dismiss after 3 seconds
  };
  return (
    <AlertContext.Provider
      value={{ alert, showAlert }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState
