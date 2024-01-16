import {Button} from "reactstrap";
import {useNavigate} from "react-router-dom";

const HeroTitle = () => {
    const navigate = useNavigate();
    return(
        <div>
            <h2>Selamat Datang di <b>Sistem Pakar Diagnosa Tingkat Kecanduan Pornografi</b>.</h2>
            <p>Segera ketahui dan atasi tingkat kecanduan pornografi anda dengan metode Forward Chaining</p>
            <Button color={"primary"}
                    onClick={() => navigate("/testing")}
            >Mulai Diagnosa</Button>
        </div>
    )
}
export default HeroTitle;