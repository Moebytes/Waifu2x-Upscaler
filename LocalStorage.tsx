import React, {useEffect} from "react"
import {useThemeSelector, useThemeActions} from "./store"
import {Themes, OS} from "./reducers/themeReducer"

const lightColorList = {
	"--iconColor": "#69e8ff",
	"--waifu2xColor": "#00fdfd",
	"--closeButton": "#499bff",
	"--minimizeButton": "#39bdff",
	"--maximizeButton": "#2edcff",
	"--navColor": "#6eb2ff",
	"--background": "#92dbff",
	"--textColor": "#000000",
	"--strokeColor": "#000000",
	"--textboxColor": "#70b7de",
	"--startAllButton": "#81a2ff",
	"--clearAllButton": "#7595ff",
	"--contractButton": "#538cff",
	"--arrowColor": "#69ebff",
	"--locationButton": "#509cff",
	"--trashButton": "#518bff",
	"--itemBG": "#78a2ff",
	"--itemStroke": "#8dc8ff",
	"--stopButton": "#688bff",
	"--finishedColor": "#80ffdd",
	"--textColor2": "#000000",
	"--titleColor": "#69ebff",
	"--checkboxColor": "#4970ff",
	"--iconColor2": "#59f59f"
}

const darkColorList = {
	"--iconColor": "#67e3ff",
	"--waifu2xColor": "#00fdfd",
	"--closeButton": "#499bff",
	"--minimizeButton": "#39bdff",
	"--maximizeButton": "#2edcff",
	"--navColor": "#1d2e4f",
	"--background": "#0e1a30",
	"--textColor": "#ffffff",
	"--strokeColor": "#000000",
	"--textboxColor": "#1c3358",
	"--startAllButton": "#81a2ff",
	"--clearAllButton": "#7595ff",
	"--contractButton": "#92d2ff",
	"--arrowColor": "#93f1ff",
	"--locationButton": "#92c5ff",
	"--trashButton": "#4995ff",
	"--itemBG": "#131f3a",
	"--itemStroke": "#16223d",
	"--stopButton": "#688bff",
	"--finishedColor": "#80ffdd",
	"--textColor2": "#000000",
	"--titleColor": "#71e3ff",
	"--checkboxColor": "#4970ff",
	"--iconColor2": "#6ec7ff"
}

const LocalStorage: React.FunctionComponent = () => {
    const {theme, os} = useThemeSelector()
    const {setTheme, setOS} = useThemeActions()

    useEffect(() => {
        if (typeof window === "undefined") return
        const colorList = theme.includes("light") ? lightColorList : darkColorList
        for (let i = 0; i < Object.keys(colorList).length; i++) {
            const key = Object.keys(colorList)[i]
            const color = Object.values(colorList)[i]
            document.documentElement.style.setProperty(key, color)
        }
    }, [theme])

    useEffect(() => {
        const initTheme = async () => {
            const savedTheme = await window.ipcRenderer.invoke("get-theme")
            if (savedTheme) setTheme(savedTheme as Themes)
        }
        initTheme()
    }, [])

    useEffect(() => {
        window.ipcRenderer.invoke("save-theme", theme)
    }, [theme])


    useEffect(() => {
        const initOS = async () => {
            const savedOS = await window.ipcRenderer.invoke("get-os")
            if (savedOS) setOS(savedOS as OS)
        }
        initOS()
    }, [])

    useEffect(() => {
        window.ipcRenderer.invoke("save-os", os)
    }, [os])

    return null
}

export default LocalStorage