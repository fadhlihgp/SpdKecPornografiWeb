import {
    Button,
    Col,
    Container,
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

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/account",
        text: "Account"
    }
]
const AccountListWrapper = () => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { accountList, fetchStatusAccount, answerId, setAnswerId, answerInput,setFetchStatusAnswer, setAnswerInput, setFetchStatusQuestion, fetchStatusQuestion, setAnswerDetail , answerDetail} = stateContext;
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
        setFetchStatusQuestion(true);
        setAnswerId("-1");
        fetchGenerateAnswerCode();
        setShowAnswerForm(true);
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
        handleAnswerEdit(id);
        setShowAnswerForm(true);
    }

    const showDeleteConfirmation = () => {
        setShowDelete(true);
    }

    const closeDeleteConfirmation = () => {
        setAnswerId("-1");
        setShowDelete(false);
    }

    const handleSearch = () => {
        setSearchValue(`${searchValue}`)
        setFetchStatusAnswer(true)
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
                                            <td>{moment(item.lastLogin).format("DD MMM YYYY HH:mm")}</td>
                                            <td>
                                                <div className={"d-flex gap-2"}>
                                                    <Button
                                                        value={item.id}
                                                        color={"success"}
                                                        onClick={() => {
                                                            handleAnswerDetail(item.id);
                                                        }}
                                                    >
                                                        <img src={iconResources.eyePng} width={"17px"} alt={"see"}/>
                                                    </Button>
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