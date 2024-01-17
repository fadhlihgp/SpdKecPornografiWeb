import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import profile from "../../resources/user.png";
import menu from "../../resources/hamburger.png";
import logoutIcon from "../../resources/logoutBlack.png";
import accountIcon from "../../resources/account.png";
import passwordIcon from "../../resources/password.png"
import {
    Collapse,
    Container, DropdownItem, DropdownMenu, DropdownToggle,
    Nav,
    Navbar,
    NavbarText,
    NavItem, UncontrolledDropdown
} from "reactstrap";
import ConfirmSignOut from "../ConfirmSignOut";
const TopBar = ({ fullname = "User Logged in", imageUrl = profile, onClickToggle }) => {
    const [basicModal, setBasicModal] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate();
    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    const handleModal = () => {
        setBasicModal(!basicModal);
    }
    
    return (
        <>
            <ConfirmSignOut basicModal={basicModal} handleClose={handleModal} setBasicModal={setBasicModal} />
            <Navbar sticky="top" expand='lg' className={"px-3 bg-light navbar-toggleable-sm"} style={{boxShadow: "-1px 15px 8px -15px rgba(0,0,0,0.49)"}}>
                <Container fluid>
                    <Collapse isOpen={true} navbar>
                        <Nav className="me-auto gap-2" navbar>
                            <NavItem>
                                <Link to={"/"} style={{ textDecoration: "none", color: "#1C4532" }}>
                                    <span style={{fontSize: "25px"}}><b>SPD</b></span>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <button onClick={onClickToggle} style={{border: "none", background: "transparent"}}>
                                    <img src={menu} alt={"menu"} width={"30px"}/>
                                </button>
                            </NavItem>
                        </Nav>
                        <NavbarText>
                            <UncontrolledDropdown
                                className="me-2"
                                direction="down"
                            >
                                <DropdownToggle
                                    caret
                                    color="success"
                                    outline
                                >
                                    {fullname}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => navigate("/profile")}>
                                        <img src={accountIcon} alt={"profile"} width={"17px"}/> Profile
                                    </DropdownItem>
                                    <DropdownItem onClick={() => navigate("/changePassword")}>
                                        <img src={passwordIcon} alt={"password"} width={"17px"}/> Ubah Password
                                    </DropdownItem>
                                    <DropdownItem onClick={handleModal}>
                                       <img src={logoutIcon} alt={"logout"} width={"17px"}/> Logout
                                    </DropdownItem>
                                    {/*<DropdownItem divider />*/}
                                    {/*<DropdownItem>*/}
                                    {/*    Another Action*/}
                                    {/*</DropdownItem>*/}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavbarText>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default TopBar;