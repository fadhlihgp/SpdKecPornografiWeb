import {
    MDBCollapse,
    MDBContainer,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import profile from "../../resources/user.png";
import menu from "../../resources/hamburger.png"
const TopBar = ({ fullname = "User Logged in", imageUrl = profile }) => {
    
    const [openNavText, setOpenNavText] = useState(false);
    return (
        <>
            <MDBNavbar sticky expand='lg' light bgColor='light' className={"px-3"} style={{boxShadow: "-1px 15px 8px -15px rgba(0,0,0,0.49)"}}>
                <MDBContainer fluid>
                    <MDBNavbarBrand>
                        <Link to={"/"} style={{ textDecoration: "none", color: "blue" }}>
                            <span style={{fontSize: "25px"}}><b>SPD</b></span>
                        </Link>
                    </MDBNavbarBrand>
                    <MDBNavbarBrand>
                        <button style={{border: "none", background: "transparent"}}>
                            <img src={menu} alt={"menu"} width={"30px"}/>
                        </button>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarText'
                        aria-controls='navbarText'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavText(!openNavText)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar open={openNavText}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                        </MDBNavbarNav>
                        <div className='navbar-text w-25'>
                            <Link to={"/"} style={{textDecoration: "none"}}>
                                <div className={"d-flex p-2 align-items-center w-100 gap-4"} style={{borderRadius: "25px", backgroundColor: "white"}}>
                                    <div>
                                        <img src={imageUrl ? imageUrl : profile} alt={"profile"} width={"35px"} height={"35px"} style={{borderRadius: "20px"}} />
                                    </div>
                                    <div>
                                        <b>
                                            {fullname}
                                        </b>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    )
}

export default TopBar;