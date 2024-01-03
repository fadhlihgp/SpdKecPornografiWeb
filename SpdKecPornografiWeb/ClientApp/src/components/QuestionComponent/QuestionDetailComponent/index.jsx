import {Col, Container, Row} from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import {useContext, useEffect} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import SpinnerLoading from "../../SpinnerLoading";
import moment from "moment";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/question",
        text: "Pertanyaan"
    },
    {
        link: "/question/:questionId",
        text: "Detail Pertanyaan"
    }
]

const QuestionDetailComponent = () => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { fetchDataDetailQuestion } = handleFunctionContext;
    const { questionDetail, setQuestionDetail } = stateContext;

    useEffect(() => {
        
    }, []);
    
    return(
        <>
            {!questionDetail && (
                <SpinnerLoading text={"Mengambil data ..."} />
            )}
            {questionDetail && (
                <Container>
                    <TitleBreadcrumb title={"Detail Pertanyaan"} paths={paths} />
                    <Container className={"p-0"}>
                        <div className={"d-flex"}>
                            <div className={"w-50"}>
                                <p><b>Kode Pertanyaan</b>:<br/> {questionDetail.questionCode}</p>
                                <p><b>Pertanyaan</b>:<br/> {questionDetail.questionName}</p>
                                <p>
                                    <b>Pilihan Jawaban</b>: <br/>
                                    <ul>
                                        {questionDetail.answers?.map((a) => (
                                            <li>{a.answerName}</li>
                                        ))}
                                    </ul>
                                </p>
                            </div>
                            <div className={"w-50"}>
                                <p><b>Dibuat pada</b>:<br/> {moment(questionDetail.createdAt).format("DD MMM YYYY hh:mm")}</p>
                                <p><b>Dibuat oleh</b>:<br/> {questionDetail.createdBy}</p>
                                <p><b>Diperbarui pada</b>:<br/> {moment(questionDetail.updatedAt).format("DD MMM YYYY hh:mm")}</p>
                                <p><b>Diperbarui oleh</b>:<br/> {questionDetail.updatedBy}</p>
                            </div>
                        </div>
                    </Container>
                </Container>
            )}
        </>
    )
}
export default QuestionDetailComponent