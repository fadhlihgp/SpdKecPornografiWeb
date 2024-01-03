import ConfirmDelete from "../../ConfirmDelete";
import {Button, Col, Container, Row, Table} from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import PrintButton from "../../PrintButton";
import SearchAddBtn from "../../SearchAddbtn/SearchAddBtn";
import SpinnerLoading from "../../SpinnerLoading";
import iconResources from "../../../helpers/listIcon";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import AnswerDiagnosisForm from "../AnswerDiagnosisForm";

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
        setAnswerDiagnosisDetail , answerDiagnosisDetail, setFetchStatusDiagnosis, setFetchStatusAnswer, answerListFilter, 
        setAnswerListFilter, answerList, questionInput} = stateContext;
    const { fetchDataAnswerDiagnosis, handleAnswerDiagnosisDetail, fetchGenerateAnswerDiagnosisCode, 
        handleDeleteAnswerDiagnosis, fetchDataQuestion, fetchDataDetailAnswerDiagnosis } = handleFunctionContext;

    const [showDelete, setShowDelete] = useState(false);
    const [ showAnswerDiagnosisForm, setShowAnswerDiagnosisForm ] = useState(false);
    const [searchValue, setSearchValue] = useState("");

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

    // const handleShowEdit = (id) => {
    //     handleQuestionEdit(id);
    // }

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
        // console.log(answerList)
    }
    
    const handleReset = () => {
        setSearchValue("")
        fetchDataAnswerDiagnosis("");
        // console.log(searchValue);
    }
    return (
        <>
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
                        <PrintButton />
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
                            {/*public string Id { get; set; }*/}
                            {/*public string? DiagnosisId { get; set; }*/}
                            {/*public string DiagnosisCode { get; set; }*/}
                            {/*public string DiagnosisName { get; set; }*/}
                            {/*public string QuestionId { get; set;}*/}
                            {/*public string QuestionCode { get; set; }*/}
                            {/*public string QuestionName { get; set; }*/}
                            {/*public string? AnswerId { get; set; }*/}
                            {/*public string AnswerCode { get; set; }*/}
                            {/*public string AnswerName { get; set; }*/}
                            {!answerDiagnosisList && (
                                <SpinnerLoading text={"Loading..."} />
                            )}
                            {answerDiagnosisList &&
                                answerDiagnosisList.map((item, index) => (
                                        <tr key={item.id}>
                                            <th scope="row">{index+1}</th>
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
            </Container>
        </>
    )
}
export default AnswerDiagnosisWrapper