import React, {useEffect, useState} from "react";
import './App.css';
import './style.css';
import background from "./img/back.jpg";
import {languageJSON} from "./language";
import {Form} from "reactstrap";
import axios from "axios";

import ModalLogin from "./components/modalLogin";
import ModalRegister from "./components/modalRegister";
import ModalProfile from "./components/modalProfile";
import ModalAddPlace from "./components/modalAddPlace";
import Place from "./components/Place";
import ModalApointmens from "./components/modalApointmens";
import {
    getRentApartments,
    getRentHouses, getRentSingleRooms,
    getSaleApartments,
    getSaleHouses,
    getSaleSingleRooms
} from "./service/placeService";
import {Grid} from "@mui/material";

function App() {

    const [language, setLanguage] = useState(localStorage.getItem("Language"));
    const changeLanguage = (roEn) => {
        if (roEn === "RO") {
            setLanguage("RO");
            window.localStorage.setItem("Language", "RO");
        } else {
            setLanguage("EN");
            window.localStorage.setItem("Language", "EN");
        }
    }

    const [email, setEmail] = useState('');
    const submit = (event) => {
        axios.post(` http://127.0.0.1:5000/sendEmail`, {email: email,})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        event.preventDefault();
    };

    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openAddPlace, setOpenAddPlace] = useState(false);
    const [openAppointments, setOpenAppointments] = useState(false);


    const [saleHouses, setSaleHouses] = useState([]);
    const [saleApartments, setSaleApartments] = useState([]);
    const [saleSingleRooms, setSaleSingleRooms] = useState([]);
    const [rentHouses, setRentHouses] = useState([]);
    const [rentApartments, setRentApartments] = useState([]);
    const [rentSingleRooms, setRentSingleRooms] = useState([]);
    const [placeId, setPlaceId] = useState(0);

    useEffect(async () => {
        try {
            const response = await getSaleHouses();
            setSaleHouses(response.data);
        } catch (error) {
            console.error(error);
        }
        try {
            const response = await getSaleApartments();
            setSaleApartments(response.data);
        } catch (error) {
            console.error(error);
        }
        try {
            const response = await getSaleSingleRooms();
            setSaleSingleRooms(response.data);
        } catch (error) {
            console.error(error);
        }
        try {
            const response = await getRentHouses();
            setRentHouses(response.data);
        } catch (error) {
            console.error(error);
        }
        try {
            const response = await getRentApartments();
            setRentApartments(response.data);
        } catch (error) {
            console.error(error);
        }
        try {
            const response = await getRentSingleRooms();
            setRentSingleRooms(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);


    const [loggedIn, setLoggedIn] = useState(
        window.localStorage.getItem("Active") === "true"
    );

    const [isAgent, setIsAgent] = useState(window.localStorage.getItem("Rol") === "Agent"
    );
    const logOutHandle = () => {
        window.addEventListener("beforeunload", function (e) {
            localStorage.clear();
        }, false);
        setLoggedIn(false);
        window.location.reload(false);
    };


    return (
        <>
            <div style={{backgroundImage: `url(${background})`}}>

                {/*Bara de navighatii*/}
                <div className="navbar">
                    <img style={{float: 'left', paddingLeft: '10px', paddingRight: '10px'}}
                         src={require('./img/logo.png')}
                         width="55px" height="45px" alt="logo"/>
                    <a href="index.html">{language === "RO" ? languageJSON.navbar.acasa.ro : languageJSON.navbar.acasa.en}</a>
                    <a href="#noutati">{language === "RO" ? languageJSON.navbar.noutati.ro : languageJSON.navbar.noutati.en}</a>
                    <div className="subnav">
                        <button
                            className="subnavbtn">{language === "RO" ? languageJSON.navbar.inchirieri.ro : languageJSON.navbar.inchirieri.en}
                            <i className="fa fa-caret-down"/></button>
                        <div className="subnav-content">
                            <a href="#inchiriereGarsoniere">{language === "RO" ? languageJSON.navbar.inchirieri.garsoniere.ro : languageJSON.navbar.inchirieri.garsoniere.en}</a>
                            <a href="#inchiriereApartamente">{language === "RO" ? languageJSON.navbar.inchirieri.apartamente.ro : languageJSON.navbar.inchirieri.apartamente.en}</a>
                            <a href="#inchiriereCase">{language === "RO" ? languageJSON.navbar.inchirieri.case.ro : languageJSON.navbar.inchirieri.case.en}</a>
                        </div>
                    </div>
                    <div className="subnav">
                        <button
                            className="subnavbtn">{language === "RO" ? languageJSON.navbar.vanzari.ro : languageJSON.navbar.vanzari.en}
                            <i className="fa fa-caret-down"/></button>
                        <div className="subnav-content">
                            <a href="#vanzariGarsoniere">{language === "RO" ? languageJSON.navbar.vanzari.garsoniere.ro : languageJSON.navbar.vanzari.garsoniere.en}</a>
                            <a href="#vanzariApartamente">{language === "RO" ? languageJSON.navbar.vanzari.apartamente.ro : languageJSON.navbar.vanzari.apartamente.en}</a>
                            <a href="#vanzariCase">{language === "RO" ? languageJSON.navbar.vanzari.case.ro : languageJSON.navbar.vanzari.case.en}</a>
                        </div>
                    </div>

                    <a href="#despreNoi">{language === "RO" ? languageJSON.navbar.despreNoi.ro : languageJSON.navbar.despreNoi.en}</a>
                    <a href="#contact">{language === "RO" ? languageJSON.navbar.contact.ro : languageJSON.navbar.contact.en}</a>

                    <div style={{float: 'right', padding: '12px'}}>
                        <button className="RObtn" onClick={() => changeLanguage("RO")}>RO <i
                            className="fa fa-caret-down"/>
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="ENbtn" onClick={() => changeLanguage("EN")}>EN <i
                            className="fa fa-caret-down"/>
                        </button>
                    </div>
                    <div style={{float: 'right'}}>
                        {loggedIn && (<a onClick={() => setOpenProfile(true)}>
                            {language === "RO" ? languageJSON.navbar.profile.ro : languageJSON.navbar.profile.en}</a>)}
                        {isAgent && (<a onClick={() => setOpenAddPlace(true)}>
                            {language === "RO" ? languageJSON.navbar.addPlace.ro : languageJSON.navbar.addPlace.en}</a>)}
                        {loggedIn && (<a onClick={() => logOutHandle(true)}>
                            {language === "RO" ? languageJSON.navbar.logOut.ro : languageJSON.navbar.logOut.en}</a>)}

                        {!loggedIn && <a onClick={() => setOpenLogin(true)}>
                            {language === "RO" ? languageJSON.navbar.login.ro : languageJSON.navbar.login.en}</a>}
                        {!loggedIn && <a onClick={() => setOpenRegister(true)}>
                            {language === "RO" ? languageJSON.navbar.register.ro : languageJSON.navbar.register.en}</a>}
                    </div>
                </div>

                {/*Header*/}
                <header>
                    <img style={{boxShadow: '0 2px 5px 0 rgb(0 0 0 / 0%), 0 2px 10px 0 rgb(0 0 0 / 50%)'}}
                         className="javaImg" src={require("./img/startPhoto.jpg")} width="100%" height="500px"
                         alt="img"/>
                    <h1 style={{textAlign: 'center', fontFamily: 'Times, serif', fontSize: '90px', color: 'black'}}>
                        {language === "RO" ? languageJSON.header.h1.ro : languageJSON.header.h1.en}
                    </h1>
                    <h1 style={{textAlign: 'center', fontFamily: 'Times, serif', fontSize: '90px', color: 'black'}}>
                        {language === "RO" ? languageJSON.header.h2.ro : languageJSON.header.h2.en}
                    </h1>
                    <h1 style={{textAlign: 'center', fontFamily: 'Times, serif', fontSize: '90px', color: 'black'}}>
                        {language === "RO" ? languageJSON.header.h3.ro : languageJSON.header.h3.en}
                    </h1>
                    <div>
                        <h4 style={{padding: '30px 40px', textAlign: 'center', fontSize: '30px'}}>
                            {language === "RO" ? languageJSON.header.h4.ro : languageJSON.header.h4.en}</h4>
                    </div>
                </header>

                {/*Cele mai vizionate*/}
                <div style={{backgroundColor: 'goldenrod', padding: '30px 100px'}}>
                    <h3 className="sailecFont" style={{fontSize: '35px', padding: '10px 10px', textAlign: 'center'}}>
                        {language === "RO" ? languageJSON.celeMaiVizionate.ro : languageJSON.celeMaiVizionate.en}
                    </h3>
                    <br/>
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 4, md: 12}}>
                        <div className="card">
                            <img src={require("./img/garsoniera/garsoniera5.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.card1.ro : languageJSON.card1.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.card1.about.ro : languageJSON.card1.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.card1.details.ro : languageJSON.card1.details.en}</button>
                            </p>
                        </div>
                        <div className="card">
                            <img src={require("./img/garsoniera/garsoniera3.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.card2.ro : languageJSON.card2.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.card2.about.ro : languageJSON.card2.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.card2.details.ro : languageJSON.card2.details.en}</button>
                            </p>
                        </div>
                        <div className="card">
                            <img src={require("./img/garsoniera/garsoniera2.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.card3.ro : languageJSON.card3.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.card3.about.ro : languageJSON.card3.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.card3.details.ro : languageJSON.card3.details.en}</button>
                            </p>
                        </div>
                    </Grid>
                </div>

                {/*Noutati*/}
                <div style={{backgroundColor: 'gray', padding: '30px 100px'}}>
                    <a id="noutati"/><br/>
                    <br/>
                    <br/>
                    <br/>
                    <h1 className="sailecFont" style={{fontSize: '35px', padding: '10px 10px', textAlign: 'center'}}>
                        {language === "RO" ? languageJSON.noutati.ro : languageJSON.noutati.en}</h1>
                    <div style={{display: 'flex'}}>
                        <div style={{paddingRight: '20%'}}>
                            <h2>{language === "RO" ? languageJSON.noutati.garsoniera.ro : languageJSON.noutati.garsoniera.en}</h2>
                            <p>
                                {language === "RO" ? languageJSON.noutati.garsoniera.details.ro : languageJSON.noutati.garsoniera.details.en}
                            </p>
                        </div>
                        <div className="card">
                            <img src={require("./img/garsoniera/garsoniera1.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.garsoniera.ro : languageJSON.garsoniera.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.garsoniera.about.ro : languageJSON.garsoniera.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.garsoniera.details.ro : languageJSON.garsoniera.details.en}</button>
                            </p>
                        </div>
                    </div>
                    <br/><br/>
                    <div style={{display: 'flex'}}>
                        <div style={{paddingRight: '20%'}}>
                            <h2>{language === "RO" ? languageJSON.noutati.apartament.ro : languageJSON.noutati.apartament.en}</h2>
                            <p>
                                {language === "RO" ? languageJSON.noutati.apartament.details.ro : languageJSON.noutati.apartament.details.en}
                            </p>
                        </div>
                        <div className="card">
                            <img src={require("./img/apartament/apartament1.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.apartament.ro : languageJSON.apartament.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.apartament.about.ro : languageJSON.apartament.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.apartament.details.ro : languageJSON.apartament.details.en}</button>
                            </p>
                        </div>
                    </div>
                    <br/><br/>
                    <div style={{display: 'flex'}}>
                        <div style={{paddingRight: '20%'}}>
                            <h2>{language === "RO" ? languageJSON.noutati.casa.ro : languageJSON.noutati.casa.en}</h2>
                            <p>
                                {language === "RO" ? languageJSON.noutati.casa.details.ro : languageJSON.noutati.casa.details.en}
                            </p>
                        </div>
                        <div className="card">
                            <img src={require("./img/casa/casa1.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.casa.ro : languageJSON.casa.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.casa.about.ro : languageJSON.casa.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.casa.details.ro : languageJSON.casa.details.en}</button>
                            </p>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <h2> {language === "RO" ? languageJSON.noutati.ultimeleGarsoniere.ro : languageJSON.noutati.ultimeleGarsoniere.en}</h2>
                    <div style={{display: 'flex'}}>
                        <div className="card">
                            <img src={require("./img/garsoniera/garsoniera2.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.card1.ro : languageJSON.card1.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.card1.about.ro : languageJSON.card1.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.card1.details.ro : languageJSON.card1.details.en}</button>
                            </p>
                        </div>
                        <div className="card">
                            <img src={require("./img/garsoniera/garsoniera3.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.card2.ro : languageJSON.card2.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.card2.about.ro : languageJSON.card2.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.card2.details.ro : languageJSON.card2.details.en}</button>
                            </p>
                        </div>
                        <div className="card">
                            <img src={require("./img/garsoniera/garsoniera4.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.card3.ro : languageJSON.card3.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.card3.about.ro : languageJSON.card3.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.card3.details.ro : languageJSON.card3.details.en}</button>
                            </p>
                        </div>
                    </div>
                    <br/>
                    <h2>{language === "RO" ? languageJSON.noutati.ultimeleApartamente.ro : languageJSON.noutati.ultimeleApartamente.en}</h2>
                    <div style={{display: 'flex'}}>
                        <div className="card">
                            <img src={require("./img/apartament/apartament1.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.apartament.ro : languageJSON.apartament.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.apartament.about.ro : languageJSON.apartament.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.apartament.details.ro : languageJSON.apartament.details.en}</button>
                            </p>
                        </div>
                        <div className="card">
                            <img src={require("./img/apartament/apartament2.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.apartament.ro : languageJSON.apartament.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.apartament.about.ro : languageJSON.apartament.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.apartament.details.ro : languageJSON.apartament.details.en}</button>
                            </p>
                        </div>
                        <div className="card">
                            <img src={require("./img/apartament/apartament3.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.apartament.ro : languageJSON.apartament.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.apartament.about.ro : languageJSON.apartament.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.apartament.details.ro : languageJSON.apartament.details.en}</button>
                            </p>
                        </div>
                    </div>
                    <br/>
                    <h2>{language === "RO" ? languageJSON.noutati.ultimeleCase.ro : languageJSON.noutati.ultimeleCase.en}</h2>
                    <div style={{display: 'flex'}}>
                        <div className="card">
                            <img src={require("./img/casa/casa1.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.casa.ro : languageJSON.casa.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.casa.about.ro : languageJSON.casa.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.casa.details.ro : languageJSON.casa.details.en}</button>
                            </p>
                        </div>
                        <div className="card">
                            <img src={require("./img/casa/casa2.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.casa.ro : languageJSON.casa.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.casa.about.ro : languageJSON.casa.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.casa.details.ro : languageJSON.casa.details.en}</button>
                            </p>
                        </div>
                        <div className="card">
                            <img src={require("./img/casa/casa3.jpg")} alt="img" style={{width: '100%'}}/>
                            <h1>{language === "RO" ? languageJSON.casa.ro : languageJSON.casa.en}</h1>
                            <p className="price">$4.20</p>
                            <p>{language === "RO" ? languageJSON.casa.about.ro : languageJSON.casa.about.en}</p>
                            <p>
                                <button>{language === "RO" ? languageJSON.casa.details.ro : languageJSON.casa.details.en}</button>
                            </p>
                        </div>
                    </div>
                </div>

                {/*Inchirieri*/}
                <div style={{backgroundColor: 'goldenrod', padding: '30px 100px', textAlign: 'center'}}>
                    <a id="inchiriereGarsoniere"/><br/>
                    <br/><br/><br/>
                    <h1 style={{fontSize: '35px', padding: '10px 10px', textAlign: 'center'}}>
                        {language === "RO" ? languageJSON.inchirieri.ro : languageJSON.inchirieri.en}</h1>
                    <h2>{language === "RO" ? languageJSON.inchirieri.garsoniere.ro : languageJSON.inchirieri.garsoniere.en}</h2>
                    <br/><br/>
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                        {rentSingleRooms.map((value) => {
                            return (
                                <Place
                                    description={value.description}
                                    price={value.price}
                                    image={value.image}
                                    id={value.id}
                                    isAgent={isAgent}
                                    setOpen={setOpenAppointments}
                                    setId={setPlaceId}
                                    language={language}
                                />
                            );
                        })}
                    </Grid>
                    <a id="inchiriereApartamente"/>
                    <br/><br/><br/><br/><br/>
                    <h2>{language === "RO" ? languageJSON.inchirieri.apartament.ro : languageJSON.inchirieri.apartament.en}</h2>
                    <br/><br/>
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                        {rentApartments.map((value) => {
                            return (
                                <Place
                                    description={value.description}
                                    price={value.price}
                                    image={value.image}
                                    id={value.id}
                                    isAgent={isAgent}
                                    setOpen={setOpenAppointments}
                                    setId={setPlaceId}
                                    language={language}
                                />
                            );
                        })}
                    </Grid>
                    <a id="inchiriereCase"/>
                    <br/><br/><br/><br/><br/>
                    <h2>{language === "RO" ? languageJSON.inchirieri.casa.ro : languageJSON.inchirieri.casa.en}</h2>
                    <br/><br/>
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                        {rentHouses.map((value) => {
                            return (
                                <Place
                                    description={value.description}
                                    price={value.price}
                                    image={value.image}
                                    id={value.id}
                                    isAgent={isAgent}
                                    setOpen={setOpenAppointments}
                                    setId={setPlaceId}
                                    language={language}
                                />
                            );
                        })}
                    </Grid>
                </div>

                {/*Vanzari*/}
                <div style={{backgroundColor: 'gray', padding: '30px 150px', textAlign: 'center'}}>
                    <a id="vanzariGarsoniere"/>
                    <br/><br/><br/><br/><br/>
                    <h1 style={{fontSize: '35px', padding: '10px 10px', textAlign: 'center'}}>
                        {language === "RO" ? languageJSON.vanzari.ro : languageJSON.vanzari.en}</h1>
                    <h2>{language === "RO" ? languageJSON.vanzari.garsoniere.ro : languageJSON.vanzari.garsoniere.en}</h2>
                    <br/><br/>
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                        {saleSingleRooms.map((value) => {
                            return (
                                <Place
                                    description={value.description}
                                    price={value.price}
                                    image={value.image}
                                    id={value.id}
                                    isAgent={isAgent}
                                    setOpen={setOpenAppointments}
                                    setId={setPlaceId}
                                    language={language}
                                />
                            );
                        })}
                    </Grid>
                    <a id="vanzariApartamente"/>
                    <br/><br/><br/><br/><br/>
                    <h2>{language === "RO" ? languageJSON.vanzari.apartament.ro : languageJSON.vanzari.apartament.en}</h2>
                    <br/><br/>
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                        {saleApartments.map((value) => {
                            return (
                                <Place
                                    description={value.description}
                                    price={value.price}
                                    image={value.image}
                                    id={value.id}
                                    isAgent={isAgent}
                                    setOpen={setOpenAppointments}
                                    setId={setPlaceId}
                                    language={language}
                                />
                            );
                        })}
                    </Grid>
                    <a id="vanzariCase"/>
                    <br/><br/><br/><br/><br/>
                    <h2><a
                        id="vanzariCase"/>{language === "RO" ? languageJSON.vanzari.casa.ro : languageJSON.vanzari.casa.en}
                    </h2>
                    <br/><br/>
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                        {saleHouses.map((value) => {
                            return (
                                <Place
                                    description={value.description}
                                    price={value.price}
                                    image={value.image}
                                    id={value.id}
                                    isAgent={isAgent}
                                    setOpen={setOpenAppointments}
                                    setId={setPlaceId}
                                    language={language}
                                />
                            );
                        })}
                    </Grid>
                </div>

                {/*Despre Noi*/}
                <div style={{backgroundColor: 'goldenrod', padding: '30px 150px'}}>
                    <a id="despreNoi"/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h1 className="sailecFont" style={{fontSize: '35px', padding: '10px 10px', textAlign: 'center'}}>
                        {language === "RO" ? languageJSON.despreNoi.ro : languageJSON.despreNoi.en}</h1>
                    <div style={{display: 'flex'}}>
                        <div style={{paddingRight: '20%'}}>
                            <h2> {language === "RO" ? languageJSON.despreNoi.h1.ro : languageJSON.despreNoi.h1.en}</h2>
                            <p>
                                {language === "RO" ? languageJSON.despreNoi.h2.ro : languageJSON.despreNoi.h2.en}
                            </p>
                            <p>
                                {language === "RO" ? languageJSON.despreNoi.h3.ro : languageJSON.despreNoi.h3.en}
                            </p>
                        </div>
                        <img src={require("./img/img1.png")} alt="img" width="400px" height/>
                    </div>
                    <br/> <br/>
                    <br/>
                    <div style={{textAlign: 'center'}}>
                        <iframe width={700} height={400} src="https://www.youtube.com/embed/e0WOBR6__l0"
                                title="YouTube video player" frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                    </div>
                </div>

                {/*Contact*/}
                <div style={{backgroundColor: 'gray', padding: '30px 150px', textAlign: 'center'}}>
                    <a id="contact"/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h1 style={{fontSize: '35px', padding: '10px 10px', textAlign: 'center'}}>
                        {language === "RO" ? languageJSON.contact.ro : languageJSON.contact.en}</h1>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21860.759011663897!2d23.50733997556141!3d46.772881364830496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490f0099e46ca1%3A0x4d4b2f4e56f76c0!2sHoia%20Forest!5e0!3m2!1sen!2sro!4v1646585628956!5m2!1sen!2sro"
                            width={700} height={450} style={{border: 0}} allowFullScreen loading="lazy"/>
                    </div>
                    <h2 style={{
                        padding: '10px 10px',
                        textAlign: 'center'
                    }}>{language === "RO" ? languageJSON.contact.email.ro : languageJSON.contact.email.en}</h2>
                    <p style={{textAlign: 'center', fontSize: '20px'}}>
                        <strong>Yahoo: </strong><a
                        href="mailto:chiriePentruChirie@yahoo.com">chiriePentruChirie@yahoo.ro</a><br/>
                        <strong>Gmail: </strong><a
                        href="mailto:chiriePentruChirie@gmail.com">chiriePentruChirie@gmail.com</a><br/>
                        <strong>Outlook: </strong><a
                        href="mailto:chiriePentruChirie@service.com">chiriePentruChirie@service.com</a><br/>
                        <strong>iCloud : </strong><a
                        href="mailto:chiriePentruChirie@icloud.com">chiriePentruChirie@icloud.com</a><br/><br/>

                        <Form className="my-4">
                            <input type="text" placeholder="YourEmail@example.com" value={email} onChange={(event) => {
                                setEmail(event.target.value);
                            }}/>
                            <button onClick={(event) => submit(event)}>Contact</button>
                        </Form>
                        <br/>
                        <a href="termeniSiConditii.html"
                           style={{textDecoration: 'underline', fontSize: '30px'}}><strong>
                            {language === "RO" ? languageJSON.contact.terms.ro : languageJSON.contact.terms.en}
                        </strong></a><br/>
                    </p>
                </div>

                {/*Footer*/}
                <footer>
                    <a href="https://www.facebook.com/" target="_blank"><img src={require("./img/img11.png")}
                                                                             width="20px"
                                                                             height="30px" alt="img"/></a>
                    &nbsp;&nbsp;&nbsp;
                    <a href="https://www.linkedin.com/in/laurentiu-galis/" target="_blank"><img
                        src={require("./img/img12.png")} width="30px" height="30px" alt="img"/></a>
                    &nbsp;&nbsp;&nbsp;
                    <a href="https://twitter.com/" target="_blank"><img src={require("./img/img13.png")} width="30px"
                                                                        height="30px" alt="img"/></a>
                    &nbsp;&nbsp;&nbsp;
                    <a href="https://www.youtube.com/" target="_blank"><img src={require("./img/img14.png")}
                                                                            width="40px"
                                                                            height="30px" alt="img"/></a>
                    <br/>
                    <p style={{float: 'left', fontSize: '10px', marginTop: '30px'}}>©copyright 2021
                        chiriePentruChirie.ro</p>
                </footer>

            </div>

            {/*Modalele*/}
            {openLogin && (
                <ModalLogin
                    open={openLogin}
                    handleClose={() => setOpenLogin(false)}
                    handleSetLogin={setLoggedIn}
                    handleSetIsAgent={setIsAgent}
                />
            )}

            {openRegister && (
                <ModalRegister
                    open={openRegister}
                    handleClose={() => setOpenRegister(false)}
                />
            )}
            {openProfile && (
                <ModalProfile
                    open={openProfile}
                    handleClose={() => setOpenProfile(false)}
                />
            )}
            {openAddPlace && (
                <ModalAddPlace
                    open={openAddPlace}
                    handleClose={() => setOpenAddPlace(false)}
                />
            )}

            {openAppointments && (
                <ModalApointmens
                    open={openAppointments}
                    handleClose={() => setOpenAppointments(false)}
                    language={language}
                    placeId={placeId}
                />
            )}

        </>
    );
}

export default App;
