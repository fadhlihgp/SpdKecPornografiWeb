import {useContext, useEffect} from "react";
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

const AnswerDiagnosisForm = ({show, setShow, handleClose}) => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { answerDiagnosisId, setAnswerDiagnosisId, answerDiagnosisInput, setAnswerDiagnosisInput, questionList,
        fetchStatusQuestion, answerDiagnosisDetail, setAnswerDiagnosisDetail, fetchStatusAnswer, fetchStatusDiagnosis } = stateContext;
    const {fetchDataQuestion, handleSubmitAnswerDiagnosis, fetchDataAnswer, fetchDataDiagnosis } = handleFunctionContext;
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitAnswerDiagnosis();
        handleClose();
    }

    const handleCancel = () => {
        setAnswerDiagnosisId("-1");
        // setAnswerDiagnosisInput({...answerDiagnosisInput, answerId: "", questionId: ""})
        // setAnswerDiagnosisDetail({...answerDiagnosisDetail, questionName: "", answerName: "", diagnosisName: ""})
        handleClose();
    }

    // useEffect(() => {
    //     fetchDataQuestion();
    //     fetchDataAnswer();
    //     fetchDataDiagnosis();
    //     // console.log(questionList);
    // }, [fetchStatusQuestion]);

    const handleSelectChange = (e) => {
        // let id = e.target.value;
        // // console.log(id)
        // const selectedAnswerDiagnosis = questionList?.find(q => q.id === id)
        // if (selectedAnswerDiagnosis) {
        //     setAnswerDiagnosisDetail({...answerDiagnosisDetail, questionName: selectedAnswerDiagnosis.questionName})
        //     setAnswerDiagnosisInput({...answerDiagnosisInput, questionId: id})
        // }
    }

    const handleOnChange = (e) => {
        setAnswerDiagnosisInput({...answerDiagnosisInput, answerDiagnosisName: e.target.value})
    }

    return(
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
                                        // value={answerDiagnosisInput.questionId}
                                        onChange={handleSelectChange}>
                                        <option value="">Pilih Pertanyaan</option>
                                        {/*{questionList?.map(({ id, questionCode}, index) => {*/}
                                        {/*    return <option value={id} key={index}>{questionCode}</option>*/}
                                        {/*})}*/}
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
                                        // value={answerDiagnosisDetail?.questionName}
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
                                        // value={answerDiagnosisInput.questionId}
                                        onChange={handleSelectChange}>
                                        <option value="">Pilih Jawaban</option>
                                        {/*{questionList?.map(({ id, questionCode}, index) => {*/}
                                        {/*    return <option value={id} key={index}>{questionCode}</option>*/}
                                        {/*})}*/}
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
                                        // value={answerDiagnosisDetail?.answerName}
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
                                        // value={answerDiagnosisInput.questionId}
                                        onChange={handleSelectChange}>
                                        <option value="">Pilih Jawaban</option>
                                        {/*{questionList?.map(({ id, questionCode}, index) => {*/}
                                        {/*    return <option value={id} key={index}>{questionCode}</option>*/}
                                        {/*})}*/}
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
                                        // value={answerDiagnosisDetail?.diagnosisName}
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
                                >Simpan</Button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </Form>
            </MDBModalDialog>
        </MDBModal>
    )
}
export default AnswerDiagnosisForm;