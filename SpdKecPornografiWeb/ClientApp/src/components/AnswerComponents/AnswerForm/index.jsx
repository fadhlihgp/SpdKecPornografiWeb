import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {useContext, useEffect} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import {FormSelect} from "react-bootstrap";

const AnswerForm = ({show, setShow, handleClose}) => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { answerId, setAnswerId, answerInput, setAnswerInput, questionList,
        fetchStatusQuestion, answerDetail, setAnswerDetail } = stateContext;
    const {fetchDataQuestion, handleSubmitAnswer } = handleFunctionContext;
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitAnswer();
        handleClose();
    }

    const handleCancel = () => {
        setAnswerId("-1");
        setAnswerInput({...answerInput, answerCode: "", questionId: "", answerName: ""})
        setAnswerDetail({...answerDetail, questionName: ""})
        handleClose();
    }
    
    useEffect(() => {
        fetchDataQuestion();
        // console.log(questionList);
    }, [fetchStatusQuestion]);
    
    const handleSelectChange = (e) => {
        let id = e.target.value;
        // console.log(id)
        const selectedAnswer = questionList?.find(q => q.id === id)
        if (selectedAnswer) {
            setAnswerDetail({...answerDetail, questionName: selectedAnswer.questionName})
            setAnswerInput({...answerInput, questionId: id})
        } 
    }
    
    const handleOnChange = (e) => {
        setAnswerInput({...answerInput, answerName: e.target.value})
    }
    
    return(
        <MDBModal open={show} setopen={setShow} tabIndex='-1' staticBackdrop className={"modal-dialog-scrollable"}>
            <MDBModalDialog size={"lg"}>
                        <Form onSubmit={handleSubmit}>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>{answerId === "-1" ? "Tambah Jawaban Baru" : "Edit Jawaban"}</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={handleClose}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                            <FormGroup row>
                                <Label
                                    for="answerCode"
                                    sm={3}
                                >
                                    Kode
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="answerCode"
                                        name="answerCode"
                                        type="text"
                                        disabled
                                        value={answerInput?.answerCode}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="questionId"
                                    sm={3}
                                >
                                    Kode Pertanyaan
                                </Label>
                                <Col sm={9}>
                                    <FormSelect 
                                        name="questionId" 
                                        value={answerInput.questionId} 
                                        onChange={handleSelectChange}>
                                        <option value="">Pilih Pertanyaan</option>
                                        {questionList?.map(({ id, questionCode}, index) => {
                                            return <option value={id} key={index}>{questionCode}</option>
                                        })}
                                    </FormSelect>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="questionName"
                                    sm={3}
                                >
                                    Pertanyaan
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="questionName"
                                        name="questionName"
                                        type="textarea"
                                        rows={"4"}
                                        disabled
                                        value={answerDetail?.questionName}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="answerName"
                                    sm={3}
                                >
                                    Jawaban
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="answerName"
                                        name="answerName"
                                        type="textarea"
                                        rows={"4"}
                                        onChange={handleOnChange}
                                        value={answerInput.answerName}
                                    />
                                </Col>
                            </FormGroup>
                    </MDBModalBody>

                    <MDBModalFooter>
                        <Button color={'secondary'} onClick={handleCancel}>
                            Tutup
                        </Button>
                        <Button 
                            color='success' 
                            type={"submit"} 
                            disabled={!answerInput.answerName || !answerDetail.questionName || 
                                !answerInput.questionId || !answerInput.answerCode}>Simpan</Button>
                    </MDBModalFooter>
                </MDBModalContent>
                        </Form>
            </MDBModalDialog>
        </MDBModal>
    )
}
export default AnswerForm;