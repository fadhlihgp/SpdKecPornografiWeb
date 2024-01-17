import LayoutDashboard from "../../widget/LayoutDashboard";
import {useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import DashboardSuperAdmin from "./DashboardSuperAdmin";
import DashboardAdmin from "./DashboardAdmin";
import DashboardUser from "./DashboardUser";

const Dashboard = () => {
    const {stateContext} = useContext(GlobalContext);
    const {roleId} = stateContext;
    
    return (
        <LayoutDashboard>
            <DashboardSuperAdmin />
        </LayoutDashboard>
    )
}
export default Dashboard;