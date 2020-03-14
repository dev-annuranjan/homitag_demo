import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MaskedInput from "react-text-mask";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";

import { EmailRegex, PasswordRegex, CountryList } from "../utilities/Utility";
import CloseIcon from "../assets/images/close.svg";

const DEFAULT_SELECT_VALUE = "NONE"
export default function Form({ history }) {

    const userName = useSelector(state => state.loggedInUserName);
    const [showAlert, setShowAlert] = useState(false)

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

    const removeProfileImage = () => {
        setState({ ...state, ProfilePicture: "" });
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

    const submitForm = () => {
        setShowAlert(true);
    }

    const alertBtnHandler = () => {
        setShowAlert(false);
        history.push("/");
    }

    return (
        <div className="Form">
            {/* Alert */}
            {showAlert &&
                <div className="AlertModal">
                    <div className="AlertDialogue">
                        <h3>Registration successfully</h3>
                        <p>You have successfully registered with us.</p>
                        <button onClick={alertBtnHandler}>Okay</button>
                    </div>
                </div>
            }

            <div className="FlexContainer">
                <div className="LandingPage RegistrationContainer">
                    <div className="WelcomeWrapper">
                        <div className="WelcomeNote">
                            {`Hi ${userName || "User"}`}
                            <span>Welcome To Homitag Demo</span>
                        </div>
                        <div className="SubWelcomeNote">
                            Please fill the form to register with us.
                         </div>
                    </div>
                    <div className="RegistrationWrapper">





                        <div className="RegisterFieldsRow">
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

                        <div className="RegisterFieldsRow">
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

                        <div className="RegisterFieldsRow">
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

                        <div className="RegisterFieldsRow">
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

                        <div className="RegisterFieldsRow">
                            <label>
                                Profile picture
                </label>
                            {state.ProfilePicture ?
                                (<div className="PictureAdded">
                                    <div onClick={removeProfileImage} className="RemovePictureIcons"><img src={CloseIcon} alt="img" /></div>
                                    <img src={state.ProfilePicture} />
                                </div>)
                                :
                                <div className="ImageInput">
                                    <div class="ImageLabel">Upload A Profile Picture</div>
                                    <input
                                        type="file"
                                        onChange={profilePictureHandler}
                                        encType="multipart/form-data"
                                    />
                                </div>
                            }
                        </div>

                        <div className="RegisterFieldsRow">
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

                        <div className="RegisterFieldsRow">
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

                        <div className="RegisterFieldsRow">
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

                        <div className="SubmitButtonRow">
                            <button onClick={submitForm}>Submit Form</button>
                        </div>

                    </div >
                </div>

            </div>
        </div>
    )
}
