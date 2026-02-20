import {defineConfig} from "@rsbuild/core"
import {pluginReact} from "@rsbuild/plugin-react"
import {pluginLess} from "@rsbuild/plugin-less"
import {pluginNodePolyfill} from "@rsbuild/plugin-node-polyfill"
import {pluginTypeCheck} from "@rsbuild/plugin-type-check"
import {mainPlugin} from "@electron-rsbuild/plugin-main"
import {preloadPlugin} from "@electron-rsbuild/plugin-preload"
import {rendererPlugin} from "@electron-rsbuild/plugin-renderer"
import path from "path"
import dotenv from "dotenv"

const env = dotenv.config().parsed!
let typecheck = env.TYPECHECK === "yes"

export default defineConfig({
    root: path.resolve(__dirname, "."),
    tools: {
        rspack(config) {
            config.module = config.module || {}
            config.module.rules = config.module.rules || []
            config.externals = config.externals || {}

            config.externals = {
                "electron-click-drag-plugin": "commonjs electron-click-drag-plugin",
                "sharp": "commonjs sharp"
            }

            config.module.rules.push({
                test: /\.svg$/,
                type: "javascript/auto",
                use: [{
                    loader: "@svgr/webpack", 
                    options: {
                        svgoConfig: {
                            plugins: [
                                {name: "preset-default", params: {overrides: {removeViewBox: false}}}
                            ]
                        }
                    }
                }]
            })

            return config
        }
    },
    environments: {
        main: {
            plugins: [
                pluginTypeCheck({enable: typecheck}),
                mainPlugin({
                    source: {entry: {index: path.resolve(__dirname, "./main.ts")}},
                    output: {
                        target: "node",
                        distPath: {
                            root: "dist/main",
                            js: "."
                        },
                        minify: false
                    }
                })
            ]
        },
        preload: {
            plugins: [
                pluginTypeCheck({enable: typecheck}),
                preloadPlugin({
                    source: {entry: {index: path.resolve(__dirname, "./preload.ts")}},
                    output: {
                        target: "node",
                        distPath: {
                            root: "dist/preload",
                            js: ".",
                        },
                        minify: false
                    }
                })
            ]
        },
        renderer: {
            plugins: [
                pluginReact(),
                pluginLess(),
                pluginNodePolyfill(),
                pluginTypeCheck({enable: typecheck}),
                rendererPlugin({
                    source: {entry: {index: path.resolve(__dirname, "./App.tsx")}},
                    html: {template: path.resolve(__dirname, "./index.html")},
                    output: {
                        target: "web",
                        assetPrefix: "auto",
                        distPath: {
                            root: "dist/renderer",
                        },
                        minify: false
                    }
                })
            ]
        }
    }
})