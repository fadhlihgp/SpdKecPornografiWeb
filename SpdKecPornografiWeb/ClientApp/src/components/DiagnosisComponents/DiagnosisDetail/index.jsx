import {useContext, useEffect} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import SpinnerLoading from "../../SpinnerLoading";
import {Container} from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import moment from "moment/moment";

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
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { diagnosisDetail } = stateContext;

    // id: data.data.id,
    //     diagnosisCode: data.data?.diagnosisCode,
    //     diagnosisName: data.data?.diagnosisName,
    //     diagnosisDescription: data.data?.diagnosisDescription,
    //     diagnosisSuggestion: data.data?.diagnosisSuggestion,
    //     createdAt: data.data?.createdAt,
    //     createdBy: data.data?.createdBy,
    //     updatedAt: data.data?.updatedAt,
    //     updatedBy: data.data?.updatedBy

    return(
        <>
            {!diagnosisDetail && (
                <SpinnerLoading text={"Mengambil data ..."} />
            )}
            {diagnosisDetail && (
                <Container>
                    <TitleBreadcrumb title={"Detail Diagnosa"} paths={paths} />
                    <Container className={"p-0"}>
                        <div className={"d-flex"}>
                            <div className={"w-50"}>
                                <p><b>Kode Diagnosa</b>:<br/> {diagnosisDetail.diagnosisCode}</p>
                                <p><b>Nama</b>:<br/> {diagnosisDetail.diagnosisName}</p>
                                <p style={{whiteSpace: "pre-line"}}><b>Deskripsi</b>:<br/>{diagnosisDetail.diagnosisDescription}</p>
                                <p style={{whiteSpace: "pre-line"}}><b>Saran</b>:<br/>{diagnosisDetail.diagnosisSuggestion}</p>
                            </div>
                            <div className={"w-50"}>
                                <p><b>Dibuat pada</b>:<br/> {moment(diagnosisDetail.createdAt).format("DD MMM YYYY hh:mm")}</p>
                                <p><b>Dibuat oleh</b>:<br/> {diagnosisDetail.createdBy}</p>
                                <p><b>Diperbarui pada</b>:<br/> {moment(diagnosisDetail.updatedAt).format("DD MMM YYYY hh:mm")}</p>
                                <p><b>Diperbarui oleh</b>:<br/> {diagnosisDetail.updatedBy}</p>
                            </div>
                        </div>
                    </Container>
                </Container>
            )}
        </>
    )
}
export default DiagnosisDetailWrapper;