import {Button, Input} from "reactstrap";

const SearchAddBtn = ({handleAdd, handleSearch, handleOnChange, handleReset, searchFormValue}) => {
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
                    value={searchFormValue}
                    onChange={handleOnChange}
                />
                <Button color={"primary"} size={"sm"} onClick={handleSearch}>Cari</Button>
                <Button color={"primary"} outline size={"sm"} onClick={handleReset}>Reset</Button>
            </div>
        </div>
    )
}
export default SearchAddBtn;