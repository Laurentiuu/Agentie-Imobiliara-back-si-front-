import React, {useState} from "react";
import {styled, Box} from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import {Button, TextField} from "@mui/material";
import {getAllUsers} from "../service/userService";
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
    width: 400,
    bgcolor: "goldenrod",
    p: 2,
    px: 4,
    pb: 3,
    textAlign: "center"
};

export default function ModalLogin({handleClose, open, handleSetLogin, handleSetIsAgent}) {
    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async () => {
        const response = await getAllUsers();

        if (response.status >= 200 && response.status < 300) {
            const {data} = response;
            // console.log("data", data);
            const user = [...data].find(
                (item) => item.email === state.email && bcrypt.compareSync(state.password, item.password)
            );
            console.log("user:", user);
            if (user) {
                handleSetLogin(true);
                alert("Login successfully!");
                window.localStorage.setItem("Active", true);
                window.localStorage.setItem("Rol", user.tip);
                window.localStorage.setItem("Nume", user.nume);
                window.localStorage.setItem("Email", user.email);
                window.localStorage.setItem("Id", user.id);

                if (user.fav == null) {
                    window.localStorage.setItem("Garsoniera", "false");
                    window.localStorage.setItem("Apartament", "false");
                    window.localStorage.setItem("Casa", "false");
                } else {
                    if (user.fav.includes("Garsoniera")) {
                        window.localStorage.setItem("Garsoniera", "true");
                    }
                    if (user.fav.includes("Apartament")) {
                        window.localStorage.setItem("Apartament", "true");
                    }
                    if (user.fav.includes("Casa")) {
                        window.localStorage.setItem("Casa", "true");
                    }
                }

                if(window.localStorage.getItem("Rol") === "Agent"){
                    handleSetIsAgent(true);
                }else{
                    handleSetIsAgent(false);
                }

                handleClose();
            } else {
                alert("Login failed!");
                setState({...state, password: ""});
            }
        } else {
            alert("Nu merge serverul!");
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
                <div className="modal modal-login">
                    <h1>Login</h1>
                    <br/>
                    <TextField style={{padding: "10px 10px"}}
                               label="Email"
                               required
                               type="Email"
                               variant="outlined"
                               value={state.email}
                               onChange={(e) => setState({...state, email: e.target.value})}
                    />
                    <TextField style={{padding: "10px 10px"}}
                               label="Password"
                               required
                               type="password"
                               variant="outlined"
                               value={state.password}
                               onChange={(e) => setState({...state, password: e.target.value})}
                    />

                </div>
                <Button variant="outlined" onClick={() => handleLogin()}>
                    Login
                </Button>
            </Box>
        </StyledModal>
    );
}
