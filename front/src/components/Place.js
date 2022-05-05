import React, {useState} from "react";
import {languageJSON} from "../language";

const Place = ({ description, price, image, id, setOpen, isAgent, setId , language}) => {
    const handleClick = () => {
        setOpen(true);
        setId(id);
    };
    return (
        <div className="card">
            <img src={require("../img/garsoniera/garsoniera6.jpg")} alt="img" style={{width: '100%'}}/>
            <h1>{description}</h1>
            <p className="price">{price + "$"}</p>
            <p>Words</p>
            <p>
                <button>{language === "RO" ? languageJSON.detalii.ro : languageJSON.detalii.en}</button>
                {isAgent &&
                    <div>
                        <hr/>
                        <button onClick={() => handleClick()}>{language === "RO" ? languageJSON.appointment.ro : languageJSON.appointment.en}</button>
                    </div>}
            </p>
        </div>
    );
};

export default Place;
