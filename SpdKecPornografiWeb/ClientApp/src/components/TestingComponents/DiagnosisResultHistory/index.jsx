﻿import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import SpinnerLoading from "../../SpinnerLoading";
import {Button, Container} from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import moment from "moment/moment";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import calendarIcon from "../../../resources/calendar.png";
import accountIcon from "../../../resources/account.png"
import {handleDownloadFile} from "../../../helpers/handleDownloadFile";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/testing/history",
        text: "Riwayat Pengujian"
    },
    {
        link: "/testing/:resultDiagnosisId",
        text: "Hasil Pengujian"
    }
]

const DiagnosisResultHistory = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== undefined) {
            axios.get(`api/testing/${id}`, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data}) => {
                console.log(data);
                setData({...data,
                    testingCode: data.data.testingCode,
                    createdAt: data.data.createdAt,
                    accountName: data.data.account.fullname,
                    diagnosisCode: data.data.diagnosis.diagnosisCode,
                    diagnosisName: data.data.diagnosis.diagnosisName,
                    diagnosisDescription: data.data.diagnosis.diagnosisDescription,
                    diagnosisSuggestion: data.data.diagnosis.diagnosisSuggestion
                    // "diagnosisName": "Level 1: Tanpa Kecanduan",
                    // "diagnosisCode": "D155",
                    // "diagnosisDescription": "Kecanduan dikit",
                    // "diagnosisSuggestion": "Saran Dikit",
                })
            }).catch((error) => {
                alert(error.message);
            })
        }
    }, [id]);

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const handlePrintPdf = () => {
        setLoading(true);
        setLoadingText('Mengunduh file ...')
        const api = "/api/report/resultDiagnosis/pdf/" + id;
        handleDownloadFile(api)
            .then(r => {
                // console.log("success");
            })
            .catch((error) => {
                alert('Kesalahan mendownload file');
            })
            .finally(() => {
                setLoading(false);
                setLoadingText("");
            })
    }
    
    return(
        <>
            {loading && (
                <SpinnerLoading text={loadingText} />
            )}
            {!data && (
                <SpinnerLoading text={"Mengambil data ..."} />
            )}
            {data && (
                <Container>
                    <TitleBreadcrumb title={"Hasil Pengujian"} paths={paths} />
                    <Container className={"p-3 bg-light w-100"} style={{borderRadius: "10px"}}>
                        <div className={"w-100"}>
                            <h4 className={"text-center"}><b>Hasil Diagnosa</b></h4>
                            <div className={"d-flex gap-3 mb-3"}>
                                <span><img src={accountIcon} alt={"account"} width={"20px"}/> {data.accountName}</span>
                                <span><img src={calendarIcon} alt={"calendar"} width={"20px"} /> {moment(data.createdAt).format("DD MMMM YYYY hh:mm")}</span>
                            </div>
                            <div className={"d-flex gap-5 mb-3"}>
                                <div>
                                    <b>Kode Pengujian</b>: {data.testingCode}
                                </div>
                                <div>
                                    <b>Kode Diagnosa</b>: {data.diagnosisCode}
                                </div>
                            </div>
                            <p><b>Diagnosa</b>:<br/> {data.diagnosisName} </p>
                            <hr/>
                            <p style={{whiteSpace: "pre-line"}}><b>Keterangan</b>:<br/> {data.diagnosisDescription}</p>
                            <hr/>
                            <p style={{whiteSpace: "pre-line"}}><b>Saran</b>:<br/> {data.diagnosisSuggestion}</p>
                            <div className={"d-flex mt-2 gap-1"}>
                                <Button color={"success"} size={"sm"} onClick={handlePrintPdf}>Cetak</Button>
                                <Button onClick={() => navigate("/testing/history")} size={"sm"}>Kembali ke riwayat pengujian</Button>
                            </div>
                        </div>
                    </Container>
                </Container>
            )}
        </>
    )
}
export default DiagnosisResultHistory;