import React from 'react'
import PropTypes from "prop-types";

/**
 * 
 * @param {*} param0 Alert takes the following attributes - title, message, showCancelButton(boolean), okBtnHandler, cancelBtnHandler
 */
export default function Alert({ title = "Title", message = "", showCancelButton = false, okBtnHandler, cancelBtnHandler }) {


    return (
        <div className="Alert">
            <div className="Alert__Title">{title}</div>
            <div className="Alert__Message">{message}</div>

            <div>
                <button onClick={okBtnHandler}>Ok</button>
                {showCancelButton &&
                    <button onClick={cancelBtnHandler ? cancelBtnHandler : () => { }}>Cancel</button>
                }
            </div>

        </div>
    )
}

Alert.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    showCancelButton: PropTypes.bool.isRequired,
    okBtnHandler: PropTypes.func.isRequired,
    cancelBtnHandler: PropTypes.func
}
