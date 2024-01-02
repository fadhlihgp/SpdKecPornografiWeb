import TitleBreadcrumb from "../../TitleBreadcrumb";
import {Button, Col, Container, Row, Table} from "reactstrap";
import PrintButton from "../../PrintButton";
import SearchAddBtn from "../../SearchAddbtn/SearchAddBtn";
import SpinnerLoading from "../../SpinnerLoading";
import iconResources from "../../../helpers/listIcon";

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
    return(
        <>
            <Container className={"w-100"}>
                <TitleBreadcrumb title={"Kelola Diagnosa"} paths={paths} />
                <Row className={"mb-2"}>
                    <Col className={"col-6 d-flex flex-row align-items-end"}>
                        <PrintButton />
                    </Col>
                    <Col className={"col-6"}>
                        <SearchAddBtn />
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