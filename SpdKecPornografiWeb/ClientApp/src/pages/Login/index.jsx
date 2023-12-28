import React from 'react';
import {Link} from "react-router-dom";
import loginpic from "../../resources/login.png";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import lineor from "../../resources/line-or.png";
import google from "../../resources/google.png";

function Login() {
    return (
        <div className="container-fluid p-0">
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
                            <Link to={"/"} style={{ textDecoration: "none", color: "blue" }}>
                                <h2><b>SPD</b></h2>
                            </Link>
                        </div>
                        <div className={"p-3 mt-4 mx-4"}>
                            <h3 style={{textAlign: "center"}}><b>Sign In</b></h3>
                            <p className={"mt-4"}><span className={"text-black-50"}>Belum punya akun ? </span>
                                <Link to={"/register"} style={{color: "#1C4532"}}><b>Silahkan daftar</b></Link></p>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                        Email or Username
                                    </Label>
                                    <Input
                                        id="exampleEmail"
                                        name="email"
                                        placeholder="email or username"
                                        type="email"
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
                                    />
                                </FormGroup>
                                <p style={{textAlign: "end"}}>
                                    <Link to={"/forgotPassword"} style={{color: "#1C4532"}}><b>Lupa Password ?</b></Link>
                                </p>
                                <Button type={"submit"} className={"container-fluid"} style={{backgroundColor: "#1C4532", borderRadius: "15px"}}>
                                    Sign In
                                </Button>
                                <img src={lineor} width={"100%"} className={"my-5"} alt={"line or"}/>
                            </Form>
                            <Button type={"button"} className={"container-fluid border border-1"} style={{backgroundColor: "transparent", borderRadius: "15px", color: "black"}}>
                               <img src={google} alt={"google"} width={"17px"}/> Lanjutkan dengan Google
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login;