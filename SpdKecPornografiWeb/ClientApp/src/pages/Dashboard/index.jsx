import LayoutDashboard from "../../widget/LayoutDashboard";
import {useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import DashboardSuperAdmin from "./DashboardSuperAdmin";
import DashboardAdmin from "./DashboardAdmin";
import DashboardUser from "./DashboardUser";

const Dashboard = () => {
    const {stateContext} = useContext(GlobalContext);
    const {roleId} = stateContext;
    
    const setDashboard = () => {
        switch (roleId) {
            case "1":
                return <DashboardSuperAdmin />;
            case "2":
                return <DashboardAdmin />;
            case "3":
                return <DashboardUser />
        }
    }
    
    return (
        <LayoutDashboard>
            {setDashboard()}
        </LayoutDashboard>
    )
}
export default Dashboard;