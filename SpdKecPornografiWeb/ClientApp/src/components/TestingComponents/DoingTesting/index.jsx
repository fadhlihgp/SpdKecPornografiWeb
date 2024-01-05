import {Button, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import TitleBreadcrumb from "../../TitleBreadcrumb";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";

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
    const { questionList, fetchStatusQuestion, setFetchStatusQuestion } = stateContext;
    const { fetchDataQuestion } = handleFunctionContext;

    useEffect(() => {
        fetchDataQuestion("");
    }, [fetchStatusQuestion]);
    
    // const [questions] = useState([
    //     {
    //         id: 1,
    //         question: 'Pertanyaan 1',
    //         options: [
    //             { optionId: 'option_a', text: 'Opsi A untuk Pertanyaan 1' },
    //             { optionId: 'option_b', text: 'Opsi B untuk Pertanyaan 1' },
    //             // ... dan seterusnya
    //         ],
    //     },
    //     {
    //         id: 2,
    //         question: 'Pertanyaan 2',
    //         options: [
    //             { optionId: 'option_a', text: 'Opsi A untuk Pertanyaan 2' },
    //             { optionId: 'option_b', text: 'Opsi B untuk Pertanyaan 2' },
    //             // ... dan seterusnya
    //         ],
    //     },
    //     // ... dan seterusnya
    // ]);

    const [selectedOptions, setSelectedOptions] = useState({});
    const [answers, setAnswers] = useState([]);

    const handleOptionChange = (e, questionId) => {
        const updatedSelection = {
            ...selectedOptions,
            [questionId]: e.target.value,
        };
        setAnswers([...answers, e.target.value]);
        setSelectedOptions(updatedSelection);
    };

    const handleReset = () => {
        setSelectedOptions([]); // Mengatur ulang nilai menjadi array kosong saat tombol reset ditekan
    };
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Jawaban yang dipilih:', answers);
    };
    
    return(
        <Container className={"w-100"}>
            <TitleBreadcrumb title={"Pengujian"} paths={paths} />
            <h5 style={{color: "#7077A1"}}><b>Harap mengisi semua pertanyaan untuk mengetahui diagnosa</b></h5>
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
                                                name={`${question.id}`}
                                                value={answer.id}
                                                onChange={(e) => handleOptionChange(e, question.id)}
                                                checked={selectedOptions[question.id] === answer.id}
                                            />{' '}
                                            {answer.answerName}
                                        </Label> <br/>
                                    </>
                                ))}
                            </div>
                        </FormGroup>
                    ))}
                    <Button color="primary">
                        Submit
                    </Button>
                </Form>
                <Button color="danger" outline onClick={handleReset}>
                    Reset
                </Button>
            </Row>
        </Container>
    )
}
export default DoingTesting;