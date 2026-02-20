import React, {useEffect} from "react"
import {useUpscaleActions, useUpscaleSelector} from "../store"
import {Dropdown, DropdownButton} from "react-bootstrap"
import checkboxChecked from "../assets/icons/checkbox-checked.png"
import checkbox from "../assets/icons/checkbox.png"
import "./styles/globalsettings.less"

const DirectoryBar: React.FunctionComponent = () => {
    const {noise, scale, speed, reverse, mode, fpsMultiplier} = useUpscaleSelector()
    const {setNoise, setScale, setSpeed, setReverse, setFPSMultiplier} = useUpscaleActions()

    useEffect(() => {
        window.ipcRenderer.invoke("store-settings", {noise, scale, speed, reverse, mode, fpsMultiplier})
    })

    const handleNoise = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        if (value.length > 2) return
        if (Number.isNaN(Number(value.replace("-", "")))) return
        if (Number(value) > 3) value = "3"
        setNoise(value.replace(".", ""))
    }

    const handleNoiseKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowUp") {
            const getNewNoise = () => {
                if (Number(noise) + 1 > 3) return Number(noise)
                return Number(noise) + 1
            }
            setNoise(String(getNewNoise()))
        } else if (event.key === "ArrowDown") {
            const getNewNoise = () => {
                if (Number(noise) - 1 < -1) return Number(noise)
                return Number(noise) - 1
            }
            setNoise(String(getNewNoise()))
        }
    }

    const handleScale = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (value.replace(".", "").length > 2) return
        if (Number.isNaN(Number(value))) return
        setScale(value)
    }

    const handleScaleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowUp") {
            const getNewScale = () => {
                if (Number(scale) + 1 > 99) return Number(scale)
                if (String(scale).includes(".")) return (Number(scale) + 1).toFixed(1)
                return Number(scale) + 1
            }
            setScale(String(getNewScale()))
        } else if (event.key === "ArrowDown") {
            const getNewScale = () => {
                if (Number(scale) - 1 < 0) return Number(scale)
                if (String(scale).includes(".")) return (Number(scale) - 1).toFixed(1)
                return Number(scale) - 1
            }
            setScale(String(getNewScale()))
        }
    }

    const handleSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (value.replace(".", "").length > 2) return
        if (Number.isNaN(Number(value))) return
        setSpeed(value)
    }

    const handleSpeedKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowUp") {
            const getNewSpeed = () => {
                if (Number(speed) + 1 > 99) return Number(speed)
                if (String(speed).includes(".")) return (Number(speed) + 1).toFixed(1)
                return Number(speed) + 1
            }
            setSpeed(String(getNewSpeed()))
        } else if (event.key === "ArrowDown") {
            const getNewSpeed = () => {
                if (Number(speed) - 1 < 0) return Number(speed)
                if (String(speed).includes(".")) return (Number(speed) - 1).toFixed(1)
                return Number(speed) - 1
            }
            setSpeed(String(getNewSpeed()))
        }
    }

    const handleReverse = () => {
        setReverse(!reverse)
    }

    return (
        <section className="global-settings">
            <div className="global-settings-box">
                <p className="global-settings-text">Noise: </p>
                <input className="global-settings-input" type="text" min="0" max="3" value={noise} onChange={handleNoise} onKeyDown={handleNoiseKey}/>
            </div>
            <div className="global-settings-box">
                <p className="global-settings-text">Scale: </p>
                <input className="global-settings-input" type="text" value={scale} onChange={handleScale} onKeyDown={handleScaleKey}/>
            </div>
            <div className="global-settings-box">
                <p className="global-settings-text">Framerate: </p>
                <DropdownButton title={`${fpsMultiplier}X`} drop="up">
                    <Dropdown.Item active={fpsMultiplier === 4} onClick={() => setFPSMultiplier(4)}>4X</Dropdown.Item>
                    <Dropdown.Item active={fpsMultiplier === 3} onClick={() => setFPSMultiplier(3)}>3X</Dropdown.Item>
                    <Dropdown.Item active={fpsMultiplier === 2} onClick={() => setFPSMultiplier(2)}>2X</Dropdown.Item>
                    <Dropdown.Item active={fpsMultiplier === 1} onClick={() => setFPSMultiplier(1)}>1X</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className="global-settings-box">
                <p className="global-settings-text">Speed: </p>
                <input className="global-settings-input" type="text" min="0.5" max="100" value={speed} onChange={handleSpeed} onKeyDown={handleSpeedKey}/>
            </div>
            <div className="global-settings-box">
                <p className="global-settings-text">Reverse: </p>
                <img className="global-settings-checkbox" width="20" height="20" src={reverse ? checkboxChecked : checkbox} onClick={handleReverse}/>
            </div>
        </section>
    )
}

export default DirectoryBar
