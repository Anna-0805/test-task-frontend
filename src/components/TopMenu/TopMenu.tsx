import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { DAYS_EN } from "../../utils/constants";
import "./TopMenu.scss";

const TopMenu: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [activeSession, setActiveSession] = useState<number>(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const socket: Socket = io("http://localhost:3001");

    socket.on("activeSessions", (count: number) => {
      setActiveSession(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const currentDayEn: string = (DAYS_EN as string[])[time.getDay()];
  const dayStr: string = time.getDate().toString().padStart(2, "0");
  const monthStr: string = time
    .toLocaleDateString("en-US", { month: "short" })
    .replace(".", "");
  
  const formattedMonth: string = monthStr.charAt(0).toUpperCase() + monthStr.slice(1);
  const yearStr: number = time.getFullYear();
  const formattedDate: string = `${dayStr} ${formattedMonth}, ${yearStr}`;
  
  const formattedTime: string = time.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="top-menu d-flex align-items-center bg-white px-4">
      <div className="top-menu__logo-block d-flex align-items-center gap-2">
        <div className="top-menu__logo-shield d-flex align-items-center justify-content-center rounded-circle">
          <img src="/person.svg" alt="Logo" className="top-menu__logo-img" />
        </div>
        <span className="top-menu__logo-text fw-bold text-uppercase">
          INVENTORY
        </span>
      </div>
      
      <div className="top-menu__search-block">
        <input
          type="text"
          className="top-menu__search-input form-control form-control-sm border-secondary-subtle"
          placeholder="Search"
        />
      </div>
      
      <div className="top-menu__right-side d-flex align-items-center gap-4 ms-auto">
        <div className="top-menu__sessions text-muted small">
          Sessions: <span className="fw-bold text-dark">{activeSession}</span>
        </div>
        
        <div className="top-menu__time-block text-start d-flex flex-column justify-content-center">
          <div className="top-menu__date-row text-muted">{currentDayEn}</div>
          <div className="top-menu__time-row d-flex align-items-center gap-2 mt-1">
            <span className="top-menu__date-text text-dark fw-medium">
              {formattedDate}
            </span>
            <div className="top-menu__clock-wrapper d-flex align-items-center gap-1">
              <span className="top-menu__clock-icon">🕒</span>
              <span className="top-menu__time-text text-dark fw-bold">
                {formattedTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopMenu;