import SpinnerLoading from "../../components/SpinnerLoading";
import {Link, useNavigate} from "react-router-dom";
import {Alert, Button, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import React, {useState} from "react";
import OtpResetPassword from "../../components/OtpResetPassword";
import axios from "axios";

const ForgotPassword = () => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [inputEmail, setInputEmail] = useState("");
    const navigate = useNavigate();
    const [showOtpPage, setShowOtpPage] = useState(false);
    
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`api/otp/sendConfirmPassword`, {email: inputEmail})
            .then(({data}) => {
                alert(data.message);
                setShowOtpPage(true);
            })
            .catch((error) => {
                setError(error.response.data.message)
            })
            .finally(() => {
                setLoading(false);
            })
    }
    
    return(
        <>
            <OtpResetPassword show={showOtpPage} setShow={setShowOtpPage} email={inputEmail} />
            <div className={"w-100 d-flex justify-content-center"}>
                {loading && (
                    <SpinnerLoading text={"Mengirim otp ..."} />
                )}

                <div className={"p-3 mt-4 mx-4 w-50"}>
                    <h3 className={"text-center"}><b>Lupa password</b></h3>
                    <p className={"text-center"}><Link to={"/login"} style={{color: "black"}}><b>Kembali ke login</b></Link> </p>
                    {error && (
                        <Alert color="danger">
                            {error}
                        </Alert>
                    )}
                        <Form onSubmit={handleSubmitEmail}>
                            <FormGroup>
                                <Label for="email">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Masukkan email anda"
                                    type="email"
                                    value={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                    onClick={() => setError(null)}
                                    required
                                />
                            </FormGroup>
                            <Button
                                className={"container-fluid btn-success mt-3"}
                                style={{borderRadius: "15px"}}>
                                Kirim Email
                            </Button>
                            {/*<img src={lineor} width={"100%"} className={"my-5"} alt={"line or"}/>*/}
                        </Form>
                    {/*<Button type={"button"} className={"container-fluid border border-1"} style={{backgroundColor: "transparent", borderRadius: "15px", color: "black"}}>*/}
                    {/*    <img src={google} alt={"google"} width={"17px"}/> Daftar dengan Google*/}
                    {/*</Button>*/}
                </div>
            </div>
        </>
    )
}
export default ForgotPassword;