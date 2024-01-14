import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useContext, useState} from "react";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {GlobalContext} from "../../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
const ChangePasswordAdmin = ({id, show, setShow }) => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const [changePassword, setChangePassword] = useState({
        newPassword: "",
        confirmNewPassword: ""
    })
    
    const handleCancel = () => {
        setChangePassword({...changePassword,  newPassword: "", confirmNewPassword: ""});
        setShow(false);
    }

    const submitChangePassword = () => {
        axios.post(`api/account/changePasswordAdmin/${id}`, changePassword, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        }).then(({data}) => {
            alert(data.message)
        }).catch((error) => {
            alert(error.response.data.message)
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        submitChangePassword()
        handleCancel();
    };

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setChangePassword({...changePassword, [name]: value})
    }

    return (
        <>
            <MDBModal open={show} setopen={setShow} tabIndex='-1' staticBackdrop className={"modal-dialog-scrollable"}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Ubah Password</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={handleCancel}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup row>
                                    <Label
                                        for="newPassword"
                                        sm={3}
                                    >
                                        Password
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            id="newPassword"
                                            name="newPassword"
                                            type="password"
                                            value={changePassword.newPassword}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="confirmNewPassword"
                                        sm={3}
                                    >
                                        Konfirmasi Password
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            id="confirmNewPassword"
                                            name="confirmNewPassword"
                                            type="password"
                                            onChange={handleOnChange}
                                            value={changePassword.confirmNewPassword}
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
                                onClick={handleSubmit}
                                disabled={!changePassword.newPassword || changePassword.newPassword !== changePassword.confirmNewPassword}>Simpan</Button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}
export default ChangePasswordAdmin;