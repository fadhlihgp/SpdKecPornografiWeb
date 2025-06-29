import {useEffect, useState} from "react";
import SpinnerLoading from "../../SpinnerLoading";
import {Container} from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import moment from "moment/moment";
import {useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/diagnosis",
        text: "Diagnosa"
    },
    {
        link: "/diagnosis/:diagnosisID",
        text: "Detail Diagnosa"
    }
]

const DiagnosisDetailWrapper = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id !== undefined) {
            axios.get(`api/diagnosis/${id}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data}) => {
                console.log(data);
                setData({...data,
                    id: data.data.id,
                    diagnosisCode: data.data.diagnosisCode,
                    diagnosisName: data.data.diagnosisName,
                    diagnosisSuggestion: data.data.diagnosisSuggestion,
                    diagnosisDescription: data.data.diagnosisDescription,
                    createdAt: data.data.createdAt,
                    createdBy: data.data.createdBy,
                    updatedAt: data.data.updatedAt,
                    updatedBy: data.data.updatedBy
                })
            }).catch((error) => {
                alert(error.message);
            })
        }
    }, [id]);
    
    return(
        <>
            {!data && (
                <SpinnerLoading text={"Mengambil data ..."} />
            )}
            {data && (
                <Container>
                    <TitleBreadcrumb title={"Detail Diagnosa"} paths={paths} />
                    <Container className={"p-0"}>
                        <div className={"d-flex"}>
                            <div className={"w-50"}>
                                <p><b>Kode Diagnosa</b>:<br/> {data.diagnosisCode}</p>
                                <p><b>Nama</b>:<br/> {data.diagnosisName}</p>
                                <p style={{whiteSpace: "pre-line"}}><b>Deskripsi</b>:<br/>{data.diagnosisDescription}</p>
                                <p style={{whiteSpace: "pre-line"}}><b>Saran</b>:<br/>{data.diagnosisSuggestion}</p>
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
export default DiagnosisDetailWrapper;