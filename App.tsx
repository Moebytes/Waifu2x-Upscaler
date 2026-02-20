import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import store from "./store"
import AdvancedSettings from "./components/AdvancedSettings"
import DirectoryBar from "./components/DirectoryBar"
import FileContainerList from "./components/FileContainerList"
import FileSelector from "./components/FileSelector"
import GlobalSettings from "./components/GlobalSettings"
import GroupAction from "./components/GroupAction"
import LogoBar from "./components/LogoBar"
import Preview from "./components/Preview"
import TitleBar from "./components/TitleBar"
import LocalStorage from "./LocalStorage"
import "./index.less"

const App = () => {
  return (
    <main className="app">
        <TitleBar/>
        <AdvancedSettings/>
        <LocalStorage/>
        <Preview/>
        <LogoBar/>
        <FileSelector/>
        <DirectoryBar/>
        <GlobalSettings/>
        <GroupAction/>
        <FileContainerList/>
    </main>
  )
}

const root = createRoot(document.getElementById("root")!)
root.render(<Provider store={store}><App/></Provider>)