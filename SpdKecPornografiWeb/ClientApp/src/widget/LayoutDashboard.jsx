import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import dashboardIcon from "../resources/dashboard.png";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../context/GlobalContext";
import SkeletonComponent from "../components/Skeleton";

const menus = [
    {
        title: "Dashboard",
        value: [
            {
                name: "Dashboard",
                icon: dashboardIcon,
                link: "/dashboard"
            },
            {
                name: "Another",
                icon: dashboardIcon,
                link: "/dashboard"
            }
        ]
    },
    {
        title: "Dashboard 2",
        value: [
            {
                name: "Dashboard 2",
                icon: dashboardIcon,
                link: "/dashboard"
            },
            {
                name: "Another 2",
                icon: dashboardIcon,
                link: "/dashboard"
            }
        ]
    }
]
const LayoutDashboard = ({children}) => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { fetchStatus, currentUser, sidebarMenu } = stateContext;
    const { fetchDataCurrentUser } = handleFunctionContext;
    const [sidebar, setSidebar] = useState(true);

    const handleClickSidebar = () => {
        setSidebar(!sidebar);
    }
    
    useEffect(() => {
        fetchDataCurrentUser();
        // console.log(sidebarMenu)
        // console.log("Layout "+currentUser);
    }, [fetchStatus]);
    
    return (
        <>
            {!sidebarMenu && (
                <SkeletonComponent/>
            )}
            {sidebarMenu && (
                <div className={"d-flex flex-column"}>
                    <TopBar onClickToggle={handleClickSidebar} imageUrl={currentUser?.imageUrl} fullname={currentUser?.fullname} />
                    <div className={"d-flex"} style={{backgroundColor: "#F5F5F5", minHeight: "600px"}}>
                        {sidebarMenu && (
                            <>
                                <Sidebar sidebarVisible={sidebar} setSidebarVisible={setSidebar} imageUrl={currentUser?.imageUrl} fullname={currentUser?.fullname} role={currentUser?.role} menus={sidebarMenu ? sidebarMenu : menus } />
                                <div className={"p-3 "} style={{width: "100%"}}>
                                    {children}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
export default LayoutDashboard;