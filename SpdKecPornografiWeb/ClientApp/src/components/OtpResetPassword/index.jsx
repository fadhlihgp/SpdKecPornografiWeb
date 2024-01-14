import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {Alert, Button, Col, Form, FormGroup, Input, Label, Nav} from "reactstrap";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const OtpResetPassword = ({show, setShow, email}) => {
    const [inputOtp, setInputOtp] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const handleCancel = () => {
        setInputOtp("");
        setShow(false);
    }
    
    const handleSubmitOtp = (e) => {
        e.preventDefault();
        axios.post(`api/account/resetPassword`, { email: email, otpCode: inputOtp})
            .then(({data}) => {
                setInputOtp("");
                alert(data.message);
                setShow(false);
                navigate("/login")
            })
            .catch((error) => {
              setError(error.response.data.message);  
            })
    }
    
    return (
        <>
            <MDBModal open={show} setopen={setShow} tabIndex='-1' staticBackdrop className={"modal-dialog-scrollable"}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Masukkan Otp</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={handleCancel}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {error && (
                                <Alert color={"danger"}>
                                    {error}
                                </Alert>
                            )}
                            <Form>
                                <FormGroup row>
                                    <Label
                                        for="otpCode"
                                        sm={3}
                                    >
                                        Kode Otp
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            id="otpCode"
                                            name="otpCode"
                                            type="text"
                                            value={inputOtp}
                                            onChange={(e) => setInputOtp(e.target.value)}
                                            onClick={() => setError(null)}
                                        />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <Button color={'secondary'} onClick={handleCancel}>
                                Batal
                            </Button>
                            <Button
                                color='success'
                                type={"submit"}
                                onClick={handleSubmitOtp}
                                >Kirim</Button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}
export default OtpResetPassword;