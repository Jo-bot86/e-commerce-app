import React from 'react'
import { NavLink } from 'react-router-dom';

export default function UserLoginDropdown() {
  return (
    <ul className='navbar-nav me-auto '>
      <li className='nav-item dropdown '>
        <NavLink
          className='dropdown-toggle link-info'
          to='#'
          id='navbarDropdown'
          role='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          Anmelden
        </NavLink>
        <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
          <li>
            <NavLink className='dropdown-item bg-white text-black' to='/login'>
              Login
            </NavLink>
          </li>
          <li>
            <hr className='dropdown-divider' />
          </li>
          <li>
            <NavLink
              className='dropdown-item bg-white text-black'
              to='/register'
            >
              Registrieren
            </NavLink>
          </li>
        </ul>
      </li>
    </ul>
  );
}
