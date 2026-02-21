import React, {useEffect, useState} from "react"
import {useDropzone} from "react-dropzone"
import FileSelectorIcon from "../assets/svg/file-selector.svg"
import "./styles/fileselector.less"

const FileSelector: React.FunctionComponent = (props) => {
    const [hover, setHover] = useState(false)
    const [drag, setDrag] = useState(false)
    const [id, setID] = useState(1)
    const [color, setColor] = useState("light")

    useEffect(() => {
        const addFile = (event: any, file: string, pos: number) => {
            setID((prev) => {
                window.ipcRenderer.invoke("add-file-id", file, pos, prev)
                return prev + 1
            })
        }
        const dragOver = () => {
            setDrag(true)
        }
        const dragLeave = () => {
            setDrag(false)
        }
        const updateColor = (event: any, color: string) => {
            setColor(color)
        }
        window.ipcRenderer.on("add-file", addFile)
        window.ipcRenderer.on("update-color", updateColor)
        document.addEventListener("dragover", dragOver)
        document.addEventListener("dragleave", dragLeave)
        document.addEventListener("drop", dragLeave)
        return () => {
            window.ipcRenderer.removeListener("add-file", addFile)
            window.ipcRenderer.removeListener("update-color", updateColor)
            document.removeEventListener("dragover", dragOver)
            document.removeEventListener("dragleave", dragLeave)
            document.removeEventListener("drop", dragLeave)
        }
    }, [])

    const onDrop = async (files: any) => {
        files = files.map((f: any) => f.path)
        if (files[0]) {
            const identifers = []
            let counter = id
            for (let i = 0; i < files.length; i++) {
                const type = await window.ipcRenderer.invoke("get-type", files[i])
                if (!type) continue
                identifers.push(counter)
                counter += 1
                setID((prev) => prev + 1)
            }
            window.ipcRenderer.invoke("add-files", files, identifers)
        }
    }

    const {getRootProps, isDragActive} = useDropzone({onDrop})

    const selectFiles = async () => {
        setHover(false)
        const files = await window.ipcRenderer.invoke("select-files")
        if (files[0]) {
            const identifers = []
            let counter = id
            for (let i = 0; i < files.length; i++) {
                const type = await window.ipcRenderer.invoke("get-type", files[i])
                if (!type) continue
                identifers.push(counter)
                counter += 1
                setID((prev) => prev + 1)
            }
            window.ipcRenderer.invoke("add-files", files, identifers)
        }
    }

    const setFilter = drag ? isDragActive : hover
    return (
        <section className="file-selector" {...getRootProps()}>
            <div className="file-selector-img">
                <FileSelectorIcon className="file-selector-img-text" style={{filter: setFilter ? "brightness(0) invert(1)" : ""}}/>
            </div>
            <div className="file-selector-hover" onClick={selectFiles} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}></div>
        </section>
    )
}

export default FileSelector
