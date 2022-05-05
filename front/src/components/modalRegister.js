import React, {useState} from "react";
import {styled, Box} from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import {Button, MenuItem, TextField} from "@mui/material";
import {addUser} from "../service/userService";
import bcrypt from 'bcryptjs';


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
    width: 300,
    bgcolor: "goldenrod",
    p: 2,
    px: 4,
    pb: 3,
    textAlign: "center"
};
const currencies = [
    {
        value: 1,
        label: "Client",
    },
    {
        value: 2,
        label: "Agent",
    },
];

export default function ModalRegister({handleClose, open}) {

    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        type: 1,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const hashedPassword = bcrypt.hashSync(state.password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up

        if (state.type === 1) {
            const newUser = {
                nume: state.name,
                email: state.email,
                password:hashedPassword,
                tip: "Client",
            };
            const response = await addUser(newUser);
            console.log(response);

            if (response.status >= 200 && response.status < 300) {
                alert("User created successfully!");
                handleClose();
            }
        } else if (state.type === 2) {
            const newUser = {
                nume: state.name,
                email: state.email,
                password:hashedPassword,
                tip: "Agent",
            };
            const response = await addUser(newUser);
            console.log(response);

            if (response.status >= 200 && response.status < 300) {
                alert("User created successfully!");
                handleClose();
            }
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
                        <h1>Register</h1>
                        <br/>
                        <TextField
                            style={{padding: "10px 10px"}}
                            label="Name"
                            required
                            variant="outlined"
                            value={state.name}
                            onChange={(e) => {
                                setState({...state, name: e.target.value});
                            }}
                        />
                        <TextField
                            style={{padding: "10px 10px"}}
                            label="Email"
                            required
                            type="Email"
                            variant="outlined"
                            value={state.email}
                            onChange={(e) => setState({...state, email: e.target.value})}
                        />
                        <TextField
                            style={{padding: "10px 10px"}}
                            label="Password"
                            required
                            type="password"
                            variant="outlined"
                            value={state.password}
                            onChange={(e) => setState({...state, password: e.target.value})}
                        />
                        <TextField
                            style={{padding: "5px 5px", width: "210px"}}
                            select
                            label="Rol"
                            required
                            value={state.type}
                            onChange={(e) => setState({...state, type: e.target.value})}>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button style={{padding: "10px 10px"}}
                                variant="outlined" type="submit">
                            Register
                        </Button>
                    </div>
                </form>
            </Box>
        </StyledModal>
    );
}
