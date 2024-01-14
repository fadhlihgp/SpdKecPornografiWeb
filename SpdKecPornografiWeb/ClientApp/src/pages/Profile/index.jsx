import LayoutDashboard from "../../widget/LayoutDashboard";
import {Col, Container, Row} from "reactstrap";
import ProfileAccountComponent from "../../components/ProfileAccount";

const Profile = () => {
    return(
        <LayoutDashboard>
            <ProfileAccountComponent />
        </LayoutDashboard>
    )
}
export default Profile;