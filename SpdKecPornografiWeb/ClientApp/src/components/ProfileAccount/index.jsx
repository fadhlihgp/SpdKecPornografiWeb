import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import React, {useContext, useEffect, useState} from "react";
import  {GlobalContext} from "../../context/GlobalContext";
import userIcon from "../../resources/user.png";
import axios from "axios";
import SpinnerLoading from "../SpinnerLoading";
import Cookies from "js-cookie";

const ProfileAccountComponent = () => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { setFetchStatus, fetchStatus, currentUser } = stateContext;
    const { fetchDataCurrentUser } = handleFunctionContext;
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputUser, setInputUser] = useState({
        fullname: currentUser.fullname,
        username: currentUser.username,
        phoneNumber: currentUser.phoneNumber,
        email: currentUser.email
    })

    const handleSelectedFile = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    }
    
    const handleChangePhoto = (event) => {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData();
        if (selectedFile) {
            formData.append("imageFile", selectedFile)
        }
        
        axios.put(`api/account/changePhoto`, formData, {
            headers: {Authorization: `Bearer ${Cookies.get("token")}`},
            "Content-Type": "multipart/form-data"
        }).then(({data}) => {
            alert(data.message);
            setFetchStatus(true);
            setSelectedFile(null)
        }) .catch((error) => {
            alert(error.response.data.message ?? error)
        }).finally(() => {
            setLoading(false)
        })
    }
    
    useEffect(() => {
        fetchDataCurrentUser();
    }, [fetchStatus])
    
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setInputUser({...inputUser, [name]: value})
    }
    
    const handleSubmitEdit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.put(`api/account/${currentUser.id}`, inputUser, {
            headers: {Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            alert(data.message);
            setFetchStatus(true);
        }).catch((error) => {
            alert(error.response.data.message ?? error.message);
            setInputUser({...inputUser,
                fullname: currentUser.fullname,
                username: currentUser.username,
                phoneNumber: currentUser.phoneNumber,
                email: currentUser.email
            })
        }).finally(() => {
            setLoading(false)
        })
     }
     
    return(
        <>
            {loading && (
                <SpinnerLoading text={"Menyimpan data ..."} />
            )}
            
            <Container className={"w-100 m-2"}>
                <h3 className={"mb-3"}><b>Profile</b></h3>
                <Row className={"gap-3"}>
                    <Col sm={"4"}>
                        <img src={currentUser.imageUrl ?? userIcon} alt={"profile"} width={"96px"} />
                        <FormGroup className={"mt-3 w-75"}>
                            <Input type={"file"} onChange={handleSelectedFile} />
                        </FormGroup>
                        <Button color={"primary"} disabled={!selectedFile} onClick={handleChangePhoto}>
                            Upload Photo
                        </Button>
                    </Col>
                    <Col sm={"7"}>
                        <Form onSubmit={handleSubmitEdit}>
                            <FormGroup className={"mb-1"}>
                                <Label for="fullname">
                                    Nama Lengkap
                                </Label>
                                <Input
                                    required
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={inputUser.fullname}
                                    onChange={handleOnChange}
                                    // onClick={handleOnClick}
                                />
                            </FormGroup>
                            <FormGroup className={"mb-1"}>
                                <Label for="username">
                                    Username
                                </Label>
                                <Input
                                    required
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={inputUser.username}
                                    onChange={handleOnChange}
                                    // onClick={handleOnClick}
                                />
                            </FormGroup>
                            <FormGroup className={"mb-1"}>
                                <Label for="email">
                                    Email
                                </Label>
                                <Input
                                    required
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={inputUser.email}
                                    onChange={handleOnChange}
                                    // onClick={handleOnClick}
                                />
                            </FormGroup>
                            <FormGroup className={"mb-1"}>
                                <Label for="phoneNumber">
                                    Nomor Telepon
                                </Label>
                                <Input
                                    required
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="number"
                                    value={inputUser.phoneNumber}
                                    onChange={handleOnChange}
                                    // onClick={handleOnClick}
                                />
                            </FormGroup>
                            <Button color={"success"}>
                                Simpan
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default ProfileAccountComponent