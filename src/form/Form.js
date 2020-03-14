import React, { useState } from 'react'
import MaskedInput from "react-text-mask";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";

import { EmailRegex, PasswordRegex, CountryList } from "../utilities/Utility";

const DEFAULT_SELECT_VALUE = "NONE"
export default function Form() {

    const [state, setState] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ProfilePicture: "",
        PhoneNumber: "",
        Birthday: null,
        Country: DEFAULT_SELECT_VALUE
    })

    const [isTouched, setIsTouched] = useState({
        isFirstNameTouched: false,
        isLastNameTouched: false,
        isEmailTouched: false,
        isPasswordTouched: false,
        isProfilePictureTouched: false,
        isPhoneNumberTouched: false,
        isBirthdayTouched: false,
        isCountryTouched: false
    })

    const [hasError, setHasError] = useState({
        hasFirstNameError: false,
        hasLastNameError: false,
        hasEmailError: false,
        hasPasswordError: false,
        hasProfilePictureError: false,
        hasPhoneNumberError: false,
        hasBirthdayError: false,
        hasCountryError: false
    })

    const inputChangeHandler = event => {
        const { id, value } = event.target;
        setState({ ...state, [id]: value });

        if (isTouched[`is${id}Touched`]) {
            const isFieldValid = validateField(id, value);
            setHasError({ ...hasError, [`has${id}Error`]: !isFieldValid });
        }
    }

    const inputBlurHandler = event => {
        const { id, value } = event.target;
        const isFieldValid = validateField(id, value);
        setIsTouched({ ...isTouched, [`is${id}Touched`]: true });
        setHasError({ ...hasError, [`has${id}Error`]: !isFieldValid });
    }

    const profilePictureHandler = event => {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onload = upload => {
            setState({ ...state, ProfilePicture: upload.target.result });
        };
        reader.readAsDataURL(file);
    }

    const birthdayHandler = event => {
        const expDate = event ? moment(event).format("MM/DD/YYYY") : null;
        setState({ ...state, IdentityVerificationExpirationDate: expDate });
    }

    const validateField = (fieldName, fieldValue) => {
        switch (fieldName) {
            case "Email":
                return EmailRegex.test(fieldValue);
            case "Password":
                return PasswordRegex.test(fieldValue);
            case "FirstName":
            case "LastName":
                return fieldValue.length < 3 ? false : true;
            default:
                return true;
        }
    }

    return (
        <div className="Form">
            <div>
                <label>
                    First name
                </label>
                <input
                    className={`${isTouched.isFirstNameTouched && hasError.hasFirstNameError ? " FieldHasError" : ""}`}
                    id="FirstName"
                    value={state.FirstName}
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler}
                />
                {isTouched.isFirstNameTouched && hasError.hasFirstNameError &&
                    <span>First name should be at least 3 characters long</span>
                }
            </div>

            <div>
                <label>
                    Last name
                </label>
                <input
                    className={`${isTouched.isLastNameTouched && hasError.hasLastNameError ? " FieldHasError" : ""}`}
                    id="LastName"
                    value={state.LastName}
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler}
                />
                {isTouched.isLastNameTouched && hasError.hasLastNameError &&
                    <span>Last name should be at least 3 characters long</span>
                }
            </div>

            <div>
                <label>
                    Email
                </label>
                <input
                    className={`${isTouched.isEmailTouched && hasError.hasEmailError ? " FieldHasError" : ""}`}
                    id="Email"
                    value={state.Email}
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler}
                />
                {isTouched.isEmailTouched && hasError.hasEmailError &&
                    <span> Email is required in a proper format</span>
                }

            </div>

            <div>
                <label>
                    Password
                </label>
                <input
                    className={`${isTouched.isPasswordTouched && hasError.hasPasswordError ? " FieldHasError" : ""}`}
                    id="Password"
                    value={state.Password}
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler}
                />
                {isTouched.isPasswordTouched && hasError.hasPasswordError &&
                    <span>Password need to be at least 8 characters long, have at least 1 uppercase, 1 lowercase and 1 special characters</span>
                }
            </div>

            <div>
                <label>
                    Profile picture
                </label>
                {state.ProfilePicture ?
                    <img src={state.ProfilePicture} />
                    :
                    <input
                        type="file"
                        onChange={profilePictureHandler}
                        encType="multipart/form-data"
                    />
                }
            </div>

            <div>
                <label>
                    Phone number
                </label>
                <MaskedInput
                    mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                    id="PhoneNumber"
                    guide={false}
                    value={state.PhoneNumber}
                    onChange={inputChangeHandler}
                />
            </div>

            <div>
                <label>
                    Birthday
                </label>
                <DatePicker
                    autoOk
                    disableFuture
                    fullWidth
                    clearable
                    format="MM/dd/yyyy"
                    value={state.IdentityVerificationExpirationDate}
                    onChange={birthdayHandler}
                    animateYearScrolling={false}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                    placeholder="Birthday"
                // errortext={expDataInvalidMessage}
                />
            </div>

            <div>
                <label>
                    Country
                </label>
                <select
                    name="Country"
                    id="Country"
                    value={state.Country}
                >
                    <option value={DEFAULT_SELECT_VALUE} selected disabled>{"Select Country"}</option>
                    {Object.keys(CountryList).map(country => <option value={country} key={country}>{CountryList[country]}</option>)}
                </select>
            </div>

            <div >
                <button>Submit Form</button>
            </div>

        </div >
    )
}
