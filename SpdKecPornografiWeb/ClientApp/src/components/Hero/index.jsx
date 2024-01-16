import {Col, Container, Row} from "reactstrap";
import React from "react";
import HeroTitle from "./HeroTitle";
import spdIcon from "../../resources/spd.png";
import {Navigate, useNavigate} from "react-router-dom";

const Hero = () => {
    return(
        <Container className={"my-5"}>
            <Row>
                <Col>
                    <HeroTitle />
                </Col>
                <Col>
                    <div>
                        <img src={spdIcon} alt={"Sistem Pakar"}/>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default Hero;