import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Notification} from "../components/notification/Notification.tsx";

interface INotification {
  status?: "success" | "warning" | "error";
  title?: string | number;
  message?: string | number;
}

interface NotificationContextType {
  notification: INotification | null;
  showNotification: (title?: string | number, message?: string | number, status?: "success" | "warning" | "error") => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [notification, setNotification] = useState<INotification | null>(null);

  const showNotification = (title?: string | number, message?: string | number, status?: "success" | "warning" | "error") => {
    setNotification({status, title, message});
  };

  const hideNotification = () => {
    setNotification(null);
  };


  return (
      <NotificationContext.Provider value={{notification, showNotification, hideNotification}}>
        {children}
        {notification && <Notification notification={notification} onHide={hideNotification}/>}
      </NotificationContext.Provider>
  );
};
