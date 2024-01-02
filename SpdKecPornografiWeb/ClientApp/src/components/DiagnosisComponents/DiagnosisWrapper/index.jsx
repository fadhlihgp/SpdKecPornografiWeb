import TitleBreadcrumb from "../../TitleBreadcrumb";
import {Button, Col, Container, Row, Table} from "reactstrap";
import PrintButton from "../../PrintButton";
import SearchAddBtn from "../../SearchAddbtn/SearchAddBtn";
import SpinnerLoading from "../../SpinnerLoading";
import iconResources from "../../../helpers/listIcon";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import DiagnosisForm from "../DiagnosisForm";
import ConfirmDelete from "../../ConfirmDelete";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/diagnosis",
        text: "Diagnosa"
    }
]

const DiagnosisWrapper = () => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { fetchStatusDiagnosis, diagnosisList, diagnosisId, setDiagnosisId, diagnosisInput, setDiagnosisInput } = stateContext;
    const { fetchDataDiagnosis, fetchGenerateDiagnosisCode, fetchDataDetailDiagnosis, handleDeleteDiagnosis, handleDiagnosisDetail } = handleFunctionContext;
    
    const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    
    useEffect(() => {
        fetchDataDiagnosis();
    }, [fetchStatusDiagnosis])

    const handleClose = () => {
        setDiagnosisId("-1");
        setDiagnosisInput({...diagnosisInput, diagnosisName: "", diagnosisDescription: "", diagnosisSuggestion: ""});
        setShowDiagnosisForm(false);
    }

    const handleAdd = () => {
        // setFetchStatusQuestion(true);
        setDiagnosisId("-1");
        fetchGenerateDiagnosisCode();
        setShowDiagnosisForm(true);
    }
    
    const handleEdit = (diagnosisId) => {
        // console.log(diagnosisId);
        fetchDataDetailDiagnosis(diagnosisId);
        setShowDiagnosisForm(true);
    }
    
    const showDeleteConfirmation = () => {
        setShowDeleteForm(true);
    }
    
    const handleSubmitDelete = () => {
        handleDeleteDiagnosis(diagnosisId);
        handleCloseDelete()
    }
    
    const handleCloseDelete = () => {
        setDiagnosisId("-1");
        setShowDeleteForm(false);
    }
    
    return(
        <>
            <DiagnosisForm show={showDiagnosisForm} setShow={setShowDiagnosisForm} handleClose={handleClose} />
            <ConfirmDelete
                show={showDeleteForm}
                setShow={setShowDeleteForm}
                handleCancel={handleCloseDelete}
                handleDelete={handleSubmitDelete}
                textConfirmation={"Anda yakin ingin menghapus data diagnosa ?"}
            />
            <Container className={"w-100"}>
                <TitleBreadcrumb title={"Kelola Diagnosa"} paths={paths} />
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
                                <th>Kode Diagnosa</th>
                                <th>Diagnosa</th>
                                <th>Deskripsi</th>
                                <th>Saran</th>
                            </tr>
                            </thead>
                            <tbody>
                            {!diagnosisList && (
                                <SpinnerLoading text={"Loading..."} />
                            )}
                            {diagnosisList &&
                                diagnosisList.map((item, index) => (
                                        <tr key={item.id}>
                                            <th scope="row">{index+1}</th>
                                            <td>{item.diagnosisCode}</td>
                                            <td>{item.diagnosisName}</td>
                                            <td>{(item.diagnosisDescription.length <= 20) ? item.diagnosisDescription : item.diagnosisDescription.substring(0, 20) + "..."}</td>
                                            <td>{(item.diagnosisSuggestion.length <= 20) ? item.diagnosisSuggestion : item.diagnosisSuggestion.substring(0, 20) + "..."}</td>
                                            <td>
                                                <div className={"d-flex gap-2"}>
                                                    <Button
                                                        value={item.id}
                                                        color={"success"}
                                                        onClick={() => {
                                                            handleDiagnosisDetail(item.id)
                                                        }}>
                                                        <img src={iconResources.eyePng} width={"17px"} alt={"see"}/>
                                                    </Button>
                                                    <Button
                                                        value={item.id}
                                                        color={"primary"}
                                                        onClick={() => {
                                                            setDiagnosisId(item.id);
                                                            handleEdit(item.id);
                                                        }}>
                                                        <img src={iconResources.editPng} width={"17px"} alt={"edit"} />
                                                    </Button>
                                                    <Button
                                                        value={item.id}
                                                        color={"danger"}
                                                        onClick={() => {
                                                            setDiagnosisId(item?.id);
                                                            showDeleteConfirmation();
                                                        }}
                                                    >
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
export default DiagnosisWrapper