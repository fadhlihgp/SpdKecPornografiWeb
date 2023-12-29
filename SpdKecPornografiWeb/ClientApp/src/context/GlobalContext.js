import {createContext, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {toast, ToastContainer} from "react-toastify";
import {adminMenu, superAdminMenu, userMenu} from "../components/Sidebar/SidebarMenu";

export const GlobalContext = createContext();
const GlobalProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [sidebarMenu, setSidebarMenu] = useState(null);
    
    const menuBaseRole = (roleId) => {
        switch (roleId) {
            case "1": 
                setSidebarMenu(superAdminMenu)
                return;
            case "2":
                setSidebarMenu(adminMenu)
                return;
            case "3":
                setSidebarMenu(userMenu)
                return;
            default:
                setSidebarMenu(adminMenu)
                return;
        }
    }
    
    const fetchDataCurrentUser = () => {
        if (fetchStatus) {
            axios.get("api/account/currentUser", {
                headers: {Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data})=> {
                const resultData = data.data;
                // console.log(resultData);
                setCurrentUser(resultData);
                menuBaseRole(resultData.roleId);
                console.log(sidebarMenu);
                // console.log(currentUser);
                setFetchStatus(false);
            }).catch((error) => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "colored",
                });
            })
        }
     }
     
    const stateContext = {
        currentUser, setCurrentUser,
        fetchStatus, setFetchStatus,
        sidebarMenu, setSidebarMenu
    }
    
    const handleFunctionContext = {
        fetchDataCurrentUser
    }
    
    return (
        <GlobalContext.Provider value={{ stateContext, handleFunctionContext }}>
            <ToastContainer />
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider;