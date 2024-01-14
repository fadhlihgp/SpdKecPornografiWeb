import {
    Button,
    Col,
    Container, Nav,
    Row, Table
} from "reactstrap";
import PrintButton from "../../PrintButton/index";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import SearchAddBtn from "../../SearchAddbtn/SearchAddBtn";
import ConfirmDelete from "../../ConfirmDelete/index";
import TitleBreadcrumb from "../../TitleBreadcrumb/index";
import iconResources from "../../../helpers/listIcon";
import SpinnerLoading from "../../SpinnerLoading";
import PaginationComponent from "../../PaginationComponent";
import moment from "moment";
import {useNavigate} from "react-router-dom";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/user",
        text: "User"
    }
]
const AccountListWrapper = () => {
    const navigate = useNavigate();
    
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { accountList, fetchStatusAccount, answerId, setAnswerId, answerInput,setFetchStatusAnswer, setAnswerInput, setFetchStatusAccount} = stateContext;
    const { fetchDataAccount, handleAnswerDetail, fetchGenerateAnswerCode, handleDeleteAnswer, handleAnswerEdit, fetchDataQuestion } = handleFunctionContext;

    const [showDelete, setShowDelete] = useState(false);
    const [ showAnswerForm, setShowAnswerForm ] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    
    useEffect(() => {
        if (searchValue) {
            fetchDataAccount(`?name=`+searchValue);
        } else {
            fetchDataAccount(searchValue);
        }
        fetchDataQuestion();
    }, [fetchStatusAccount]);

    const handleAdd = () => {
        navigate("/user/add")
    }

    // const handleShowEdit = (id) => {
    //     handleQuestionEdit(id);
    // }

    const handleClose = () => {
        setAnswerId("-1");
        setAnswerInput({...answerInput, answerCode: "", questionId: "", answerName: ""})
        setShowAnswerForm(false);
    }

    const handleSubmitDelete = () => {
        handleDeleteAnswer(answerId);
        closeDeleteConfirmation()
    }

    const handleShowEdit = (id) => {
        navigate(`/user/edit/${id}`)
    }

    const showDeleteConfirmation = () => {
        setShowDelete(true);
    }

    const closeDeleteConfirmation = () => {
        setAnswerId("-1");
        setShowDelete(false);
    }

    const handleSearch = () => {
        console.log(searchValue);
        setSearchValue(`${searchValue}`)
        setFetchStatusAccount(true)
        // console.log(accountList)
    }

    const handleReset = () => {
        setSearchValue("")
        fetchDataAccount("");
        // console.log(searchValue);
    }

    return (
        <>
            {/*<AnswerForm show={showAnswerForm} setShow={setShowAnswerForm} handleClose={handleClose} />*/}
            <Container className={"w-100"}>
                <TitleBreadcrumb title={"User Management"} paths={paths} />
                <Row className={"mb-2"}>
                    <Col className={"col-6 d-flex flex-row align-items-end"}>
                        <PrintButton />
                    </Col>
                    <Col className={"col-6"}>
                        <SearchAddBtn
                            handleSearch={handleSearch}
                            searchFormValue={searchValue}
                            handleOnChange={(e) => setSearchValue(e.target.value) }
                            handleAdd={handleAdd}
                            placeholder={"Cari nama"}
                            handleReset={handleReset} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table hover>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Full Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Last Login</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {!accountList && (
                                <SpinnerLoading text={"Loading..."} />
                            )}
                            {accountList &&
                                accountList.map((item, index) => (
                                        <tr key={item.id}>
                                            <th scope="row">{index+1}</th>
                                            <td>{(item.fullname.length <= 20) ? item.fullname : item.fullname.substring(0, 20) + "..."}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>
                                                {item.lastLogin === null || undefined ? "-" : moment(item.lastLogin).format("DD MMM YYYY HH:mm")}
                                            </td>
                                            <td>
                                                <div className={"d-flex gap-2"}>
                                                    <Button
                                                        value={item.id}
                                                        color={"primary"}
                                                        onClick={() => {
                                                            handleShowEdit(item.id);
                                                        }}
                                                    >
                                                        <img src={iconResources.editPng} width={"17px"} alt={"edit"} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </Table>
                        {/*<PaginationComponent />*/}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default AccountListWrapper;