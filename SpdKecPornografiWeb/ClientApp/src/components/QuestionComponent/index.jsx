import {
    Button,
    Col,
    Container, Pagination, PaginationItem, PaginationLink,
    Row, Table
} from "reactstrap";
import PrintButton from "../PrintButton";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import eye from "../../resources/eye.png";
import trash from "../../resources/delete.png";
import edit from "../../resources/edit.png";
import SearchAddBtn from "../SearchAddbtn/SearchAddBtn";
import QuestionForm from "./QuestionForm/index";
import ConfirmDelete from "../ConfirmDelete";
import TitleBreadcrumb from "../TitleBreadcrumb";
import SpinnerLoading from "../SpinnerLoading";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/question",
        text: "Pertanyaan"
    }
]
const QuestionWrapper = () => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { questionList, fetchStatusQuestion, setFetchStatusQuestion, questionId, setQuestionId, questionInput, setQuestionInput, setShowQuestionForm,
        showQuestionForm } = stateContext;
    const { fetchDataQuestion, handleQuestionDetail, fetchGenerateQuestionCode, handleDeleteQuestion, handleQuestionEdit } = handleFunctionContext;
    
    const [showDelete, setShowDelete] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = questionList?.slice(firstIndex, lastIndex);
    const nPage = questionList ? Math.ceil(questionList.length / recordPerPage) : 0;
    const numbers = [...Array(nPage + 1).keys()].slice(1);
    
    const prePage = (e) => {
        e.preventDefault();
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    }
    
    const changeCPage = (e, n) => {
        e.preventDefault();
        setCurrentPage(n)
    } 
    
    const nextPage = (e) => {
        e.preventDefault();
        if(currentPage !== undefined) {
            setCurrentPage(currentPage + 1);
        }
    }
    
    useEffect(() => {
        if (searchValue) {
            fetchDataQuestion(`?name=${searchValue}`)
        } else {
            fetchDataQuestion("")
        }
    }, [fetchStatusQuestion]);
    
    const handleAdd = () => {
        setQuestionId("-1");
        fetchGenerateQuestionCode();
        setShowQuestionForm(true);
    }
    
    const handleShowEdit = (id) => {
        handleQuestionEdit(id);
    }
    
    const handleClose = () => {
        setQuestionId("-1");
        setQuestionInput({...questionInput, questionCode: "", questionName: ""})
        setShowQuestionForm(false);
    }
    
    const handleSubmitDelete = () => {
        handleDeleteQuestion(questionId);
        closeDeleteConfirmation()
    }
    
    const showDeleteConfirmation = () => {
        setShowDelete(true);
    }
    
    const closeDeleteConfirmation = () => {
        setShowDelete(false);
    }
    
    
    return (
        <>
            <QuestionForm show={showQuestionForm} setShow={setShowQuestionForm} handleClose={handleClose} />
            <ConfirmDelete 
                show={showDelete} 
                setShow={setShowDelete} 
                handleCancel={closeDeleteConfirmation} 
                textConfirmation={"Menghapus data pertanyaan juga menghapus seluruh data jawaban terkait. Anda yakin ?"}
                handleDelete={handleSubmitDelete} />
            <Container className={"w-100"}>
                <TitleBreadcrumb title={"Kelola Pertanyaan"} paths={paths} />
                <Row className={"mb-2"}>
                    <Col className={"col-6 d-flex flex-row align-items-end"}>
                        <PrintButton />
                    </Col>
                    <Col className={"col-6"}>
                        <SearchAddBtn 
                            handleAdd={handleAdd}
                            handleSearch={() => {
                                setSearchValue(searchValue);
                                setFetchStatusQuestion(true);
                            }}
                            searchFormValue={searchValue}
                            handleOnChange={(e) => setSearchValue(e.target.value)}
                            placeholder={"Cari kode, nama"}
                            handleReset={() => {
                                setSearchValue("");
                                fetchDataQuestion("");
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table hover>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Kode</th>
                                <th>Pertanyaan</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {!questionList && (
                                <SpinnerLoading text={"Loading..."} />
                            )}
                            {records?.map((item, index) => (
                                    <tr key={item.id}>
                                        <th scope="row">{firstIndex + index + 1}</th>
                                        <td>{item.questionCode}</td>
                                        <td>{item.questionName}</td>
                                        <td>
                                            <div className={"d-flex gap-2"}>
                                                <Button
                                                    value={item.id}
                                                    color={"success"}
                                                    onClick={() => {
                                                        handleQuestionDetail(item.id)
                                                    }}>
                                                    <img src={eye} width={"17px"} alt={"see"}/>
                                                </Button>
                                                <Button
                                                    value={item.id}
                                                    color={"primary"}
                                                    onClick={() => {
                                                        handleShowEdit(item.id)
                                                    }}>
                                                    <img src={edit} width={"17px"} alt={"edit"}/>
                                                </Button>
                                                <Button
                                                    value={item.id}
                                                    color={"danger"}
                                                    onClick={() => {
                                                        setQuestionId(item?.id);
                                                        showDeleteConfirmation()
                                                    }}>
                                                    <img src={trash} width={"17px"} alt={"delete"}/>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col className={'d-flex justify-content-end'}>
                        Total Data: <b>{questionList.length}</b>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <select>
                            <option>5</option>
                            <option>10</option>
                        </select>
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        <Pagination>
                            <PaginationItem>
                                <PaginationLink
                                    href="#"
                                    previous
                                    onClick={prePage}
                                    hidden={currentPage === firstIndex + 1}
                                />
                            </PaginationItem>
                            {numbers.map((n, i) => (
                                <PaginationItem
                                    className={`${currentPage === n ? 'active' : ''}`}>
                                    <PaginationLink 
                                        href={'#'} 
                                        onClick={(e) => changeCPage(e, n)}>
                                        {n}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationLink
                                    href="#"
                                    next
                                    onClick={nextPage}
                                    hidden={currentPage === nPage}
                                />
                            </PaginationItem>
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default QuestionWrapper;