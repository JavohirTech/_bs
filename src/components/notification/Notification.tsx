import React, {useEffect, useState} from 'react';
import "./styles.scss"

interface NotificationProps {
  notification: {
    status?: "success" | "warning" | "error";
    title?: string | number;
    message?: string | number;
  };
  onHide: () => void;
}

export const Notification: React.FC<NotificationProps> = ({notification, onHide}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onHide, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification, onHide]);

  const {status = "error", message = "", title} = notification;

  return (
      <div
          className={`alert alert-dismissible bg-${status === "success" ? "success" : status === "error" ? "danger" : "warning"} d-flex flex-column align-items-center flex-sm-row p-3 mb-10 ${show ? 'fade-in' : 'fade-out'}`}
          style={{
            position: 'fixed',
            top: "10px",
            right: "10px",
            zIndex: 9999,
            maxWidth: '100%',
            transition: 'opacity 0.3s ease-out',
          }}
      >
        <i
            className={`fa-solid fs-3 ${status === "success" ? "fa-shield-check" : status === "error" ? "fa-shield-xmark" : "fa-circle-info"} fs-3x text-white me-2`}
        ></i>
        <div className="d-flex flex-column text-light pe-0 ps-3 pe-sm-10">
          <h5 className="mb-1 text-white capitalize">{title}</h5>
          <span>{message}</span>
        </div>
        <i className="fa-solid fa-xmark fs-2x text-white position-absolute top-0 end-0 m-2"
           onClick={() => setShow(false)}></i>
      </div>
  );
};