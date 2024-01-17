import {Col, Container, Row} from "reactstrap";
import CardDashboard from "../../components/CardDashboard";
import userIcon from "../../resources/accountDashboard.png";
import questionIcon from "../../resources/questionDashboard.png";
import answerIcon from "../../resources/answerDashboard.png";
import relationIcon from "../../resources/relationDashboard.png";
import historyIcon from "../../resources/historyDashboard.png";
import diagnosisIcon from "../../resources/diagnosisDashboard.png";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";

const dashboardAdmin = [
    {
        linkUrl: '/user', 
        count: 8, 
        title: 'Pengguna', 
        iconImage: userIcon
    }
]
const DashboardSuperAdmin = () => {
    const {stateContext, handleFunctionContext} = useContext(GlobalContext);
    const {roleId, fetchStatusQuestion, fetchStatusAnswer, fetchStatusDiagnosis, fetchStatusAnswerDiagnosis, fetchStatusAccount, fetchStatusHistory} = stateContext;
    const {fetchDataAccount} = handleFunctionContext;
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        axios.get(`api/dashboard`, {
            headers: { Authorization: `Bearer ${Cookies.get('token')}`}
        }).then(({data}) => {
            setDashboardData(data.data);
        }).catch((error) => {
            alert(error.response.data.message)
        })
    }, [fetchStatusQuestion, fetchStatusAnswer, fetchStatusDiagnosis, fetchStatusAnswerDiagnosis, fetchStatusAccount, fetchStatusHistory]);
    
    return (
        <Container className={'my-3'}>
            <Row>
                <h4><b>Dashboard</b></h4>
            </Row>
            <Row className={'my-3'}>
                {(roleId === '1') && (
                    <Col sm={'3'}>
                        <CardDashboard title={'Pengguna'} count={dashboardData?.accountAmount} iconImage={userIcon} linkUrl={'/user'} />
                    </Col>
                )}
                {(roleId === '2' || roleId === '1') && (
                    <>
                        <Col sm={'3'}>
                            <CardDashboard title={'Pertanyaan'} count={dashboardData?.questionAmount} iconImage={questionIcon} linkUrl={'/question'} />
                        </Col>
                        <Col sm={'3'}>
                            <CardDashboard title={'Jawaban'} count={dashboardData?.answerAmount} iconImage={answerIcon} linkUrl={'/answer'} />
                        </Col>
                        <Col sm={'3'}>
                            <CardDashboard title={'Diagnosa'} count={dashboardData?.diagnosisAmount} iconImage={diagnosisIcon} linkUrl={'/diagnosis'} />
                        </Col>
                        <Col sm={'3'}>
                            <CardDashboard title={'Relasi'} count={dashboardData?.relationAmount} iconImage={relationIcon} linkUrl={'/relation'} />
                        </Col>
                    </>
                )}
                <Col sm={'3'}>
                    <CardDashboard title={'Pengujian'} count={dashboardData?.testingHistoryAmount} iconImage={historyIcon} linkUrl={'/testing/history'} />
                </Col>
            </Row>
        </Container>
    )
}
export default DashboardSuperAdmin;