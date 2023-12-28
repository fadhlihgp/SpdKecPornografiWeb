import {Alert, Button, Form, FormGroup, FormText, Input, Label, Row} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import lineor from "../../resources/line-or.png";
import React, {useState} from "react";
import google from "../../resources/google.png";
import SpinnerLoading from "../../components/SpinnerLoading";
import axios from "axios";

const Register = () => {
    const [input, setInput] = useState(
        {
            fullname: "",
            username: "",
            email: "",
            password: "",
            // confirmPassword: "",
            phoneNumber: "",
            roleId: "3",
            imageUrl: "",
        }
    );
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSelectedFile = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    }
    
    const handleOnChange = (event) => {
        const { value, name } = event.target;
        setInput({...input, [name]: value});
    }
    
    const handleOnClick = () => {
        setError(null);
    }
    
    const handleInput = (e) => {
        e.preventDefault();
        if (!input.password || !confirmPassword || input.password !== confirmPassword) {
            // e.preventDefault();
            setError("Password dan konfirmasi password harus sama");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        if (selectedFile) {
            formData.append("imageUrl", selectedFile)
        }
        
        axios.post("uploadPhoto", formData, {
            "Content-Type": "multipart/form-data"
        })
            .then((response) => {
                // console.log(response);
                axios.post("account/register", { ...input, imageUrl: response.data.data} )
                    .then(({data}) => {
                        alert(data.message)
                        navigate("/login");
                    })
                    .catch((error) => {
                        console.log(error.response)
                        alert(error.response.data.message);
                    })
            })
            .catch((error) => {
                // console.log(error);
                alert(error.response.data.message)
            })
            .finally(() => {
                setLoading(false);
            })
    }
    
    return (
        <div className={"w-100 d-flex justify-content-center"}>
            {loading && (
                <SpinnerLoading text={"Menyimpan data ..."} />
            )}
            
            <div className={"p-3 mt-4 mx-4 w-50"}>
                <h3 className={"text-center"}><b>Daftar Akun Baru</b></h3>
                <p className={"text-center"}>Sudah punya akun ? <Link to={"/login"} style={{color: "black"}}><b>Log in</b></Link> </p>
                {error && (
                    <Alert color="danger">
                        {error}
                    </Alert>
                )}
                <Form onSubmit={handleInput}>
                    <FormGroup>
                        <Label for="fullname">
                            Nama Lengkap
                        </Label>
                        <Input
                            id="fullname"
                            name="fullname"
                            placeholder="Masukkan nama lengkap anda"
                            type="text"
                            value={input.fullName}
                            onChange={handleOnChange}
                            onClick={handleOnClick}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">
                            Username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Masukkan username anda"
                            type="text"
                            value={input.username}
                            onChange={handleOnChange}
                            onClick={handleOnClick}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phoneNumber">
                            Nomor Telepon
                        </Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Masukkan nomor telepon anda"
                            type="text"
                            value={input.phoneNumber}
                            onChange={handleOnChange}
                            onClick={handleOnClick}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Masukkan email anda"
                            type="email"
                            value={input.email}
                            onChange={handleOnChange}
                            onClick={handleOnClick}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="Masukkan password 6+ karakter"
                            type="password"
                            value={input.password}
                            onChange={handleOnChange}
                            onClick={handleOnClick}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">
                            Konfirmasi Password
                        </Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Masukkan konfirmasi password"
                            type="password"
                            value={input.confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onClick={handleOnClick}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="selectedFile">
                            Photo profile
                        </Label>
                        <Input
                            id="selectedFile"
                            name="selectedFile"
                            type="file"
                            onChange={handleSelectedFile}
                        />
                        <FormText>
                            Masukkan foto profil anda
                        </FormText>
                    </FormGroup>
                    <Button 
                        className={"container-fluid btn-success mt-3"} 
                        style={{borderRadius: "15px"}}
                        disabled={!input.email || !input.fullname || !input.password 
                            || !input.phoneNumber || !input.username || !selectedFile}
                    >
                        Daftar
                    </Button>
                    <img src={lineor} width={"100%"} className={"my-5"} alt={"line or"}/>
                </Form>
                <Button type={"button"} className={"container-fluid border border-1"} style={{backgroundColor: "transparent", borderRadius: "15px", color: "black"}}>
                    <img src={google} alt={"google"} width={"17px"}/> Daftar dengan Google
                </Button>
            </div>
        </div>
    )
}
export default Register;