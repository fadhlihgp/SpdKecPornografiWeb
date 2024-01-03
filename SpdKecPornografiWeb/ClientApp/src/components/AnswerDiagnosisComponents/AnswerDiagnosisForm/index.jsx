import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {FormSelect} from "react-bootstrap";
import SpinnerLoading from "../../SpinnerLoading";

const AnswerDiagnosisForm = ({show, setShow, handleClose}) => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { answerDiagnosisId, setAnswerDiagnosisId, answerDiagnosisInput, setAnswerDiagnosisInput, questionList,
        fetchStatusQuestion, answerDiagnosisDetail, setAnswerDiagnosisDetail, fetchStatusAnswer, fetchStatusDiagnosis, 
        answerList, setAnswerList, diagnosisList } = stateContext;
    const {fetchDataQuestion, handleSubmitAnswerDiagnosis, fetchDataAnswer, fetchDataDiagnosis } = handleFunctionContext;
    
    const [answerListFilter, setAnswerListFilter] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        handleSubmitAnswerDiagnosis();
        setLoading(false);
        handleCancel();
    }

    const handleCancel = () => {
        setAnswerDiagnosisId("-1");
        setAnswerDiagnosisInput({...answerDiagnosisInput, answerId: "", questionId: "", diagnosisId: ""});
        setAnswerDiagnosisDetail({...answerDiagnosisDetail, questionName: "", answerName: "", diagnosisName: ""});
        setAnswerListFilter(null);
        handleClose();
    }

    useEffect(() => {
        fetchDataQuestion("");
        fetchDataAnswer("");
        fetchDataDiagnosis("");
        // console.log(questionList);
    }, [fetchStatusQuestion, fetchStatusAnswer, fetchStatusDiagnosis]);

    const handleSelectChangeQuestion = (e) => {
        let id = e.target.value;
        // console.log(id)
        const selectedQuestion = questionList?.find(q => q.id === id);
        if (selectedQuestion) {
            setAnswerDiagnosisDetail({...answerDiagnosisDetail, questionName: selectedQuestion.questionName, answerName: ""})
            setAnswerDiagnosisInput({...answerDiagnosisInput, questionId: id});
            // console.log(answerList)
            let findAnswers = answerList?.filter(a => a.questionId === id);
            setAnswerListFilter(findAnswers);
        }
    }

    const handleSelectChangeAnswer = (e) => {
        let id = e.target.value;
        const selectedAnswer = answerListFilter?.find(a => a.id === id);
        if (selectedAnswer) {
            // console.log(selectedAnswer.answerName);
            setAnswerDiagnosisDetail({...answerDiagnosisDetail, answerName: selectedAnswer.answerName});
            setAnswerDiagnosisInput({...answerDiagnosisInput, answerId: id});
        }
    }
    
    const handleSelectChangeDiagnosis = (e) => {
        let id = e.target.value;
        const selectedDiagnosis = diagnosisList?.find(d => d.id === id);
        if (selectedDiagnosis) {
            setAnswerDiagnosisDetail({...answerDiagnosisDetail, diagnosisName: selectedDiagnosis.diagnosisName});
            setAnswerDiagnosisInput({...answerDiagnosisInput, diagnosisId: id});
        }
    }
    return(
        <>
            {loading && <SpinnerLoading text={"Menyimpan data ..."} />}
            <MDBModal open={show} setopen={setShow} tabIndex='-1' staticBackdrop className={"modal-dialog-scrollable"}>
                <MDBModalDialog size={"lg"}>
                    <Form onSubmit={handleSubmit}>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>{answerDiagnosisId === "-1" ? "Tambah Relasi Baru" : "Edit Relasi"}</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={handleCancel}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
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
                                            value={answerDiagnosisInput.questionId}
                                            onChange={handleSelectChangeQuestion}
                                            required
                                        >
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
                                            value={answerDiagnosisDetail?.questionName}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="answerId"
                                        sm={3}
                                    >
                                        Kode Jawaban
                                    </Label>
                                    <Col sm={9}>
                                        <FormSelect
                                            name="answerId"
                                            value={answerDiagnosisInput.answerId}
                                            onChange={handleSelectChangeAnswer}
                                            required
                                        >
                                            <option value="">Pilih Jawaban</option>
                                            {answerDiagnosisId === "-1" && answerListFilter?.map(({ id, answerCode}, index) => {
                                                return <option value={id} key={index}>{answerCode}</option>
                                            })}
                                            {answerDiagnosisId !== "-1" && answerList?.map(({ id, answerCode}, index) => {
                                                return <option value={id} key={index}>{answerCode}</option>
                                            })}
                                        </FormSelect>
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
                                            disabled
                                            value={answerDiagnosisDetail?.answerName}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="diagnosisId"
                                        sm={3}
                                    >
                                        Kode Diagnosa
                                    </Label>
                                    <Col sm={9}>
                                        <FormSelect
                                            name="diagnosisId"
                                            value={answerDiagnosisInput.diagnosisId}
                                            onChange={handleSelectChangeDiagnosis}
                                            required
                                        >
                                            <option value="">Pilih Diagnosa</option>
                                            {diagnosisList?.map(({ id, diagnosisCode}, index) => {
                                                return <option value={id} key={index}>{diagnosisCode}</option>
                                            })}
                                        </FormSelect>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="diagnosisName"
                                        sm={3}
                                    >
                                        Diagnosa
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            id="diagnosisName"
                                            name="diagnosisName"
                                            type="textarea"
                                            rows={"4"}
                                            disabled
                                            value={answerDiagnosisDetail?.diagnosisName}
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
                                    disabled={!answerDiagnosisInput.answerId || !answerDiagnosisInput.diagnosisId}
                                    >Simpan</Button>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </Form>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}
export default AnswerDiagnosisForm;