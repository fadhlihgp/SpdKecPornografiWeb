import LayoutDashboard from "../../widget/LayoutDashboard";
import {useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import DashboardLogin from "./DashboardLogin";

const Dashboard = () => {
    const {stateContext} = useContext(GlobalContext);
    
    return (
        <LayoutDashboard>
            <DashboardLogin />
        </LayoutDashboard>
    )
}
export default Dashboard;