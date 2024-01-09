import {Container} from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import SpinnerLoading from "../../SpinnerLoading";
import moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";
import {useParams} from "react-router-dom";

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
        link: "/answer/:id",
        text: "Detail Jawaban"
    }
]

const AnswerDetailComponent = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id !== undefined) {
            axios.get(`api/answer/${id}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data}) => {
                console.log(data);
                setData({...data,
                    answerCode: data.data.answerCode,
                    answerName: data.data.answerName,
                    questionCode: data.data.questionCode,
                    questionName: data.data.questionName,
                    createdAt: data.data.createdAt,
                    createdBy: data.data.createdBy,
                    updatedAt: data.data.updatedAt,
                    updatedBy: data.data.updatedBy
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
                        <div className={"d-flex"}>
                            <div className={"w-50"}>
                                <p><b>Kode Jawaban</b>:<br/> {data.answerCode}</p>
                                <p><b>Jawaban</b>:<br/> {data.answerName}</p>
                                <p><b>Kode Pertanyaan</b>:<br/> {data.questionCode}</p>
                                <p><b>Pertanyaan</b>:<br/> {data.questionName} </p>
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
export default AnswerDetailComponent