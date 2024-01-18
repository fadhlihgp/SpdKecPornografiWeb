import React, { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import print from "../../resources/print.png"

function PrintButton({printPdf}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div className="d-flex">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle 
                    size={"sm"} 
                    caret
                    style={{backgroundColor: "#245953"}}>
                    <img src={print} alt={"print"} width={"20px"}/> Cetak
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={printPdf}>Pdf</DropdownItem>
                    {/*<DropdownItem onClick={printExcel}>Excel</DropdownItem>*/}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}


export default PrintButton;