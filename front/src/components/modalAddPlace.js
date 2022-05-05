import React, {useState} from "react";
import {styled, Box} from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import {Button, MenuItem, TextField} from "@mui/material";
import {savePlace} from "../service/placeService";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.08);
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: 500,
    bgcolor: "goldenrod",
    p: 2,
    px: 4,
    pb: 3,
    textAlign: "center"
};
const reentSale = [
    {
        value: 1,
        label: "Rent",
    },
    {
        value: 2,
        label: "Sale",
    },
];
const tyype = [
    {
        value: 1,
        label: "Single Room",
    },
    {
        value: 2,
        label: "Apartment",
    },
    {
        value: 3,
        label: "House",
    },
];

export default function ModalAddPlace({handleClose, open}) {

    const [state, setState] = useState({
        description: "",
        type: "",
        rentSale: "",
        price: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPlace = {
            description: state.description,
            type: state.type,
            rentSale: state.rentSale,
            price: Number.parseFloat(state.price),
            image: '/img/garsoniera/garsoniera1.jpg'
        };
        console.log(newPlace);

        const response = await savePlace(newPlace);
        console.log(response);

        if (response.status >= 200 && response.status < 300) {
            handleClose();
            window.location.reload(false);

        }
    };

    return (
        <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            BackdropComponent={Backdrop}>
            <Box sx={style}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="modal modal-register">
                        <h1>Add Place</h1>
                        <br/>
                        <TextField
                            style={{padding: "5px 5px", width: "210px"}}
                            label="Description"
                            required
                            variant="outlined"
                            value={state.description}
                            onChange={(e) => {
                                setState({...state, description: e.target.value});
                            }}
                        />
                        <TextField
                            style={{padding: "5px 5px", width: "210px"}}
                            label="Price"
                            required
                            variant="outlined"
                            value={state.price}
                            onChange={(e) => {
                                setState({...state, price: e.target.value});
                            }}
                        />
                        <br/><br/>
                        <TextField
                            style={{padding: "5px 5px", width: "210px"}}
                            select
                            label="Type"
                            required
                            value={state.type}
                            onChange={(e) => setState({...state, type: e.target.value})}>
                            {tyype.map((option) => (
                                <MenuItem key={option.value} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            style={{padding: "5px 5px", width: "210px"}}
                            select
                            label="Rent/Sale"
                            required
                            value={state.rentSale}
                            onChange={(e) => setState({...state, rentSale: e.target.value})}>
                            {reentSale.map((option) => (
                                <MenuItem key={option.value} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br/><br/>
                        <Button style={{padding: "10px 10px"}}
                                variant="outlined" type="submit">
                            Add
                        </Button>
                    </div>
                </form>
            </Box>
        </StyledModal>
    );
}
