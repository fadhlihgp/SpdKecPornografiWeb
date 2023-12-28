import Cookies from "js-cookie";
import {Navigate} from "react-router-dom";

const Index = ({ children }) => {
    const isLoggedIn = Cookies.get("token") === undefined;
    
    if (isLoggedIn) {
        return <>{children}</>
    } else {
        return <Navigate to={"/login"} />
    }
};
export default Index;