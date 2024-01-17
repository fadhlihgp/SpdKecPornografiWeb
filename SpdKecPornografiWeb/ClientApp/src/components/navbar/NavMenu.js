import React, { useState } from 'react';
import {Button, ButtonGroup, Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ConfirmSignOut from "../ConfirmSignOut";

export const NavMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const handleModal = () => {
    setBasicModal(!basicModal);
  }

  return (
      <>
        <ConfirmSignOut basicModal={basicModal} handleClose={handleModal} setBasicModal={setBasicModal} />
        <Navbar sticky={'top'} className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow bg-white" container light style={{boxShadow: "-1px 15px 8px -15px rgba(0,0,0,0.10)"}}>
          <NavbarBrand tag={Link} to="/"><h4><b>SPD</b></h4></NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow align-items-center">
              <NavItem>
                <a className="text-dark" href="/#hero" style={{textDecoration: 'none'}}>Home</a>
              </NavItem>
              <NavItem className={'mx-3'}>
                <a className="text-dark" href="/#caraPenggunaan" style={{textDecoration: 'none'}}>Cara Penggunaan</a>
              </NavItem>
              {!Cookies.get('token') && (
                  <NavItem>
                    <ButtonGroup>
                      <ButtonGroup>
                        <Button color="success" size={'sm'} onClick={() => navigate('/login')}>
                          Login
                        </Button>
                        <Button color="success" size={'sm'} outline onClick={() => navigate('/register')}>
                          Register
                        </Button>
                      </ButtonGroup>
                    </ButtonGroup>
                  </NavItem>
              )}
              {Cookies.get('token') && (
                  <>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/dashboard">Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                      <Button color="danger" size="sm" onClick={handleModal}>
                        Logout
                      </Button>
                    </NavItem>
                  </>
              )}
            </ul>
          </Collapse>
        </Navbar>
      </>
  );
};

export default NavMenu;
