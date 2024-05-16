import { fork, spawn } from "child_process";


import AppOptions from "./AppOptions";


const DEFAULT_APP_OPTIONS: AppOptions = {
    debug: false,
    frameless: false,
    height: 480,
    title: "Sogouda",
    url: "https://example.com",
    width: 640
};


export default class App {
    debug: boolean
    height: number
    frameless: boolean
    title: string
    url: string
    width: number


    static getDefaultOptions (): AppOptions {
        return structuredClone(DEFAULT_APP_OPTIONS);
    }


    constructor (
        options: AppOptions | null
    ) {
        options ??= structuredClone(DEFAULT_APP_OPTIONS);

        this.debug = options.debug ?? DEFAULT_APP_OPTIONS.debug as boolean;
        this.frameless = options.frameless ?? DEFAULT_APP_OPTIONS.frameless as boolean;
        this.height = options.height ?? DEFAULT_APP_OPTIONS.height as number;
        this.frameless = options.frameless ?? DEFAULT_APP_OPTIONS.frameless as boolean;
        this.title = options.title ?? DEFAULT_APP_OPTIONS.title as string;
        this.url = options.url ?? DEFAULT_APP_OPTIONS.url as string;
        this.width = options.width ?? DEFAULT_APP_OPTIONS.width as number;
    }


    async start () {
        const subprocess = this.#startSubprocess();

        const promise: Promise<void> = new Promise(
            (resolve, reject) => {
                subprocess.on(
                    "error",
                    error => reject(error.message)
                );

                const errorMessage = (exitCode: number): string =>
                    "Sogouda Error #" + exitCode.toString()
                ;

                subprocess.on(
                    "exit",
                    exitCode =>
                        exitCode === 0
                            ?   resolve(undefined)
                            :   (
                                () => {
                                    // Make an exception for this safe exit code.
                                    if (exitCode === 3221226356) {
                                        resolve(undefined);
                                    }

                                    reject(errorMessage(exitCode));
                                }
                            )()
                );
            }
        );

        return promise;
    }


    startSync () {
        const subprocess = this.#startSubprocess();

        return subprocess;
    }


    #startSubprocess () {
        const options: AppOptions = {
            debug: this.debug,
            frameless: this.frameless,
            height: this.height,
            title: this.title,
            url: this.url,
            width: this.width
        };

        let subprocess = spawn(
            "node",
            [
                "build/scripts/start.js",
                JSON.stringify(options)
            ]
        );

        process.on(
            "error",
            () => {
                if (subprocess) {
                    subprocess.kill();

                    subprocess = null;
                }
            }
        );

        process.on(
            "exit",
            () => {
                if (subprocess) {
                    subprocess.kill();

                    subprocess = null;
                }
            }
        );

        return subprocess;
    }
}
