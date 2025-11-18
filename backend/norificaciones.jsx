// src/context/NotificationContext.jsx
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // "success" | "error" | "warning"

  const notify = (msg, t = "success") => {
    setMessage(msg);
    setType(t);

    setTimeout(() => {
      setMessage("");
      setType("");
    }, 3000); // Se oculta automáticamente después de 3 segundos
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      {message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "15px",
            borderRadius: "8px",
            color: "white",
            background:
              type === "success"
                ? "green"
                : type === "error"
                ? "red"
                : "orange",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 9999,
            fontSize: "16px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
          }}
        >
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
}
