import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";

const CardHowToUse = ({cardTitle, cardDescription, imageUrl}) => {
    return(
        <Card
            style={{
                width: '18rem',
                height: '28rem',
                backgroundColor: 'white'
            }}
        >
            <img
                alt="picture"
                src={imageUrl}
                width={"164px"}
                className={"m-auto"}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {cardTitle}
                </CardTitle>
                <CardText>
                    {cardDescription}
                </CardText>
            </CardBody>
        </Card>
    )
}
export default CardHowToUse;