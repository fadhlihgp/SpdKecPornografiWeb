import {
    Button,
    Col,
    Container, Form, Input,
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

    return (
        <>
            <Container className={"w-100"}>
                <TitleBreadcrumb title={"Riwayat Pengujian"} paths={paths} />
                <Row className={"mb-2"}>
                    <Col className={"col-6 d-flex flex-row align-items-end"}>
                        <PrintButton />
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
                                testingHistories?.map((item, index) => (
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
            </Container>
        </>
    )
}
export default TestingHistoryWrapper;