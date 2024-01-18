import ConfirmDelete from "../../ConfirmDelete";
import {Button, Col, Container, Input, Pagination, PaginationItem, PaginationLink, Row, Table} from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import PrintButton from "../../PrintButton";
import SearchAddBtn from "../../SearchAddbtn/SearchAddBtn";
import SpinnerLoading from "../../SpinnerLoading";
import iconResources from "../../../helpers/listIcon";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import AnswerDiagnosisForm from "../AnswerDiagnosisForm";
import {handleDownloadFile} from "../../../helpers/handleDownloadFile";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/relation",
        text: "Relasi"
    }
]
const AnswerDiagnosisWrapper = () => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { answerDiagnosisList, fetchStatusAnswerDiagnosis, answerDiagnosisId, setAnswerDiagnosisId, answerDiagnosisInput,
        setFetchStatusAnswerDiagnosis, setAnswerDiagnosisInput, setFetchStatusQuestion, fetchStatusQuestion,
        setFetchStatusDiagnosis, setFetchStatusAnswer} = stateContext;
    const { fetchDataAnswerDiagnosis, handleAnswerDiagnosisDetail, fetchGenerateAnswerDiagnosisCode, 
        handleDeleteAnswerDiagnosis, fetchDataQuestion, fetchDataDetailAnswerDiagnosis } = handleFunctionContext;

    const [showDelete, setShowDelete] = useState(false);
    const [ showAnswerDiagnosisForm, setShowAnswerDiagnosisForm ] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(10);
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = answerDiagnosisList?.slice(firstIndex, lastIndex);
    const nPage = answerDiagnosisList ? Math.ceil(answerDiagnosisList.length / recordPerPage) : 0;
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
    // ================
    
    useEffect(() => {
        if (searchValue) {
            fetchDataAnswerDiagnosis(`?code=`+searchValue);
        } else {
            fetchDataAnswerDiagnosis(searchValue);
        }
        fetchDataQuestion();
    }, [fetchStatusAnswerDiagnosis, fetchStatusQuestion]);

    const handleAdd = () => {
        setFetchStatusQuestion(true);
        setFetchStatusAnswer(true);
        setFetchStatusDiagnosis(true);
        setAnswerDiagnosisId("-1");
        // fetchGenerateAnswerDiagnosisCode();
        setShowAnswerDiagnosisForm(true);
    }

    const handleClose = () => {
        setAnswerDiagnosisId("-1");
        setAnswerDiagnosisInput({...answerDiagnosisInput, answerId: "", diagnosisId: "", questionId: ""})
        setShowAnswerDiagnosisForm(false);
    }

    const handleSubmitDelete = () => {
        handleDeleteAnswerDiagnosis(answerDiagnosisId);
        closeDeleteConfirmation();
    }

    const handleShowEdit = (id) => {
        fetchDataDetailAnswerDiagnosis(id);
        setShowAnswerDiagnosisForm(true);
    }

    const showDeleteConfirmation = () => {
        setShowDelete(true);
    }

    const closeDeleteConfirmation = () => {
        setAnswerDiagnosisId("-1");
        setShowDelete(false);
    }

    const handleSearch = () => {
        setSearchValue(`${searchValue}`)
        fetchDataAnswerDiagnosis(`?code=${searchValue}`);
        setFetchStatusAnswerDiagnosis(true)
    }
    
    const handleReset = () => {
        setSearchValue("")
        fetchDataAnswerDiagnosis("");
        // console.log(searchValue);
    }

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const handlePrintPdf = () => {
        setLoading(true);
        setLoadingText('Mengunduh file ...')
        const api = "/api/report/relation/pdf"
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
            <AnswerDiagnosisForm show={showAnswerDiagnosisForm} setShow={setShowAnswerDiagnosisForm} handleClose={handleClose} />
            <ConfirmDelete
                show={showDelete}
                setShow={setShowDelete}
                handleCancel={closeDeleteConfirmation}
                textConfirmation={"Anda yakin ingin menghapus data relasi ?"}
                handleDelete={handleSubmitDelete} />
            <Container className={"w-100"}>
                <TitleBreadcrumb title={"Kelola Relasi"} paths={paths} />
                <Row className={"mb-2"}>
                    <Col className={"col-6 d-flex flex-row align-items-end"}>
                        <PrintButton printPdf={handlePrintPdf} />
                    </Col>
                    <Col className={"col-6"}>
                        <SearchAddBtn
                            handleSearch={handleSearch}
                            searchFormValue={searchValue}
                            placeholder="Cari kode"
                            handleOnChange={(e) => setSearchValue(e.target.value) }
                            handleAdd={handleAdd}
                            handleReset={handleReset} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{overflowX: "auto"}}>
                        <Table hover>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Kode Diagnosa</th>
                                <th>Diagnosa</th>
                                <th>Kode Pertanyaan</th>
                                <th>Pertanyaan</th>
                                <th>Kode Jawaban</th>
                                <th>Jawaban</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {!answerDiagnosisList && (
                                <SpinnerLoading text={"Loading..."} />
                            )}
                            {answerDiagnosisList &&
                                records.map((item, index) => (
                                        <tr key={item.id}>
                                            <th scope="row">{firstIndex + index+1}</th>
                                            <td>{item.diagnosisCode}</td>
                                            <td>{(item.diagnosisName.length <= 20) ? item.diagnosisName : item.diagnosisName.substring(0, 20) + "..."}</td>
                                            <td>{item.questionCode}</td>
                                            <td>{(item.questionName.length <= 20) ? item.questionName : item.questionName.substring(0, 20) + "..."}</td>
                                            <td>{item.answerCode}</td>
                                            <td>{(item.answerName.length <= 20) ? item.answerName : item.answerName.substring(0, 20) + "..."}</td>
                                            <td>
                                                <div className={"d-flex gap-2"}>
                                                    <Button
                                                        value={item.id}
                                                        color={"success"}
                                                        onClick={() => {
                                                            handleAnswerDiagnosisDetail(item.id);
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
                                                            setAnswerDiagnosisId(item?.id);
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
                    </Col>
                </Row>
                <Row>
                    <Col className={'d-flex justify-content-end'}>
                        Total Data: <b>{answerDiagnosisList?.length}</b>
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
export default AnswerDiagnosisWrapper