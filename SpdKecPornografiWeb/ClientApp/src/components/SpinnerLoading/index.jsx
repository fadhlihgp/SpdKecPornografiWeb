import {Spinner} from "reactstrap";

const SpinnerLoading = ({text = "Loading"}) => {
    return(
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 9999, display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", margin: 0 }}>
            <Spinner style={{ position: "absolute", top: "50%"}} />
            <div style={{ position: "absolute", top: "55%", color:"white"}} >{text}</div>
        </div>
    );
};
export default SpinnerLoading;
