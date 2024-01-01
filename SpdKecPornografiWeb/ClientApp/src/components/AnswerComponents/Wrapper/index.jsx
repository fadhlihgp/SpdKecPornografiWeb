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
import QuestionForm from "../../QuestionForm";
import AnswerForm from "../AnswerForm";
import SpinnerLoading from "../../SpinnerLoading";

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
    const { answerList, fetchStatusAnswer, answerId, setAnswerId, answerInput, setAnswerInput, setFetchStatusQuestion, fetchStatusQuestion, setAnswerDetail , answerDetail} = stateContext;
    const { fetchDataAnswer, handleAnswerDetail, fetchGenerateAnswerCode, handleDeleteAnswer, handleAnswerEdit, fetchDataQuestion } = handleFunctionContext;

    const [showDelete, setShowDelete] = useState(false);
    const [ showAnswerForm, setShowAnswerForm ] = useState(false);
    
    useEffect(() => {
        fetchDataAnswer();
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
        setShowDelete(false);
    }


    return (
        <>
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
                                <th>Kode Pertanyaan</th>
                                <th>Kode Jawaban</th>
                                <th>Pertanyaan</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {!answerList && (
                                <SpinnerLoading text={"Loading..."} />
                            )}
                            {answerList &&
                                answerList.map((item, index) => (
                                        <tr key={item.id}>
                                            <th scope="row">{index+1}</th>
                                            <td>{item.questionCode}</td>
                                            <td>{item.answerCode}</td>
                                            <td>{item.answerName}</td>
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
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default AnswerWrapper;