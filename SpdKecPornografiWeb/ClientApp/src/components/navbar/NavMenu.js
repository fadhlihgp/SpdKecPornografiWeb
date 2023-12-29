import React, { useState } from 'react';
import { Button, Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const NavMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.clear();
    navigate('/login');
  };

  return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">Sistem Pakar</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
              {!Cookies.get('token') && (
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                  </NavItem>
              )}
              {Cookies.get('token') && (
                  <>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/dashboard">Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                      <Button color="danger" size="sm" onClick={handleLogout}>
                        Logout
                      </Button>
                    </NavItem>
                  </>
              )}
            </ul>
          </Collapse>
        </Navbar>
      </header>
  );
};

export default NavMenu;
