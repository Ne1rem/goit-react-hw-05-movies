import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './SharedLayout.css';
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
  color: black;
  font-weight: 700;
  text-decoration: none;

  &.active {
    color: tomato;
  }
`;

export const SharedLayout = () => {
  return (
    <div className="container">
      <header className="header">
        <ul className="page-list">
          <li className="page-list-item">
            <StyledLink to="/" end>
              Home
            </StyledLink>
          </li>
          <li className="page-list-item">
            <StyledLink to="/movies">Movies</StyledLink>
          </li>
        </ul>
      </header>
      <Outlet />
    </div>
  );
};
