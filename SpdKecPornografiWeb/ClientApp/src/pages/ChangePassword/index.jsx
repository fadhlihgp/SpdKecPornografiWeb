import SpinnerLoading from "../../components/SpinnerLoading";
import {Link} from "react-router-dom";
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";
import React, {useState} from "react";
import LayoutDashboard from "../../widget/LayoutDashboard";
import axios from "axios";
import Cookies from "js-cookie";

const ChangePassword = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputPassword, setInputPassword] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
    })
    
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputPassword({...inputPassword, [name]: value});
    }
    
    const handleSubmitChangePassword = (e) => {
        e.preventDefault();
        setLoading(true);
        if (inputPassword.newPassword !== inputPassword.newPasswordConfirm) {
            setError("Password dan konfirmasi password harus sama!")
            return;
        }
        axios.post(`api/account/changePassword`, { oldPassword: inputPassword.oldPassword, newPassword: inputPassword.newPassword },
            {headers: { Authorization: `Bearer ${Cookies.get("token")}`}})
            .then(({data}) => {
                alert(data.message);
                setInputPassword({...inputPassword, newPassword: "", newPasswordConfirm: "", oldPassword: ""});
            })
            .catch((error) => {
                setError(error.response.data.message);
                // console.log(inputPassword)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    
    return(
        <LayoutDashboard>
                {loading && (
                    <SpinnerLoading text={"Menyimpan password ..."} />
                )}
            <div className={"w-100 d-flex justify-content-center"}>
    
                <div className={"p-3 mt-4 mx-4 w-50"}>
                    <h3 className={"text-center"}><b>Ubah Password</b></h3>
                    {error && (
                        <Alert color="danger">
                            {error}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmitChangePassword}>
                        <FormGroup>
                            <Label for="oldPassword">
                                Masukkan password lama
                            </Label>
                            <Input
                                id="oldPassword"
                                name="oldPassword"
                                placeholder="Masukkan password lama anda"
                                type="password"
                                value={inputPassword.oldPassword}
                                onChange={handleOnChange}
                                onClick={() => setError(null)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newPassword">
                                Masukkan password baru
                            </Label>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                placeholder="Masukkan password baru anda"
                                type="password"
                                value={inputPassword.newPassword}
                                onChange={handleOnChange}
                                onClick={() => setError(null)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newPasswordConfirm">
                                Konfirmasi password baru
                            </Label>
                            <Input
                                id="newPasswordConfirm"
                                name="newPasswordConfirm"
                                placeholder="Konfirmasi password baru anda"
                                type="password"
                                value={inputPassword.newPasswordConfirm}
                                onChange={handleOnChange}
                                onClick={() => setError(null)}
                                required
                            />
                        </FormGroup>
                        <Button
                            className={"container-fluid btn-success mt-3"}
                            style={{borderRadius: "15px"}}
                            disabled={!inputPassword.oldPassword || !inputPassword.newPassword || !inputPassword.newPasswordConfirm}
                        >
                            Simpan
                        </Button>
                        {/*<img src={lineor} width={"100%"} className={"my-5"} alt={"line or"}/>*/}
                    </Form>
                    {/*<Button type={"button"} className={"container-fluid border border-1"} style={{backgroundColor: "transparent", borderRadius: "15px", color: "black"}}>*/}
                    {/*    <img src={google} alt={"google"} width={"17px"}/> Daftar dengan Google*/}
                    {/*</Button>*/}
                </div>
            </div>
        </LayoutDashboard>
    )
}
export default ChangePassword;