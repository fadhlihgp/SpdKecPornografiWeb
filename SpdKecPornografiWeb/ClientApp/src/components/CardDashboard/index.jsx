import {Card, CardSubtitle, CardTitle, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import './style.css';
const CardDashboard = ({linkUrl, count, title, iconImage}) => {
    return(
            <Card className={'hover-card p-3 my-2'}>
                <Link to={linkUrl} style={{textDecoration: 'none', color: '#11235A'}}>
                    <Row>
                        <Col sm={'8'} className={'text-center'}>
                            <CardTitle>
                                <h4><b>
                                    {count}
                                </b></h4>
                            </CardTitle>
                            <CardSubtitle>
                                {title}
                            </CardSubtitle>
                        </Col>
                        <Col sm={'4'}>
                            <img width={'48px'} src={iconImage} alt={'user'}/>
                        </Col>
                    </Row>
                </Link>
            </Card>
    )
}
export default CardDashboard