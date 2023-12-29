import Cookies from "js-cookie";
import {Navigate, useNavigate} from "react-router-dom";
const AuthRoute = ({ children }) => {
    if (Cookies.get("token") === undefined) {
        return <Navigate to={"/login"} />;
    } else if (Cookies.get("token") !== undefined) {
        return children;
    }
};
export default AuthRoute;