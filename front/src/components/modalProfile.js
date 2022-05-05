import React, {useState} from "react";
import {styled, Box} from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {Label} from "reactstrap";
import bcrypt from "bcryptjs";
import {updateFavorites, updateUser} from "../service/userService";


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
};


export default function ModalProfile({handleClose, open}) {

    const [state, setState] = useState({
        name: "",
        email: "",
        password1: "",
        password2: "",
        type: "",
    });

    const [editProfile, setEditProfile] = useState(false);


    const [isChecked1, setIsChecked1] = useState(window.localStorage.getItem("Garsoniera") === "true"
    );
    const [isChecked2, setIsChecked2] = useState(window.localStorage.getItem("Apartament") === "true"
    );
    const [isChecked3, setIsChecked3] = useState(window.localStorage.getItem("Casa") === "true"
    );


    const handleChange1 = () => {
        if (window.localStorage.getItem("Garsoniera") === "true") {
            window.localStorage.setItem("Garsoniera", "false");
        } else {
            window.localStorage.setItem("Garsoniera", "true");
        }
        setIsChecked1(!isChecked1);
    };
    const handleChange2 = () => {
        if (window.localStorage.getItem("Apartament") === "true") {
            window.localStorage.setItem("Apartament", "false");
        } else {
            window.localStorage.setItem("Apartament", "true");
        }
        setIsChecked2(!isChecked2);
    };
    const handleChange3 = () => {
        if (window.localStorage.getItem("Casa") === "true") {
            window.localStorage.setItem("Casa", "false");
        } else {
            window.localStorage.setItem("Casa", "true");
        }
        setIsChecked3(!isChecked3);
    };

    const handleSave = async () => {
        if (state.password1 === state.password2) {
            const hashedPassword = bcrypt.hashSync(state.password1, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up
            var favourite = "";
            if (window.localStorage.getItem("Garsoniera") === "true") {
                favourite += "Garsoniera ";
            }
            if (window.localStorage.getItem("Apartament") === "true") {
                favourite += "Apartament ";
            }
            if (window.localStorage.getItem("Casa") === "true") {
                favourite += "Casa ";
            }

            const updatedUser = {
                id: window.localStorage.getItem("Id"),
                nume: state.name,
                email: state.email,
                password: hashedPassword,
                tip: window.localStorage.getItem("Rol"),
                fav: favourite
            };
            const response = await updateUser(updatedUser);
            console.log(response);

            if (response.status >= 200 && response.status < 300) {
                alert("User updated successfully!");
                handleClose();
            }
        } else {
            alert("Parolele nu sunt la fel");
        }
    }


    const handleBack = async () => {
        setEditProfile(false);
        var favourite = "";
        if (window.localStorage.getItem("Garsoniera") === "true") {
            favourite += "Garsoniera ";
        }
        if (window.localStorage.getItem("Apartament") === "true") {
            favourite += "Apartament ";
        }
        if (window.localStorage.getItem("Casa") === "true") {
            favourite += "Casa ";
        }

        const updatedUser = {
            id: window.localStorage.getItem("Id"),
            nume: state.name,
            email: state.email,
            password: state.password1,
            tip: window.localStorage.getItem("Rol"),
            fav: favourite
        };
        const response = await updateFavorites(updatedUser);
        console.log(response);
    }

    return (
        <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            BackdropComponent={Backdrop}>
            <Box sx={style}>
                <div className="modal modal-register">
                    <div style={{textAlign: "center"}}>
                        <img style={{float: 'left', paddingLeft: '10px', paddingRight: '10px'}}
                             src={require('../img/profile.png')}
                             width="150px" height="150px" alt="logo"/>
                        <br/><br/>
                        <h1>Profile</h1>
                    </div>
                    <br/><br/><br/>
                    {!editProfile && (
                        <div>
                            <div style={{float: "left", width: "100%"}}>
                                <Label
                                    style={{padding: "10px 10px"}}>
                                    Nume: {localStorage.getItem("Nume")}
                                </Label>
                                <br/><br/>
                                <Label style={{padding: "10px 10px"}}>
                                    Email: {localStorage.getItem("Email")}
                                </Label>
                                <br/><br/>
                                <Label style={{padding: "10px 10px"}}>
                                    Rol: {localStorage.getItem("Rol")}
                                </Label><br/><br/>
                            </div>
                            <div style={{textAlign: "center"}}>
                                <FormGroup style={{display: "inline-flex"}}>
                                    <FormControlLabel disabled control={<Checkbox defaultChecked/>}
                                                      checked={isChecked1}
                                                      onChange={handleChange1}
                                                      label="Garsonere"/>
                                    <FormControlLabel disabled control={<Checkbox defaultChecked/>}
                                                      checked={isChecked2}
                                                      onChange={handleChange2}
                                                      label="Apartamente"/>
                                    <FormControlLabel disabled control={<Checkbox defaultChecked/>}
                                                      checked={isChecked3}
                                                      onChange={handleChange3}
                                                      label="Case"/>
                                </FormGroup>
                            </div>
                            <br/>
                            <Button style={{padding: "10px 10px"}}
                                    variant="outlined" type="submit" onClick={() => setEditProfile(true)}>
                                Edit Profile
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button style={{padding: "10px 10px"}}
                                    variant="outlined" type="submit" onClick={() => handleClose()}>
                                Close
                            </Button>
                            <br/><br/>
                        </div>
                    )}
                    {editProfile && (
                        <div>
                            <TextField
                                style={{padding: "10px 10px"}}
                                label="Name"
                                required
                                variant="outlined"
                                placeholder={localStorage.getItem("Nume")}
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
                                placeholder={localStorage.getItem("Email")}
                                value={state.email}
                                onChange={(e) =>
                                    setState({...state, email: e.target.value})}
                            />
                            <TextField
                                style={{padding: "10px 10px"}}
                                label="Password"
                                required
                                type="password"
                                variant="outlined"
                                value={state.password1}
                                onChange={(e) =>
                                    setState({...state, password1: e.target.value})}
                            />
                            <TextField
                                style={{padding: "10px 10px"}}
                                label="Confirm Password"
                                required
                                type="password"
                                variant="outlined"
                                value={state.password2}
                                onChange={(e) =>
                                    setState({...state, password2: e.target.value})}
                            />
                            <br/>
                            <div style={{textAlign: "center"}}>
                                <FormGroup style={{display: "inline-flex"}}>
                                    <FormControlLabel control={<Checkbox defaultChecked/>}
                                                      checked={isChecked1}
                                                      onChange={handleChange1}
                                                      label="Garsonere"/>
                                    <FormControlLabel control={<Checkbox defaultChecked/>}
                                                      checked={isChecked2}
                                                      onChange={handleChange2}
                                                      label="Apartamente"/>
                                    <FormControlLabel control={<Checkbox defaultChecked/>}
                                                      checked={isChecked3}
                                                      onChange={handleChange3}
                                                      label="Case"/>
                                </FormGroup>
                            </div>
                            <br/>
                            <Button style={{padding: "10px 10px"}}
                                    variant="outlined" onClick={() => handleSave()}>
                                Save
                            </Button>&nbsp;&nbsp;&nbsp;
                            <Button style={{padding: "10px 10px"}}
                                    variant="outlined" onClick={() => handleBack()}>
                                Back
                            </Button>&nbsp;&nbsp;&nbsp;
                            <Button style={{padding: "10px 10px"}}
                                    variant="outlined" onClick={() => handleClose()}>
                                Close
                            </Button>
                        </div>)}
                </div>
            </Box>
        </StyledModal>
    );
}
