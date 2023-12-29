import Cookies from "js-cookie";
import {Navigate} from "react-router-dom";

const PublicRoute = ({ children }) => {
    if (Cookies.get("token") === undefined) {
        return children;
    } else if (Cookies.get("token") !== undefined) {
        return <Navigate to={"/"} />;
    }
};
export default PublicRoute;