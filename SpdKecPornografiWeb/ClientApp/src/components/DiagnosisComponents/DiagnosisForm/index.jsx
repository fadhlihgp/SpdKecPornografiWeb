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

const DiagnosisForm = ({ handleClose, show, setShow }) => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { diagnosisId, diagnosisInput, setDiagnosisInput } = stateContext;
    const { handleSubmitDiagnosis } = handleFunctionContext;
    const handleCancel = () => {
        setDiagnosisInput({...diagnosisInput,  diagnosisName: "", diagnosisDescription: "", diagnosisSuggestion: ""});
        handleClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitDiagnosis();
        handleClose();
    };

    const handleOnChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setDiagnosisInput({...diagnosisInput, [name]: value})
    }

    return (
        <>
            <MDBModal open={show} setopen={setShow} tabIndex='-1' staticBackdrop className={"modal-dialog-scrollable"}>
                <MDBModalDialog size={"lg"} >
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{diagnosisId === "-1" ? "Tambah Diagnosa Baru" : "Edit Diagnosa"}</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={handleClose}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup row>
                                    <Label
                                        for="diagnosisCode"
                                        sm={3}
                                    >
                                        Kode
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            id="diagnosisCode"
                                            name="diagnosisCode"
                                            type="text"
                                            disabled
                                            value={diagnosisInput.diagnosisCode}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="diagnosisName"
                                        sm={3}
                                    >
                                        Diagnosis
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            id="diagnosisName"
                                            name="diagnosisName"
                                            type="text"
                                            value={diagnosisInput.diagnosisName}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="diagnosisName"
                                        sm={3}
                                    >
                                        Deskripsi
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            id="diagnosisDescription"
                                            name="diagnosisDescription"
                                            type="textarea"
                                            rows={"4"}
                                            value={diagnosisInput.diagnosisDescription}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="diagnosisSuggestion"
                                        sm={3}
                                    >
                                        Saran
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            id="diagnosisSuggestion"
                                            name="diagnosisSuggestion"
                                            type="textarea"
                                            rows={"4"}
                                            value={diagnosisInput.diagnosisSuggestion}
                                            onChange={handleOnChange}
                                        />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <Button color={'secondary'} onClick={handleCancel}>
                                Tutup
                            </Button>
                            <Button color='success' 
                                    onClick={handleSubmit}
                                    disabled={!diagnosisInput.diagnosisCode || !diagnosisInput.diagnosisName || 
                                        !diagnosisInput.diagnosisDescription || !diagnosisInput.diagnosisSuggestion}
                            >Simpan</Button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}
export default DiagnosisForm;