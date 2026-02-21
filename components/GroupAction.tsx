import React, {useState, useEffect} from "react"
import {useActionSelector} from "../store"
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

    if (clearAll) {
        return (
            <section className="group-action-container">
                <button className="group-action-button" onClick={start}>{">>Start All"}</button>
                <button className="group-action-button" onClick={clear}>{">>Clear All"}</button>
            </section>
        )
    }
    return null
}

export default GroupAction
