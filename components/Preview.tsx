import React, {useEffect, useState} from "react"
import {useActionSelector, useActionActions} from "../store"
import "./styles/preview.less"

const Preview: React.FunctionComponent = (props) => {
    const {previewVisible} = useActionSelector()
    const {setPreviewVisible} = useActionActions()
    const [src, setSrc] = useState("")
    const [type, setType] = useState("image")

    useEffect(() => {
        const preview = (event: any, image: string, type: "image" | "gif" | "video" | "pdf") => {
            if (image) {
                setSrc(image)
                setType(type)
                setPreviewVisible(true)
            }
        }
        window.addEventListener("click", close)
        window.ipcRenderer.on("preview", preview)
        return () => {
            window.ipcRenderer.removeListener("preview", preview)
            window.removeEventListener("click", close)
        }
    }, [])

    const close = () => {
        setPreviewVisible(false)
    }

    if (previewVisible) {
        return (
            <section className="preview-container" onClick={close}>
                <div className="preview-box">
                    {type === "video" ?
                    <video className="preview-img" muted autoPlay loop controls>
                        <source src={src}></source>
                    </video> :
                    <img className="preview-img" src={src}/>}
                </div>
            </section>
        )
    }
    return null
}

export default Preview
