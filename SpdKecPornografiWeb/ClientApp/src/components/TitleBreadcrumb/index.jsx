import {Col, Row} from "reactstrap";
import BreadcrumbComponent from "../BreadcrumpComponent";

const TitleBreadcrumb = ({title, paths}) => {
    return (
        <>
            <Row className={"mb-3"}>
                <Col><h4><b>{title}</b></h4></Col>
            </Row>
            <Row>
            <Col>
                <BreadcrumbComponent paths={paths} />
            </Col>
            </Row>
        </>
    )
}

export default TitleBreadcrumb