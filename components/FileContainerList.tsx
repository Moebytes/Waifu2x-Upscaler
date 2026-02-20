import React, {useEffect, useState} from "react"
import {useUpscaleSelector, useActionActions} from "../store"
import Reorder from "react-reorder"
import FileContainer from "./FileContainer"
import "./styles/filecontainerlist.less"

const FileContainerList: React.FunctionComponent = (props) => {
    const {setClearAll} = useActionActions()
    const {pdfDownscale} = useUpscaleSelector()
    const [containers, setContainers] = useState([] as  Array<{id: number, started: boolean, jsx: any}>)
    const [addSignal, setAddSignal] = useState(null) as any
    useEffect(() => {
        const addFile = async (event: any, file: string, pos: number, id: number) => {
            setAddSignal({file, pos, id})
        }
        const addFiles = async (event: any, files: string[], identifiers: number[]) => {
            for (let i = 0; i < files.length; i++) {
                const type = await window.ipcRenderer.invoke("get-type", files[i])
                if (!type) continue
                const dimensions = await window.ipcRenderer.invoke("get-dimensions", files[i], type, {pdfDownscale})
                setContainers((prev) => {
                    let newState = [...prev]
                    newState = [...newState, {id: identifiers[i], started: false, jsx: <FileContainer key={identifiers[i]} id={identifiers[i]} height={dimensions.height} width={dimensions.width} framerate={dimensions.framerate} image={dimensions.image} source={files[i]} type={type} setStart={setStarted} remove={removeContainer}/>}]
                    return newState
                })
            }
        }
        window.ipcRenderer.on("add-files", addFiles)
        window.ipcRenderer.on("add-file-id", addFile)
        return () => {
            window.ipcRenderer.removeListener("add-files", addFiles)
            window.ipcRenderer.removeListener("add-file-id", addFile)
        }
    }, [pdfDownscale])

    useEffect(() => {
        update()
        if (addSignal) addSignalFunc()
    })

    const addSignalFunc = async () => {
        const signal = addSignal
        setAddSignal(null)
        let index = containers.findIndex((c) => c.id === signal.pos)
        if (index === -1) index = containers.length
        const type = await window.ipcRenderer.invoke("get-type", signal.file)
        if (!type) return
        const dimensions = await window.ipcRenderer.invoke("get-dimensions", signal.file, type, {pdfDownscale})
        setContainers((prev) => {
            const newState = [...prev]
            newState.splice(index + 1, 0, {id: signal.id, started: false, jsx: <FileContainer key={signal.id} id={signal.id} height={dimensions.height} width={dimensions.width} framerate={dimensions.framerate} image={dimensions.image} source={signal.file} type={type} setStart={setStarted} remove={removeContainer}/>})
            return newState
        })
    }

    const update = () => {
        let found = containers.length ? true : false
        setClearAll(found)
    }

    const removeContainer = (id: number) => {
        setContainers((prev) => {
            const newState = [...prev]
            const index = newState.findIndex((c) => c.id === id)
            if  (index !== -1) newState.splice(index, 1)
            return newState
        })
    }

    const setStarted = (id: number) => {
        setContainers((prev) => {
            const newState = [...prev]
            const index = newState.findIndex((c) => c.id === id)
            if  (index !== -1) newState[index].started = true
            return newState
        })
    }

    const reorder = (event: React.MouseEvent, from: number, to: number) => {
        setContainers((prev) => {
            const newState = [...prev]
            newState.splice(to, 0, newState.splice(from, 1)[0])
            return newState
        })
    }

    return (
        <Reorder reorderId="file-containers" component="ul" holdTime={50} onReorder={reorder}>{
            containers.map((c) => (
                <li key={c.id}>
                    {c.jsx}
                </li>
            ))
        }</Reorder>
    )
}

export default FileContainerList
