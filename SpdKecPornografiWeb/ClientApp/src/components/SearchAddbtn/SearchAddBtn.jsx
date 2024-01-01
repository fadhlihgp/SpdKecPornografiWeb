import {Button, Input} from "reactstrap";
import {useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";

const SearchAddBtn = ({handleAdd, handleSearch, handleOnChange}) => {
    return(
        <div className={"d-flex flex-column gap-2 align-items-end"}>
            <Button 
                className={"w-25"} 
                size={"sm"}
                style={{backgroundColor: "#192655"}}
                onClick={handleAdd}>
                <b>+</b> Tambah
            </Button>
            <div className={"d-flex gap-2"}>
                <Input
                    id="search"
                    name="search"
                    placeholder="search"
                    type="text"
                    onChange={handleOnChange}
                    onClick={handleSearch}
                />
                <Button color={"primary"} size={"sm"}>Cari</Button>
            </div>
        </div>
    )
}
export default SearchAddBtn;