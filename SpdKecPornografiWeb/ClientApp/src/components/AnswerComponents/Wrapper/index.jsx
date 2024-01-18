import {
    Button,
    Col,
    Container, Input, Pagination, PaginationItem, PaginationLink,
    Row, Table
} from "reactstrap";
import PrintButton from "../../PrintButton/index";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import SearchAddBtn from "../../SearchAddbtn/SearchAddBtn";
import ConfirmDelete from "../../ConfirmDelete/index";
import TitleBreadcrumb from "../../TitleBreadcrumb/index";
import iconResources from "../../../helpers/listIcon";
import AnswerForm from "../AnswerForm";
import SpinnerLoading from "../../SpinnerLoading";
import PaginationComponent from "../../PaginationComponent";
import axios from "axios";
import Cookies from "js-cookie";
import {handleDownloadFile} from "../../../helpers/handleDownloadFile";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/answer",
        text: "Jawaban"
    }
]
const AnswerWrapper = () => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { answerList, fetchStatusAnswer, answerId, setAnswerId, answerInput,setFetchStatusAnswer, setAnswerInput, setFetchStatusQuestion, fetchStatusQuestion, setAnswerDetail , answerDetail} = stateContext;
    const { fetchDataAnswer, handleAnswerDetail, fetchGenerateAnswerCode, handleDeleteAnswer, handleAnswerEdit, fetchDataQuestion } = handleFunctionContext;

    const [showDelete, setShowDelete] = useState(false);
    const [ showAnswerForm, setShowAnswerForm ] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(10);
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = answerList?.slice(firstIndex, lastIndex);
    const nPage = answerList ? Math.ceil(answerList.length / recordPerPage) : 0;
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

    const handleSelectOnChange = (e) => {
        const {value} = e.target;
        setRecordPerPage(value);
    }
    // ===================
    
    
    useEffect(() => {
        if (searchValue) {
            fetchDataAnswer(`?answerName=`+searchValue);
        } else {
            fetchDataAnswer(searchValue);
        }
        fetchDataQuestion();
    }, [fetchStatusAnswer, fetchStatusQuestion]);

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
        // console.log(answerList)
    }
    
    const handleReset = () => {
        setSearchValue("")
        fetchDataAnswer("");
        // console.log(searchValue);
    }
    
    const handlePrintPdf = () => {
        setLoading(true);
        setLoadingText('Mengunduh file ...')
        const api = "/api/report/answer/pdf"
        handleDownloadFile(api)
            .then(r => {
                // console.log("success");
            })
            .catch(() => {
                alert('Kesalahan mendownload file');
            })
            .finally(() => {
                setLoading(false);
                setLoadingText("");
            })
    }
    
    return (
        <>
            {loading && (
                <SpinnerLoading text={loadingText} />
            )}
            <AnswerForm show={showAnswerForm} setShow={setShowAnswerForm} handleClose={handleClose} />
            <ConfirmDelete
                show={showDelete}
                setShow={setShowDelete}
                handleCancel={closeDeleteConfirmation}
                textConfirmation={"Anda yakin ingin menghapus data jawaban ?"}
                handleDelete={handleSubmitDelete} />
            <Container className={"w-100"}>
                <TitleBreadcrumb title={"Kelola Jawaban"} paths={paths} />
                <Row className={"mb-2"}>
                    <Col className={"col-6 d-flex flex-row align-items-end"}>
                        <PrintButton printPdf={handlePrintPdf} />
                    </Col>
                    <Col className={"col-6"}>
                        <SearchAddBtn  
                            handleSearch={handleSearch} 
                            searchFormValue={searchValue}
                            handleOnChange={(e) => setSearchValue(e.target.value) } 
                            handleAdd={handleAdd}
                            placeholder={"Cari kode, nama"}
                            handleReset={handleReset} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table hover>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Kode Pertanyaan</th>
                                <th>Kode Jawaban</th>
                                <th>Jawaban</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {!answerList && (
                                <SpinnerLoading text={"Loading..."} />
                            )}
                            {answerList &&
                                records.map((item, index) => (
                                    <tr key={item.id}>
                                        <th scope="row">{firstIndex + index+1}</th>
                                        <td>{item.questionCode}</td>
                                        <td>{item.answerCode}</td>
                                        <td>{(item.answerName.length <= 20) ? item.answerName : item.answerName.substring(0, 20) + "..."}</td>
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
                                                    <Button
                                                        value={item.id}
                                                        color={"danger"}
                                                        onClick={() => {
                                                            setAnswerId(item?.id);
                                                            showDeleteConfirmation()
                                                        }}>
                                                        <img src={iconResources.deletePng} width={"17px"} alt={"delete"} />
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
                <Row>
                    <Col className={'d-flex justify-content-end'}>
                        Total Data: <b>{answerList?.length}</b>
                    </Col>
                </Row>
                <Row>
                    <Col sm={'2'}>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            onChange={handleSelectOnChange}
                            value={recordPerPage}
                        >
                            <option value={5}>
                                5
                            </option>
                            <option value={10}>
                                10
                            </option>
                            <option value={15}>
                                15
                            </option>
                            <option value={20}>
                                20
                            </option>
                        </Input>
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
export default AnswerWrapper;