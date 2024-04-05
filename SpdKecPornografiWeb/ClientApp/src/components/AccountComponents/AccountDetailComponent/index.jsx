import {Alert, Button, Col, Container, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import ChangePasswordAdmin from "../ChangePasswordAdmin";
import {GlobalContext} from "../../../context/GlobalContext";
import axios from "axios";
import SpinnerLoading from "../../SpinnerLoading";
import Cookies from "js-cookie";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/user",
        text: "User"
    },
    {
        link: "/user/add",
        text: "Detail User"
    }
]

const AccountDetailComponent = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {stateContext} = useContext(GlobalContext);
    const { setFetchStatusAccount } = stateContext;
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [inputAccount, setInputAccount] = useState({
        fullname: "",
        username: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        roleId: "",
        isActive: "",
        isBlocked: ""
    })
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    
    useEffect(() => {
        if (id !== undefined) {
            setLoadingMessage("Mendapatkan data ...")
            setIsLoading(true);
            axios.get(`api/account/${id}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data}) => {
                setInputAccount({...inputAccount,
                    fullname: data.data.fullname,
                    username: data.data.username,
                    roleId: data.data.roleId,
                    phoneNumber: data.data.phoneNumber,
                    email: data.data.email,
                    isActive: data.data.isActive.toString(),
                    isBlocked: data.data.isBlocked.toString()
                })
            }).catch((error) => {
                alert(!error.response.data.message ? error : error.response.data.message);
            }).finally(() => {
                setLoadingMessage("");
                setIsLoading(false);
            })
        }
    }, [])
    const handleCancel = () => {
        navigate("/user")
    }
    
    const handleChangePassword = () => {
        setShowChangePassword(!showChangePassword);
    }

    const handleOnClick = () => {
        setError(null);
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputAccount({...inputAccount, [name]: value});
    }
    
    const handleChangeRadio = (e) => {
        const {name, value} = e.target;
        setInputAccount({...inputAccount, [name]: value === 'true'})
    }
    
    // const handleOptionChange = (e) => {
    //     const {name, value} = e.target;
    //     setInputAccount({...inputAccount, [n]})
    // }
    
    const submitAccount = () => {
        const isActiveBool = inputAccount.isActive === "true";
        const isBlockedBool = inputAccount.isBlocked === "true";
        
        // setInputAccount({...inputAccount, isActive: isActive, isBlocked: isBlocked})
        if (id !== undefined) {
            axios.put(`api/account/${id}`, {...inputAccount, isActive: isActiveBool, isBlocked: isBlockedBool}, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            })
                .then(({data}) => {
                    alert("Berhasil memperbarui akun");
                    setFetchStatusAccount(true);
                    setInputAccount(null);
                    navigate("/user");
                })
                .catch((error) => {
                    // setError(!error.response.data.message ? error : error.response.data.message);
                    alert(!error.response.data.message ? error : error.response.data.message);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        } else {
            axios.post("api/account/register", inputAccount )
                .then(({data}) => {
                    alert("Berhasil menambah akun");
                    setFetchStatusAccount(true);
                    setInputAccount(null);
                    navigate("/user");
                })
                .catch((error) => {
                    // setError(!error.response.data.message ? error : error.response.data.message);
                    alert(!error.response.data.message ? error : error.response.data.message);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingMessage("Menyimpan data ...")
        setIsLoading(true);
        if (inputAccount.password !== inputAccount.confirmPassword) {
            setError("Password dan konfirmasi password tidak sesuai");
            return;
        }
        submitAccount();
        // console.log(inputAccount);
    }
    
    return(
        <>
            <ChangePasswordAdmin show={showChangePassword} setShow={setShowChangePassword} id={id} />
            <Container className={"w-100"}>
                {isLoading && (
                    <SpinnerLoading text={loadingMessage} />
                )}
                <TitleBreadcrumb title={`${id === undefined ? "Tambah User" : "Edit User"}`} paths={paths} />
                {error && (
                    <Alert color={"danger"}>
                        {error}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <FormGroup row>
                        <Label
                            for="fullname"
                            sm={2}
                        >
                            Nama Lengkap
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="fullname"
                                name="fullname"
                                placeholder="input fullname"
                                type="text"
                                value={inputAccount.fullname}
                                onChange={handleChange}
                                onClick={handleOnClick}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="username"
                            sm={2}
                        >
                            Username
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="username"
                                name="username"
                                placeholder="input username"
                                type="text"
                                value={inputAccount.username}
                                onChange={handleChange}
                                onClick={handleOnClick}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="phoneNumber"
                            sm={2}
                        >
                            Nomor Telepon
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="input nomor telepon"
                                type="number"
                                value={inputAccount.phoneNumber}
                                onChange={handleChange}
                                onClick={handleOnClick}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="email"
                            sm={2}
                        >
                            Email
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="email"
                                name="email"
                                placeholder="input email"
                                type="email"
                                value={inputAccount.email}
                                onChange={handleChange}
                                onClick={handleOnClick}
                            />
                        </Col>
                    </FormGroup>
                    {!id && (
                        <>
                        <FormGroup row>
                            <Label
                                for="password"
                                sm={2}
                            >
                                Password
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="input password"
                                    type="password"
                                    value={inputAccount.password}
                                    onChange={handleChange}
                                    onClick={handleOnClick}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="confirmPassword"
                                sm={2}
                            >
                                Konfirmasi Password
                            </Label>
                            <Col sm={10}>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="konfirmasi password"
                                    type="password"
                                    value={inputAccount.confirmPassword}
                                    onChange={handleChange}
                                    onClick={handleOnClick}
                                />
                            </Col>
                        </FormGroup>
                        </>
                    )}
                    <FormGroup row>
                        <Label
                            for="roleId"
                            sm={2}
                        >
                            Role
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="roleId"
                                name="roleId"
                                type="select"
                                value={inputAccount.roleId}
                                onChange={handleChange}
                                onClick={handleOnClick}
                                required
                            >
                                <option>
                                    Pilih Role
                                </option>
                                <option value={"1"}>
                                    SuperAdmin
                                </option>
                                <option value={"2"}>
                                    Admin
                                </option>
                                <option value={"3"}>
                                    User
                                </option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup
                        row
                        tag="fieldset"
                    >
                        <legend className="col-form-label col-sm-2">
                            Is Active
                        </legend>
                        <Col sm={10}>
                            <FormGroup check>
                                <Input
                                    name="isActive"
                                    type="radio"
                                    value={"true"}
                                    checked={inputAccount.isActive === "true"}
                                    onChange={handleChange}
                                    onClick={handleOnClick}
                                />
                                {' '}
                                <Label check>
                                    True
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input
                                    name="isActive"
                                    type="radio"
                                    value={"false"}
                                    checked={inputAccount.isActive === "false"}
                                    onChange={handleChange}
                                    onClick={handleOnClick}
                                />
                                {' '}
                                <Label check>
                                    False
                                </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup
                        row
                        tag="fieldset"
                    >
                        <legend className="col-form-label col-sm-2">
                            Is Blocked
                        </legend>
                        <Col sm={10}>
                            <FormGroup check>
                                <Input
                                    name="isBlocked"
                                    type="radio"
                                    value={"true"}
                                    checked={inputAccount.isBlocked === "true"}
                                    onChange={handleChange}
                                    onClick={handleOnClick}
                                />
                                {' '}
                                <Label check>
                                    True
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input
                                    name="isBlocked"
                                    type="radio"
                                    value={"false"}
                                    checked={inputAccount.isBlocked === "false"}
                                    onChange={handleChange}
                                    onClick={handleOnClick}
                                />
                                {' '}
                                <Label check>
                                    False
                                </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    {id && (
                        <FormGroup>
                            <Button 
                                size={"sm"} 
                                color={"primary"} outline 
                                onClick={handleChangePassword} >
                                Change Password
                            </Button>
                        </FormGroup>
                    )}
                    <div className={"d-flex w-full gap-2 justify-content-end"}>
                        <Button outline onClick={handleCancel}>Batal</Button>
                        {id && (
                            <Button
                                color={"success"}
                                type={"submit"}
                                disabled={!inputAccount.roleId || !inputAccount.isActive
                                    || !inputAccount.isBlocked || !inputAccount.email || !inputAccount.fullname || !inputAccount.username
                                    || !inputAccount.phoneNumber}
                            >
                                Perbarui Data
                            </Button>
                        )}
                        {!id && (
                            <Button
                                color={"success"}
                                type={"submit"}
                                disabled={!inputAccount.roleId || !inputAccount.isActive || !inputAccount.password || !inputAccount.confirmPassword
                                    || !inputAccount.isBlocked || !inputAccount.email || !inputAccount.fullname || !inputAccount.username
                                    || !inputAccount.phoneNumber}
                            >
                                Tambah Data
                            </Button>
                        )}
                        
                    </div>
                </Form>
            </Container>
        </>
    )
}
export default AccountDetailComponent;