import {Col, Container, Row} from "reactstrap";
import CardHowToUse from "./CardHowToUse";
import loginIcon from "../../resources/log-in.png";
import answerIcon from "../../resources/answer-question.png";
import resultIcon from "../../resources/result.png"

const cardTexts = [
    {
        title: "Langkah 1: Login Kedalam Sistem",
        description: "Sebelum menggunakan fitur didalam aplikasi, pengguna diwajibkan untuk login terlebih dahulu.",
        imageUrl: loginIcon
    },
    {
        title: "Langkah 2: Menjawab Seluruh Pertanyaan",
        description: "Setelah berhasil login, pengguna bisa langsung menggunakan aplikasi dengan menjawab beberapa seluruh pertanyaan yang tersedia.",
        imageUrl: answerIcon
    },
    {
        title: "Langkah 3: Mendapatkan Hasil Diagnosa",
        description: "Berdasarkan jawaban yang anda berikan, dengan metode forward chaining sistem akan mencari dan memberikan hasil diagnosa yang sesuai",
        imageUrl: resultIcon
    },
]
const HowToUse = () => {
    return(
        <Container className={"w-75 my-5"}>
            <Row>
                <Col className={"text-center"}>
                    <h3><b>Cara Penggunaan</b></h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p style={{color: '#030637'}}>Sistem Pakar ini dirancang untuk 
                        mengetahui tingkat kecanduan seseorang terhadap pornografi. Sistem ini dapat digunakan oleh siapa saja dan bersifat rahasia terhadap hasil diagnosa nya. 
                        Beberapa lngkah sederhana untuk menggunakan sistem ini.
                    </p>
                </Col>
            </Row>
            <Row>
                {cardTexts.map(({title, description, imageUrl}) => (
                    <Col>
                        <CardHowToUse cardTitle={title} cardDescription={description} imageUrl={imageUrl} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
export default HowToUse;