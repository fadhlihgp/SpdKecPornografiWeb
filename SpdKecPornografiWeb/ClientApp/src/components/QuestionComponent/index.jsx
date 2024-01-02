import {
    Button,
    Col,
    Container,
    Row, Table
} from "reactstrap";
import PrintButton from "../PrintButton";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import eye from "../../resources/eye.png";
import trash from "../../resources/delete.png";
import edit from "../../resources/edit.png";
import SearchAddBtn from "../SearchAddbtn/SearchAddBtn";
import QuestionForm from "../QuestionForm";
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
    const { questionList, fetchStatusQuestion, setFetchStatusQuestion, questionId, setQuestionId, questionInput, setQuestionInput, questionDetail, setQuestionDetail, setShowQuestionForm,
        showQuestionForm } = stateContext;
    const { fetchDataQuestion, handleQuestionDetail, fetchGenerateQuestionCode, handleDeleteQuestion, fetchDataDetailQuestion, handleQuestionEdit } = handleFunctionContext;
    
    const [showDelete, setShowDelete] = useState(false);
    
    useEffect(() => {
        fetchDataQuestion()
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
                        <SearchAddBtn handleAdd={handleAdd} />
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
                            {questionList !== null && 
                                questionList.map((item, index) => (
                                    <tr key={item.id}>
                                        <th scope="row">{index+1}</th>
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
                                                    <img src={edit} width={"17px"} alt={"edit"} />
                                                </Button>
                                                <Button
                                                    value={item.id}
                                                    color={"danger"}
                                                    onClick={() => {
                                                        setQuestionId(item?.id);
                                                        showDeleteConfirmation()
                                                    }}>
                                                    <img src={trash} width={"17px"} alt={"delete"} />
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
export default QuestionWrapper;