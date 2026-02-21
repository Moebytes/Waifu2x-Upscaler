import React from "react"
import logo from "../assets/images/logo.png"
import "./styles/logobar.less"

const LogoBar: React.FunctionComponent = () => {
    const onMouseDown = () => {
        window.ipcRenderer.send("moveWindow")
    }

    return (
        <section className="logo-bar">
            <div className="logo-bar-container" onMouseDown={onMouseDown}>
                <img src={logo} className="logo" width="418" height="118"/>
            </div>
        </section>
    )
}

export default LogoBar
