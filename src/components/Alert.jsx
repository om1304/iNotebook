import React, { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";  // Import the AlertContext

const Alert = () => {
  const { alert } = useContext(AlertContext);  // Consume the alert context

  if (!alert) return null;  // If no alert, don't render anything

  return (
    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
      {alert.message}
      <button type="button" className="btn-close" aria-label="Close"></button>
    </div>
  );
};

export default Alert;
