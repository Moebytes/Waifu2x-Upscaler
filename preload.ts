import {contextBridge, ipcRenderer, clipboard, shell, IpcRendererEvent} from "electron"

declare global {
  interface Window {
    platform: "mac" | "windows",
    ipcRenderer: {
      invoke: (channel: string, ...args: any[]) => Promise<any>
      send: (channel: string, ...args: any[]) => void
      on: (channel: string, listener: (...args: any[]) => void) => any
      removeListener: (channel: string, listener: (...args: any[]) => void) => void
    },
    clipboard: {
      readText: () => string
      writeText: (text: string) => void
      clear: () => void
    },
    shell: {
      openPath: (path: string) => Promise<string>
      showItemInFolder: (path: string) => void
    }
  }
}

contextBridge.exposeInMainWorld("ipcRenderer", {
    invoke: async (channel: string, ...args: any[]) => {
            return ipcRenderer.invoke(channel, ...args)
    },
    send: (channel: string, ...args: any[]) => {
        ipcRenderer.send(channel, ...args)
    },
    on: (channel: string, listener: (...args: any[]) => void) => {
        const subscription = (event: IpcRendererEvent, ...args: any[]) => listener(event, ...args)

        ipcRenderer.on(channel, subscription)

        return subscription
    },
    removeListener: (channel: string, listener: (...args: any[]) => void) => {
        ipcRenderer.removeListener(channel, listener)
    }
})

contextBridge.exposeInMainWorld("clipboard", {
    readText: () => clipboard.readText(),
    writeText: (text: string) => clipboard.writeText(text),
    clear: () => clipboard.clear()
})

contextBridge.exposeInMainWorld("shell", {
    openPath: async (path: string) => shell.openPath(path),
    showItemInFolder: (path: string) => shell.showItemInFolder(path)
})

contextBridge.exposeInMainWorld("platform", process.platform === "darwin" ? "mac" : "windows")