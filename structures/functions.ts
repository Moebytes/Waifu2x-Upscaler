


import path from "path"

export default class Functions {
    public static arrayIncludes = (str: string, arr: string[]) => {
        for (let i = 0; i < arr.length; i++) {
            if (str.includes(arr[i])) return true
        }
        return false
    }

    public static cleanTitle = (str: string) => {
        const ext = path.extname(str)
        const split = str.match(/.{1,30}/g)?.join(" ").replace(ext, "")!
        return `${split.slice(0, 70)}${ext}`
    }


    public static arrayRemove = <T>(arr: T[], val: T) => {
        return arr.filter((item) => item !== val)
    }

    public static timeout = async (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    public static countDecimals = (value: number, max?: number) => {
        const count = value % 1 ? value.toString().split(".")[1].length : 0
        if (max && count > max) return max
        return count
    }

    public static escape = (str: string) => {
        return path.normalize(str).replace(/(?<!\\)\\(?!\\)/g, "/")
    }
}
