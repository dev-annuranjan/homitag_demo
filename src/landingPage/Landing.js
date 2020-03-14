import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { setLoggedInUserName } from "../store/actions";

export default function Landing({ history }) {

    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = (event) => {
        setName(event.target.value);
    }

    const handleBtnClick = () => {
        if (name) {
            dispatch(setLoggedInUserName(name));
            history.push("/form");
        }
    }

    return (
        <div className="FlexContainer">
            <div className="LandingPage">
              <div className="FormWrapper">
                <div className="FormWrapperHeading">Homitag Demo</div>
                <div className="FormRow">
                    <label htmlFor="name" className="FieldLabel">Please enter your name</label>
                    <input id="name" value={name} onChange={handleInputChange}  className="FieldInput"/>
                </div>
                <div className="SubmitButtonRow">
                    <button className={`${name ? "active" : ""}`} onClick={handleBtnClick}>Proceed</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
