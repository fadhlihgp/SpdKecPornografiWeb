import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./style.css"
import user from "../../resources/user.png";
const SubSidebar = ({link, icon, name}) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleHover = () => {
        setIsHovered(true);
    };
    const handleLeaveHover = () => {
        setIsHovered(false);
    };

    const mergeStyle = {
        padding: "2% 0",
        width: "100%",
        textDecoration: "none", 
        color: "white",
        backgroundColor: isHovered ? "#4F6F52" : "transparent",
        fontWeight: isHovered ? "500" : "300"
    };
    
    return (
        <div
              style={mergeStyle} 
              onMouseEnter={handleHover}
              onMouseLeave={handleLeaveHover}
        >
            <Link to={link} className={"px-3 w-100 menuContainer"} style={{width: "100%", textDecoration: "none", color:"white"}}>
                <img src={icon} width={"20px"} alt={"icon"}/> 
                <span className={'menuText'} style={{marginLeft: "5%"}}><b>{name}</b></span>
            </Link>
        </div>
    )
}

const Sidebar = ({ role, menus, imageUrl, fullname, sidebarVisible , setSidebarVisible }) => {
    // const [sidebar, setSidebar] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // const toggleSidebar = () => setSidebar(!sidebar);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <>
            {sidebarVisible && (
                <div className={`m-0 sidebar ${sidebarVisible ? 'visible' : 'hidden'}`} style={{backgroundColor: "#1B4242", color: "white", width: "20%"}}>
                    <div className={"d-flex flex-column align-items-center mt-3 mb-0 text-center"}>
                        <img src={imageUrl ? imageUrl : user} alt={"user"} width={"40px"} height={"40px"} style={{borderRadius: "25px"}}/>
                        <p className={'nameLoggedIn'}>{fullname} <br/> <span style={{color: "#D0D4CA"}}>{role}</span></p>
                    </div>
                    <div>
                        {menus.map(({title, value}, index) => (
                            <div className={"mb-3"}>
                                <div className={'titleMenu'} style={{fontSize: "14px", color: "#BFCFE7" ,padding: "2% 7%"}}>
                                    <b>{title}</b>
                                </div>
                                {value.map(({name, icon, link}) => (
                                    <div className={""}>
                                        <SubSidebar name={name} icon={icon} link={link} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
        </>
    );
};

export default Sidebar;