import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import loginpic from "../../resources/login.png";
import {Alert, Button, Form, FormGroup, Input, Label, Nav} from "reactstrap";
import lineor from "../../resources/line-or.png";
import google from "../../resources/google.png";
import axios from "axios";
import Cookies from "js-cookie";
import SpinnerLoading from "../../components/SpinnerLoading";
import {GlobalContext} from "../../context/GlobalContext";

function Login() {
    const { stateContext } = useContext(GlobalContext);
    const {setFetchStatus} = stateContext;
    const [error, setError] = useState(null);
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post("api/account/login", input)
            .then((response) => {
                Cookies.set("token", response.data.data.token, { expires: 2});
                setFetchStatus(true);
                navigate("/dashboard");
            })
            .catch((error) => {
                console.log(error)
                setError(error.response.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }    
    
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInput({...input, [name]: value});
    }
    
    const handleOnClickForm = (e) => {
        setError(null);
    }
    
    return (
        <>
            <div className="container-fluid p-0">
                {isLoading && (
                    <SpinnerLoading text={"Loading..."} />
                )}
                <div className="row">
                    <div className="col-lg-6 d-flex flex-lg-row flex-column w-100 gap-5">
                        <div className="p-3 w-100 d-flex" style={{backgroundColor: "#1C4532"}}>
                            <div className={"d-flex flex-column align-items-center"} style={{margin: "25% 0"}}>
                                <img src={loginpic} alt={"login"} width={"50%"}/>
                                <h3 style={{color: "white"}}><b>Sistem Pakar Diagnosa</b></h3>
                                <h3 style={{color: "white"}}><b>Tingkat Kecanduan Pornografi</b></h3>
                            </div>
                        </div>
                        <div className="p-5 w-100 flex-row">
                            <div>
                                <Link to={"/"} style={{ textDecoration: "none", color: "#1C4532" }}>
                                    <h2><b>SPD</b></h2>
                                </Link>
                            </div>
                            <div className={"p-3 mt-4 mx-4"}>
                                <h3 style={{textAlign: "center"}}><b>Sign In</b></h3>
                                <p className={"mt-4"}><span className={"text-black-50"}>Belum punya akun ? </span>
                                    <Link to={"/register"} style={{color: "#1C4532"}}><b>Silahkan daftar</b></Link></p>
                                {error && (
                                    <Alert color="danger">
                                        {error}
                                    </Alert>
                                )}
                                <Form onSubmit={handleLogin}>
                                    <FormGroup>
                                        <Label for="exampleEmail">
                                            Email or Username
                                        </Label>
                                        <Input
                                            id="exampleEmail"
                                            name="email"
                                            placeholder="email or username"
                                            type="email"
                                            onChange={handleOnChange}
                                            onClick={handleOnClickForm}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword">
                                            Password
                                        </Label>
                                        <Input
                                            id="examplePassword"
                                            name="password"
                                            placeholder="6+ karakter"
                                            type="password"
                                            onChange={handleOnChange}
                                            onClick={handleOnClickForm}
                                            required
                                        />
                                    </FormGroup>
                                    <p style={{textAlign: "end"}}>
                                        <Link to={"/forgotPassword"} style={{color: "#1C4532"}}><b>Lupa Password ?</b></Link>
                                    </p>
                                    <Button type={"submit"} className={"container-fluid"} style={{backgroundColor: "#1C4532", borderRadius: "15px"}}>
                                        Sign In
                                    </Button>
                                    {/*<img src={lineor} width={"100%"} className={"my-5"} alt={"line or"}/>*/}
                                </Form>
                                {/*<Button type={"button"} className={"container-fluid border border-1"} style={{backgroundColor: "transparent", borderRadius: "15px", color: "black"}}>*/}
                                {/*   <img src={google} alt={"google"} width={"17px"}/> Lanjutkan dengan Google*/}
                                {/*</Button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login;