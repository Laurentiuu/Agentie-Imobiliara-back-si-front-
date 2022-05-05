import React, {useEffect, useState} from "react";
import {styled, Box} from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import {getAllAppointments, getAppointments} from "../service/appointmentService";
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, TextField} from "@mui/material";
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    BarSeries,
    Legend,
    Title
} from "@devexpress/dx-react-chart-material-ui";
import {Label} from "reactstrap";
import Place from "./Place";
import {LineSeries} from "@devexpress/dx-react-chart";
import {languageJSON} from "../language";


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
    width: 900,
    bgcolor: "goldenrod",
    p: 2,
    px: 4,
    pb: 3,
    textAlign: "center",
};

export default function ModalApointmens({handleClose, open, placeId, language}) {
    const [appointments, setAppointmensts] = useState([]);
    const [allAppointments, setAllAppointments] = useState([]);

    useEffect(async () => {
        try {
            const response = await getAppointments(placeId);
            console.log(response)
            setAppointmensts(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(async () => {
        try {
            const response = await getAllAppointments(placeId);
            setAllAppointments(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);


    return (
        <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            BackdropComponent={Backdrop}>
            <Box sx={style}>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={7}>
                            <Paper>
                                <Chart data={appointments}>
                                    <ArgumentAxis />
                                    <ValueAxis />
                                    <LineSeries valueField="value" argumentField="argument" />

                                    <Title text={language === "RO" ? languageJSON.appointment.ro : languageJSON.appointment.en} />

                                </Chart>
                            </Paper>
                        </Grid>

                    <Grid item xs={5} style={{marginTop:"100px"}}>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {allAppointments.map((value) => {
                                return (
                                    <Grid item xs={23}>
                                        <b>
                                            {value.name}&nbsp;- &nbsp;{value.date}
                                        </b>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

        </StyledModal>
    );
}
