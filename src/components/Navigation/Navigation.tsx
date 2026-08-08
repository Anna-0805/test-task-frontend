import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";
import { MENU_ITEMS } from "../../utils/constants";

interface MenuItem {
  to: string;
  label: string;
}

const Navigation: React.FC = () => {
  return (
    <div className="navigation d-flex flex-column align-items-center border-end shadow-sm">
      <div className="navigation__profile text-center position-relative w-100">
        <div className="navigation__avatar-wrapper position-relative d-inline-block">
          <img
            src="/profile.jpg"
            alt=""
            className="navigation__avatar rounded-circle border border-light shadow-sm"
          />
          <button
            className="navigation__settings-btn btn p-0 d-flex align-items-center justify-content-center rounded-circle"
            aria-label="Profile settings"
          >
            ⚙️
          </button>
        </div>
      </div>
      <nav className="navigation__menu w-100">
        <ul className="list-unstyled d-flex flex-column gap-3 p-0 m-0 w-100">
          {(MENU_ITEMS).map((item) => (
            <li key={item.to} className="w-100 text-center">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `navigation__link fw-bold text-uppercase text-decoration-none ${
                    isActive ? "navigation__link--active" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;