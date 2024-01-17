import React, {useState} from 'react';
import {
    MDBFooter,
} from 'mdb-react-ui-kit';
import instagramIcon from '../../resources/instagram.png';
import linkedinIcon from '../../resources/linkedin.png';
import {Container} from "reactstrap";
import githubIcon from '../../resources/github.png';
export default function Footer() {
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
    return (
        <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
            <Container className='p-4 pb-0'>
                <p style={{color: 'black'}}>Connected with me</p>
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
                        className={'mx-4'}
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
            </Container>

            <div className='text-center p-3 text-black' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                Copyright © 2024 - <span style={{color: '#11235A'}}>Sistem Pakar Diagnosa Tingkat Kecanduan Pornografi</span>
            </div>
        </MDBFooter>
    );
}