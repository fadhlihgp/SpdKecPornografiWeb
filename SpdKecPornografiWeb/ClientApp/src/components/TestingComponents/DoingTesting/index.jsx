import {Button, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import SpinnerLoading from "../../SpinnerLoading";
import {useNavigate} from "react-router-dom";

const paths = [
    {
        link: "/dashboard",
        text: "Dashboard"
    },
    {
        link: "/testing",
        text: "Pengujian"
    }
]
const DoingTesting = () => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { questionList, fetchStatusQuestion, setFetchStatusHistory } = stateContext;
    const { fetchDataQuestion } = handleFunctionContext;
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchDataQuestion("");
    }, [fetchStatusQuestion]);

    const [selectedOptions, setSelectedOptions] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const handleOptionChange = (e, index) => {
        const updatedSelection = {
            ...selectedOptions,
            [`value${index}`]: e.target.value,
        };
        // setAnswers([...answers, e.target.value]);
        setSelectedOptions(updatedSelection);
    };

    const handleReset = () => {
        setSelectedOptions([]); // Mengatur ulang nilai menjadi array kosong saat tombol reset ditekan
    };
    
    const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
        let answerIds = Object.values(selectedOptions);
        axios.post(`api/testing`, { answerIds: answerIds }, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        }).then(({data}) => {
            setFetchStatusHistory(true);
            navigate(`/testing/${data.data.id}`);
            handleReset();
        }).catch((error) => {
            alert(!error.response.data.message ? error : error.response.data.message);
        }).finally(() => {
            setIsLoading(false);
        })
    };
    
    return(
        <>
            {isLoading && (<SpinnerLoading text={"Proses diagnosa ..."} />)}
            <Container className={"w-100"}>
                <TitleBreadcrumb title={"Pengujian"} paths={paths} />
                <h5 style={{color: "#7077A1", textAlign: "center", marginTop: "1%", marginBottom: "1%"}}><b>Harap mengisi semua pertanyaan untuk mengetahui diagnosa</b></h5>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        {questionList?.map((question, index) => (
                            <FormGroup key={question.id}>
                                <Label><b>{index+1}. {question.questionName}</b></Label>
                                <div>
                                    {question.answers?.map((answer) => (
                                        <>
                                            <Label key={answer.id} check>
                                                <Input
                                                    required
                                                    type="radio"
                                                    name={`value${index}`}
                                                    value={answer.id}
                                                    onChange={(e) => handleOptionChange(e, index)}
                                                    checked={selectedOptions[`value${index}`] === answer.id}
                                                />{' '}
                                                {answer.answerName}
                                            </Label> <br/>
                                        </>
                                    ))}
                                </div>
                            </FormGroup>
                        ))}
                        <div className={"d-flex gap-3 w-100 justify-content-center mb-3"}>
                            <Button color="success" className={"w-25"}>
                                Submit
                            </Button>
                            <Button className={"w-25"} color="danger" outline onClick={handleReset}>
                                Reset
                            </Button>
                        </div>
                    </Form>
                </Row>
            </Container>
        </>
    )
}
export default DoingTesting;