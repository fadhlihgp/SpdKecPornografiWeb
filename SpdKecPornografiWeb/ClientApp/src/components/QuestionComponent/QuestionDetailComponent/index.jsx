import { Container } from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import { useEffect, useState} from "react";
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
        link: "/question",
        text: "Pertanyaan"
    },
    {
        link: "/question/:id",
        text: "Detail Pertanyaan"
    }
]

const QuestionDetailComponent = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id !== undefined) {
            axios.get(`api/question/${id}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data}) => {
                console.log(data);
                setData({...data,
                    id: data.data.id,
                    answerCode: data.data.answerCode,
                    questionCode: data.data.questionCode,
                    questionName: data.data.questionName,
                    answerName: data.data.answerName,
                    createdAt: data.data.createdAt,
                    createdBy: data.data.createdBy,
                    updatedAt: data.data.updatedAt,
                    updatedBy: data.data.updatedBy,
                    answers: data.data.answers
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
                    <TitleBreadcrumb title={"Detail Pertanyaan"} paths={paths} />
                    <Container className={"p-0"}>
                        <div className={"d-flex"}>
                            <div className={"w-50"}>
                                <p><b>Kode Pertanyaan</b>:<br/> {data.questionCode}</p>
                                <p><b>Pertanyaan</b>:<br/> {data.questionName}</p>
                                <p>
                                    <b>Pilihan Jawaban</b>: <br/>
                                    <ul>
                                        {data.answers?.map((a) => (
                                            <li>{a.answerName}</li>
                                        ))}
                                    </ul>
                                </p>
                            </div>
                            <div className={"w-50"}>
                                <p><b>Dibuat pada</b>:<br/> {moment(data.createdAt).format("DD MMM YYYY HH:mm")}</p>
                                <p><b>Dibuat oleh</b>:<br/> {data.createdBy}</p>
                                <p><b>Diperbarui pada</b>:<br/> {moment(data.updatedAt).format("DD MMM YYYY HH:mm")}</p>
                                <p><b>Diperbarui oleh</b>:<br/> {data.updatedBy}</p>
                            </div>
                        </div>
                    </Container>
                </Container>
            )}
        </>
    )
}
export default QuestionDetailComponent