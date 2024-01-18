import TitleBreadcrumb from "../../TitleBreadcrumb";
import {Button, Col, Container, Input, Pagination, PaginationItem, PaginationLink, Row, Table} from "reactstrap";
import PrintButton from "../../PrintButton";
import SearchAddBtn from "../../SearchAddbtn/SearchAddBtn";
import SpinnerLoading from "../../SpinnerLoading";
import iconResources from "../../../helpers/listIcon";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import DiagnosisForm from "../DiagnosisForm";
import ConfirmDelete from "../../ConfirmDelete";
import {handleDownloadFile} from "../../../helpers/handleDownloadFile";

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
    const { fetchStatusDiagnosis, diagnosisList, diagnosisId, setDiagnosisId, diagnosisInput, setDiagnosisInput, setFetchStatusDiagnosis } = stateContext;
    const { fetchDataDiagnosis, fetchGenerateDiagnosisCode, fetchDataDetailDiagnosis, handleDeleteDiagnosis, handleDiagnosisDetail } = handleFunctionContext;
    
    const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(10);
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = diagnosisList?.slice(firstIndex, lastIndex);
    const nPage = diagnosisList ? Math.ceil(diagnosisList.length / recordPerPage) : 0;
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
    //
    useEffect(() => {
        if (searchValue) {
            fetchDataDiagnosis(`?name=${searchValue}`);
        } else {
            fetchDataDiagnosis("");
        }
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
    
    const handleReset = () => {
        setSearchValue("");
        fetchDataDiagnosis("");
    }
    
    const handleSearch = (e) => {
        setSearchValue(searchValue);
        setFetchStatusDiagnosis(true);
    }

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const handlePrintPdf = () => {
        setLoading(true);
        setLoadingText('Mengunduh file ...')
        const api = "/api/report/diagnosis/pdf"
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
    
    return(
        <>
            {loading && (
                <SpinnerLoading text={loadingText} />
            )}
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
                        <PrintButton printPdf={handlePrintPdf} />
                    </Col>
                    <Col className={"col-6"}>
                        <SearchAddBtn 
                            handleAdd={handleAdd}
                            handleOnChange={(e) => setSearchValue(e.target.value)}
                            searchFormValue={searchValue}
                            handleReset={handleReset}
                            handleSearch={handleSearch}
                            placeholder={"Cari kode, nama"}
                        />
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
                                records.map((item, index) => (
                                        <tr key={item.id}>
                                            <th scope="row">{firstIndex + index+1}</th>
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
                <Row>
                    <Col className={'d-flex justify-content-end'}>
                        Total Data: <b>{diagnosisList?.length}</b>
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
export default DiagnosisWrapper