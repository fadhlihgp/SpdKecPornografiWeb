import {useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {Button} from "reactstrap";

const ConfirmDelete = ({handleDelete, handleCancel, show, setShow, textConfirmation}) => {
    const { stateContext, handleFunctionContext } = useContext(GlobalContext);
    const { questionId, questionInput, setQuestionInput, setFetchStatusQuestion } = stateContext;

    return (
        <>
            <MDBModal open={show} setopen={setShow} tabIndex='-1' staticBackdrop className={"modal-dialog-scrollable"}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Konfirmasi hapus data</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={handleDelete}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {textConfirmation}
                        </MDBModalBody>

                        <MDBModalFooter>
                            <Button size={"sm"} color={'secondary'} onClick={handleCancel}>
                                Close
                            </Button>
                            <Button size={"sm"} color='danger' onClick={handleDelete}>Hapus</Button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}
export default ConfirmDelete;