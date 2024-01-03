import {Container} from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import {useContext} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import SpinnerLoading from "../../SpinnerLoading";
import moment from "moment";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/relation",
        text: "Relasi"
    },
    {
        link: "/relation/:relationID",
        text: "Detail Relasi"
    }
]

const AnswerDiagnosisDetailComponent = () => {
    const { stateContext } = useContext(GlobalContext);
    const { answerDiagnosisDetail } = stateContext;

    return(
        <>
            {!answerDiagnosisDetail && (
                <SpinnerLoading text={"Mengambil data ..."} />
            )}
            {answerDiagnosisDetail && (
                <Container>
                    <TitleBreadcrumb title={"Detail Jawaban"} paths={paths} />
                    <Container className={"p-0"}>
                        <div className={"d-flex gap-5"}>
                            <div className={"w-50"}>
                                <p><b>Kode Pertanyaan</b>:<br/> {answerDiagnosisDetail.questionCode}</p>
                                <p><b>Pertanyaan</b>:<br/> {answerDiagnosisDetail.questionName} </p>
                                <hr/>
                                <p><b>Kode Jawaban</b>:<br/> {answerDiagnosisDetail.answerCode}</p>
                                <p><b>Jawaban</b>:<br/> {answerDiagnosisDetail.answerName}</p>
                                <hr/>
                                <p><b>Kode Diagnosa</b>:<br/> {answerDiagnosisDetail.diagnosisCode}</p>
                                <p><b>Diagnosa</b>:<br/> {answerDiagnosisDetail.diagnosisName}</p>
                                <p style={{whiteSpace: "pre-line"}}><b>Deskripsi</b>:<br/> {answerDiagnosisDetail.diagnosisDescription}</p>
                                <p style={{whiteSpace: "pre-line"}}><b>Saran</b>:<br/> {answerDiagnosisDetail.diagnosisSuggestion}</p>
                            </div>
                            <div className={"w-50"}>
                                <p><b>Dibuat pada</b>:<br/> {moment(answerDiagnosisDetail.createdAt).format("DD MMM YYYY hh:mm")}</p>
                                <p><b>Dibuat oleh</b>:<br/> {answerDiagnosisDetail.createdBy}</p>
                                <p><b>Diperbarui pada</b>:<br/> {moment(answerDiagnosisDetail.updatedAt).format("DD MMM YYYY hh:mm")}</p>
                                <p><b>Diperbarui oleh</b>:<br/> {answerDiagnosisDetail.updatedBy}</p>
                            </div>
                        </div>
                    </Container>
                </Container>
            )}
        </>
    )
}
export default AnswerDiagnosisDetailComponent