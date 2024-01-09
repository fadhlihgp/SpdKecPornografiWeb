import {Container} from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import {useEffect, useState} from "react";
import SpinnerLoading from "../../SpinnerLoading";
import moment from "moment";
import {useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

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
        link: "/relation/:id",
        text: "Detail Relasi"
    }
]

const AnswerDiagnosisDetailComponent = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id !== undefined) {
            axios.get(`api/answerDiagnosis/${id}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data}) => {
                console.log(data);
                setData({...data,
                    answerCode: data.data.answerCode,
                    answerName: data.data.answerName,
                    questionCode: data.data.questionCode,
                    questionName: data.data.questionName,
                    diagnosisCode: data.data.diagnosisCode,
                    diagnosisName: data.data.diagnosisName,
                    diagnosisDescription: data.data.diagnosisDescription,
                    diagnosisSuggestion: data.data.diagnosisSuggestion,
                    createdBy: data.data.createdBy,
                    updatedBy: data.data.updatedBy,
                    createdAt: data.data.createdAt,
                    updatedAt: data.data.updatedAt
                })
            }).catch((error) => {
                alert(error.message);
            })
        }
    }, [data]);

    return(
        <>
            {!data && (
                <SpinnerLoading text={"Mengambil data ..."} />
            )}
            {data && (
                <Container>
                    <TitleBreadcrumb title={"Detail Jawaban"} paths={paths} />
                    <Container className={"p-0"}>
                        <div className={"d-flex gap-5"}>
                            <div className={"w-50"}>
                                <p><b>Kode Pertanyaan</b>:<br/> {data.questionCode}</p>
                                <p><b>Pertanyaan</b>:<br/> {data.questionName} </p>
                                <hr/>
                                <p><b>Kode Jawaban</b>:<br/> {data.answerCode}</p>
                                <p><b>Jawaban</b>:<br/> {data.answerName}</p>
                                <hr/>
                                <p><b>Kode Diagnosa</b>:<br/> {data.diagnosisCode}</p>
                                <p><b>Diagnosa</b>:<br/> {data.diagnosisName}</p>
                                <p style={{whiteSpace: "pre-line"}}><b>Deskripsi</b>:<br/> {data.diagnosisDescription}</p>
                                <p style={{whiteSpace: "pre-line"}}><b>Saran</b>:<br/> {data.diagnosisSuggestion}</p>
                            </div>
                            <div className={"w-50"}>
                                <p><b>Dibuat pada</b>:<br/> {moment(data.createdAt).format("DD MMM YYYY hh:mm")}</p>
                                <p><b>Dibuat oleh</b>:<br/> {data.createdBy}</p>
                                <p><b>Diperbarui pada</b>:<br/> {moment(data.updatedAt).format("DD MMM YYYY hh:mm")}</p>
                                <p><b>Diperbarui oleh</b>:<br/> {data.updatedBy}</p>
                            </div>
                        </div>
                    </Container>
                </Container>
            )}
        </>
    )
}
export default AnswerDiagnosisDetailComponent