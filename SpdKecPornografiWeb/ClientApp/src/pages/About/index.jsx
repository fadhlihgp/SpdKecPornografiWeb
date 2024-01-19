import LayoutDashboard from "../../widget/LayoutDashboard";
import {Col, Container, Row} from "reactstrap";
import instagramIcon from '../../resources/instagram.png';
import linkedinIcon from '../../resources/linkedin.png';
import githubIcon from '../../resources/github.png';
import React, {useState} from "react";

const About = () => {

    const [hoveredIcon, setHoveredIcon] = useState(null);

    const handleMouseEnter = (icon) => {
        setHoveredIcon(icon);
    };

    const handleMouseLeave = () => {
        setHoveredIcon(null);
    };

    const getIconStyle = (icon) => {
        const baseStyle = {
            width: '21px',
            transition: 'transform 0.3s ease',
        };

        if (hoveredIcon === icon) {
            return {
                ...baseStyle,
                transform: 'scale(1.2)',
            };
        }

        return baseStyle;
    };
    
    return(
        <LayoutDashboard>
            <Container>
                <Row>
                    <Col className={'text-center'}>
                        <h2>About App</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            Sistem pakar diagnosa tingkat kecanduan pornografi ini dibuat dengan memiliki maksud dan tujuan serta latar belakang masalah.
                            Sulitnya mendiagnosa tingkatan kecanduan pada seseorang  terhadap pornografi. Kurangnya sumber daya yang didapat untuk memberikan bantuan yang cepat dan akurat dalam mengidentifikasi tingkat kecanduan pornografi. 
                            Serta kurangnya pengetahuan di masyarakat bahwa pentingnya mendeteksi tingkat kecanduan pornografi sejak dini dan bagaimana cara penanganannya.
                            Maka dibuatnya sistem ini tidak hanya untuk penelitian dengan metode tertentu, melainkan untuk membantu permasalah diatas tersebut.
                        </p>
                    </Col>
                </Row>
                <h3>About Me</h3>
                <Row>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h2 style={{color: '#1C4532'}}> Fadhlih Girindra Putra</h2>
                                <ul>
                                    <li>
                                        <strong>Tanggal Lahir:</strong> 17/11/2000
                                    </li>
                                    <li>
                                        <strong>Alamat:</strong> Bekasi
                                    </li>
                                    <li>
                                        <strong>Email:</strong> fadhlihgp@gmail.com
                                    </li>
                                </ul>

                                <h2 style={{color: '#1C4532'}}>Sosial Media</h2>
                                <section className='mb-4'>
                                    <a
                                        href='https://github.com/fadhlihgp'
                                        target='_blank'
                                        onMouseEnter={() => handleMouseEnter('github')}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <img alt={'github'} src={githubIcon} style={getIconStyle('github')} />
                                    </a>
                                    <a
                                        href='https://www.linkedin.com/in/fadhlih-girindra-putra/'
                                        target={'_blank'}
                                        className={'mx-3'}
                                        onMouseEnter={() => handleMouseEnter('linkedin')}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <img alt={'linkedin'} src={linkedinIcon} style={getIconStyle('linkedin')} />
                                    </a>
                                    <a
                                        href='https://instagram.com/fadhlih17'
                                        target={'_blank'}
                                        onMouseEnter={() => handleMouseEnter('instagram')}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <img alt={'instagram'} src={instagramIcon} style={getIconStyle('instagram')} />
                                    </a>
                                </section>
                            </div>
                            <div className="col-md-6">
                                <div className="col">
                                    <h2 style={{color: '#1C4532'}}>Pendidikan</h2>
                                    <div>
                                        <h4>* Universitas Indraprasta</h4>
                                        <div className="ml-3">
                                            <p className="mb-0">2020-Sekarang</p>
                                            <p>Teknik Informatika</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4>* SMK BPS&amp;K II BEKASI</h4>
                                        <div className="ml-3">
                                            <p className="mb-0">2015-2018</p>
                                            <p>Multimedia</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </LayoutDashboard>
    )
}
export default About;