import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLoginContext } from '../../Store';

export default function UserSettings() {
  const {loginStore, dispatch} = useLoginContext()
  const userId = loginStore.user?._id
  
  return (
    <ul className='navbar-nav me-auto '>
      <li className='nav-item dropdown mx-5'>
        <NavLink
          className='dropdown-toggle link-info'
          to='#'
          id='navbarDropdown'
          role='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <i className='fas fa-user-cog'></i>
        </NavLink>
        <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
          <li>
            <NavLink
              className='dropdown-item bg-white text-black'
              to='/products/new'
            >
              Add new Product
            </NavLink>
          </li>
          <li>
            <NavLink
              className='dropdown-item bg-white text-black'
              to={`/products/user/${userId}`}
            >
              Show all Products
            </NavLink>
          </li>
          <li>
            <hr className='dropdown-divider' />
          </li>
          <li>
            <NavLink className='dropdown-item bg-white text-black' to='/home' onClick={() => dispatch({type: 'Remove_User'})}>
              Logout
            </NavLink>
          </li>
        </ul>
      </li>
    </ul>
  );
}
