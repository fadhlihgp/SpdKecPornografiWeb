import {NavMenu} from "../navbar/NavMenu";
import Footer from "../Footer";
import Hero from "../Hero";
import HowToUse from "../HowToUse";

const LandingPage = () => {
    return <div className={"d-flex flex-column"}>
        <NavMenu />
        <div id={'hero'} className={'bg-light'}>
            <Hero />
        </div>
        <div id={'caraPenggunaan'} className={'bg-light'}>
            <HowToUse />
        </div>
        <Footer />
    </div>
}
export default LandingPage;