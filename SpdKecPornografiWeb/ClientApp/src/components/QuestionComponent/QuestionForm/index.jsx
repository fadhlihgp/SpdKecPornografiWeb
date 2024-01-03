import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useContext} from "react";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {GlobalContext} from "../../../context/GlobalContext";

const QuestionForm = ({ handleClose, show, setShow }) => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { questionId, questionInput, setQuestionInput, setFetchStatusQuestion } = stateContext;
    const { handleSubmitQuestion } = handleFunctionContext;
    const handleCancel = () => {
        setQuestionInput({...questionInput,  questionName: ""});
        handleClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitQuestion();
        handleClose();
    };

    const handleOnChange = (e) => {
        let value = e.target.value;
        setQuestionInput({...questionInput, questionName: value})
    }
    
    return (
        <>
            <MDBModal open={show} setopen={setShow} tabIndex='-1' staticBackdrop className={"modal-dialog-scrollable"}>
                <MDBModalDialog size={"lg"}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{questionId === "-1" ? "Tambah Diagnosa Baru" : "Edit Diagnosa"}</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={handleClose}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup row>
                                    <Label
                                        for="questionCode"
                                        sm={3}
                                    >
                                        Kode
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            id="questionCode"
                                            name="questionCode"
                                            type="text"
                                            disabled
                                            value={questionInput.questionCode}
                                        />
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
                                            value={questionInput.questionName}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <Button color={'secondary'} onClick={handleCancel}>
                                Close
                            </Button>
                            <Button 
                                color='success' 
                                onClick={handleSubmit}
                                disabled={!questionInput.questionCode || !questionInput.questionName}>Simpan</Button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}
export default QuestionForm;