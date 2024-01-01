import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {Button} from "reactstrap";

const ConfirmSignOut = ({ handleClose, basicModal, setBasicModal }) => {
    // const [basicModal, setBasicModal] = useState();
    const navigate = useNavigate();
    const toggleOpen = () => {
        handleClose();
    }

    const handleLogout = () => {
        Cookies.remove('token');
        localStorage.clear();
        navigate('/login');
    };
    
    return (
        <>
            <MDBModal open={basicModal} setopen={setBasicModal} tabIndex='-1' staticBackdrop>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalBody>Anda yakin ingin Keluar ?</MDBModalBody>
                        <MDBModalFooter>
                            <Button color={'secondary'} onClick={toggleOpen}>
                                Close
                            </Button>
                            <Button color='danger' onClick={handleLogout}>Sign Out</Button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}
export default ConfirmSignOut;