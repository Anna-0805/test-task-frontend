import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './TopMenu.scss';

const DAYS_RU = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

const TopMenu = () => {
  const [time, setTime] = useState(new Date());
  const [activeSession, setActiveSession] = useState(1);

  // 1. Живые часы
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Подключение к Веб-сокетам 
  useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.on('activeSessions', (count) => {
      setActiveSession(count);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // 3. Автоматическое определение дня недели
  const currentDayRu = DAYS_RU[time.getDay()];

  // 4. Форматирование даты и времени
  const dayStr = time.getDate().toString().padStart(2, '0');
  const monthStr = time.toLocaleDateString('ru-RU', { month: "short" }).replace(".", "");
  const formattedMonth = monthStr.charAt(0).toUpperCase() + monthStr.slice(1);
  const yearStr = time.getFullYear();
  
  const formattedDate = `${dayStr} ${formattedMonth}, ${yearStr}`;
  const formattedTime = time.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="top-menu d-flex align-items-center bg-white px-4">
      
      {/* ЛЕВАЯ ЧАСТЬ: Логотип */}
      <div className="top-menu__logo-block d-flex align-items-center gap-2">
        <div className="top-menu__logo-shield d-flex align-items-center justify-content-center rounded-circle">
          <img src="/person.svg" alt="Logo" className="top-menu__logo-img" />
        </div>
        <span className="top-menu__logo-text fw-bold text-uppercase">
          INVENTORY
        </span>
      </div>

      {/* ЦЕНТРАЛЬНАЯ ЧАСТЬ: ПОИСК */}
      <div className="top-menu__search-block">
        <input 
          type="text" 
          className="top-menu__search-input form-control form-control-sm border-secondary-subtle" 
          placeholder="Поиск" 
        />
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}
      <div className="top-menu__right-side d-flex align-items-center gap-4 ms-auto">
        <div className="top-menu__sessions text-muted small">
          Сессии: <span className="fw-bold text-dark">{activeSession}</span>
        </div>

        <div className="top-menu__time-block text-start d-flex flex-column justify-content-center">
          {/* Верхняя строка: День недели */}
          <div className="top-menu__date-row text-muted">
            {currentDayRu}
          </div>
          
          {/* Нижняя строка: Дата, часы */}
          <div className="top-menu__time-row d-flex align-items-center gap-2 mt-1">
            <span className="top-menu__date-text text-dark fw-medium">
              {formattedDate}
            </span>
            <div className="top-menu__clock-wrapper d-flex align-items-center gap-1">
              <span className="top-menu__clock-icon">🕒</span>
              <span className="top-menu__time-text text-dark fw-bold">{formattedTime}</span>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default TopMenu;