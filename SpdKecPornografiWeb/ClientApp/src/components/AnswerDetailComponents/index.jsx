import {Col, Container, Row} from "reactstrap";
import TitleBreadcrumb from "../TitleBreadcrumb";
import {useContext, useEffect} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import SpinnerLoading from "../SpinnerLoading";
import moment from "moment";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/answer",
        text: "Jawaban"
    },
    {
        link: "/answer/:answerID",
        text: "Detail Jawaban"
    }
]

const AnswerDetailComponent = () => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { fetchDataDetailAnswer } = handleFunctionContext;
    const { answerDetail, setAnswerDetail } = stateContext;

    useEffect(() => {

    }, []);

    return(
        <>
            {!answerDetail && (
                <SpinnerLoading text={"Mengambil data ..."} />
            )}
            {answerDetail && (
                <Container>
                    <TitleBreadcrumb title={"Detail Jawaban"} paths={paths} />
                    <Container className={"p-0"}>
                        <div className={"d-flex"}>
                            <div className={"w-50"}>
                                <p><b>Kode Jawaban</b>:<br/> {answerDetail.answerCode}</p>
                                <p><b>Jawaban</b>:<br/> {answerDetail.answerName}</p>
                                <p><b>Kode Pertanyaan</b>:<br/> {answerDetail.questionCode}</p>
                                <p><b>Pertanyaan</b>:<br/> {answerDetail.questionName} </p>
                            </div>
                            <div className={"w-50"}>
                                <p><b>Dibuat pada</b>:<br/> {moment(answerDetail.createdAt).format("DD MMM YYYY hh:mm")}</p>
                                <p><b>Dibuat oleh</b>:<br/> {answerDetail.createdBy}</p>
                                <p><b>Diperbarui pada</b>:<br/> {moment(answerDetail.updatedAt).format("DD MMM YYYY hh:mm")}</p>
                                <p><b>Diperbarui oleh</b>:<br/> {answerDetail.updatedBy}</p>
                            </div>
                        </div>
                    </Container>
                </Container>
            )}
        </>
    )
}
export default AnswerDetailComponent