import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLoginContext } from '../Store';
import SearchBar from './SearchBar';
import UserLoginDropdown from './user/UserLoginDropdown';
import UserSettings from './user/UserSettings';

export default function NavBar() {
  const { loginStore } = useLoginContext();

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <NavLink
          exact
          to='/'
          className='navbar-brand'
          aria-current='page'
          style={{ textDecoration: 'none' }}
        >
          <i className='far fa-handshake fs-4'></i>
          HandShake
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink exact to='/products' className='nav-link'>
                Products
              </NavLink>
            </li>
            <li className='nav-item mx-2-md'>
              <NavLink to='/categories' className='nav-link'>
                Categories
              </NavLink>
            </li>
            <li className='nav-item mx-2-md'>
              <SearchBar />
            </li>
          </ul>
          {loginStore.user ? (
            <UserSettings />
          ) : (
            <UserLoginDropdown />
          )}
          <NavLink to='/cart' className='fs-5 mx-3 mb-2'>
            <i className='bi bi-cart text-white'></i>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
