import React, {useState, useEffect} from "react"
import {useActionSelector} from "../store"
import clearAllButtonHover from "../assets/icons/clearAll-hover.png"
import clearAllButton from "../assets/icons/clearAll.png"
import startAllButtonHover from "../assets/icons/startAll-hover.png"
import startAllButton from "../assets/icons/startAll.png"
import clearAllButtonDarkHover from "../assets/icons/clearAll-hover-dark.png"
import clearAllButtonDark from "../assets/icons/clearAll-dark.png"
import startAllButtonDarkHover from "../assets/icons/startAll-hover-dark.png"
import startAllButtonDark from "../assets/icons/startAll-dark.png"
import "./styles/groupaction.less"

const GroupAction: React.FunctionComponent = (props) => {
    const {clearAll} = useActionSelector()
    const [startHover, setStartHover] = useState(false)
    const [clearHover, setClearHover] = useState(false)
    const [color, setColor] = useState("light")

    useEffect(() => {
        const updateColor = (event: any, color: string) => {
            setColor(color)
        }
        window.ipcRenderer.on("update-color", updateColor)
        return () => {
            window.ipcRenderer.removeListener("update-color", updateColor)
        }
    }, [])

    const start = () => {
        window.ipcRenderer.invoke("start-all")
        setStartHover(false)
    }

    const clear = () => {
        window.ipcRenderer.invoke("clear-all")
        setClearHover(false)
    }

    const getImage = (type: string) => {
        if (type === "start") {
            if (color === "light") {
                if (startHover) {
                    return startAllButtonHover
                } else {
                    return startAllButton
                }
            } else {
                if (startHover) {
                    return startAllButtonDarkHover
                } else {
                    return startAllButtonDark
                }
            }
        } else if (type === "clear") {
            if (color === "light") {
                if (clearHover) {
                    return clearAllButtonHover
                } else {
                    return clearAllButton
                }
            } else {
                if (clearHover) {
                    return clearAllButtonDarkHover
                } else {
                    return clearAllButtonDark
                }
            }
        }
    }

    if (clearAll) {
        return (
            <section className="group-action-container">
                    <img src={getImage("start")} onClick={start} className="group-action-button" width="319" height="61" onMouseEnter={() => setStartHover(true)} onMouseLeave={() => setStartHover(false)}/>
                    <img src={getImage("clear")} onClick={clear} className="group-action-button" width="319" height="61" onMouseEnter={() => setClearHover(true)} onMouseLeave={() => setClearHover(false)}/>
            </section>
        )
    }
    return null
}

export default GroupAction
