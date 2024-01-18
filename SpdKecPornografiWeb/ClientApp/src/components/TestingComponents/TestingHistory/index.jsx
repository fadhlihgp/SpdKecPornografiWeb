import {
    Button,
    Col,
    Container, Form, Input, Pagination, PaginationItem, PaginationLink,
    Row, Table
} from "reactstrap";
import PrintButton from "../../PrintButton/index";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import SearchAddBtn from "../../SearchAddbtn/SearchAddBtn";
import ConfirmDelete from "../../ConfirmDelete/index";
import TitleBreadcrumb from "../../TitleBreadcrumb/index";
import iconResources from "../../../helpers/listIcon";
import SpinnerLoading from "../../SpinnerLoading";
import moment from "moment";
import {Link} from "react-router-dom";
import {handleDownloadFile} from "../../../helpers/handleDownloadFile";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/testing/history",
        text: "Riwayat Pengujian"
    }
]
const TestingHistoryWrapper = () => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { testingHistories, setTestingHistories, fetchStatusHistory, setFetchStatusHistory } = stateContext;
    const { fetchDataTestingHistory } = handleFunctionContext;

    const [dateString, setDateString] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(10);
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = testingHistories?.slice(firstIndex, lastIndex);
    const nPage = testingHistories ? Math.ceil(testingHistories.length / recordPerPage) : 0;
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
    // =================
    const handleDateChange = (e) => {
        const { value } = e.target;
        setDateString(value);
    };

    const handleSearch = (e) => {
        setDateString(e.target.value);
        // setFetchStatusHistory(true);
        fetchDataTestingHistory(`?date=${dateString}`);
    };

    const handleReset = () => {
        setDateString('');
        fetchDataTestingHistory("");
    };

    useEffect(() => {
        if (dateString) {
            fetchDataTestingHistory(`?date=${dateString}`);
        } else {
            fetchDataTestingHistory("");
        }
        // console.log(testingHistories);
    }, [fetchStatusHistory]);

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const handlePrintPdf = () => {
        setLoading(true);
        setLoadingText('Mengunduh file ...')
        const api = "/api/report/history/pdf"
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
    
    return (
        <>
            {loading && (
                <SpinnerLoading text={loadingText} />
            )}
            <Container className={"w-100"}>
                <TitleBreadcrumb title={"Riwayat Pengujian"} paths={paths} />
                <Row className={"mb-2"}>
                    <Col className={"col-6 d-flex flex-row align-items-end"}>
                        <PrintButton printPdf={handlePrintPdf} />
                    </Col>
                    <Col className={"col-6 d-flex gap-1 justify-content-end"}>
                        <Form className={"w-75 d-flex gap-1"}>
                            <Input
                                id="search"
                                name="search"
                                placeholder={"Tanggal"}
                                type="date"
                                value={dateString}
                                onChange={handleDateChange}
                            />
                            <Button color={"primary"} size={"sm"} onClick={handleSearch}>Cari</Button>
                            <Button color={"primary"} outline size={"sm"} onClick={handleReset}>Reset</Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table hover>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Kode Pengujian</th>
                                <th>Diagnosa</th>
                                <th>Tanggal Pengujian</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {!testingHistories && (
                                <SpinnerLoading text={"Loading..."} />
                            )}
                            {testingHistories &&
                                records.map((item, index) => (
                                        <tr key={item.id}>
                                            <th scope="row">{index+1}</th>
                                            <td>{item.testingCode}</td>
                                            <td>{item.diagnosis.diagnosisName}</td>
                                            <td>{moment(item.createdAt).format("DD MMM YYYY hh:mm")}</td>
                                            <td><Link to={`/testing/history/${item.id}`}>Lihat</Link></td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col className={'d-flex justify-content-end'}>
                        Total Data: <b>{testingHistories?.length}</b>
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
export default TestingHistoryWrapper;