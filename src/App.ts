import { existsSync, mkdirSync, rmSync } from "fs";
import { tmpdir } from "os";
import path from "path";


import StartOptions, * as bindings from "@sogouda/bindings";


import AppOptions from "./AppOptions";


const DEFAULT_APP_OPTIONS: AppOptions = {
    debug: false,
    frameless: false,
    height: 480,
    title: "Sogouda",
    url: "https://example.com",
    width: 640
};


function getRandomId () {
    return (Math.random() * Number.MAX_SAFE_INTEGER);
}


function getRandomIdString () {
    return getRandomId().toString(16);
}


const SOGOUDA_TMP_DIR = path.resolve(
    path.join(
        tmpdir(),
        "sogouda",
        getRandomIdString()
    )
);


function cleanup () {
    if (existsSync(SOGOUDA_TMP_DIR)) {
        rmSync(SOGOUDA_TMP_DIR);
    }
}


mkdirSync(
    SOGOUDA_TMP_DIR,
    {
        recursive: true
    }
);

process.on(
    "error",
    cleanup
);

process.on(
    "exit",
    cleanup
);


/**
 * A Sogouda app.
 *
 * For more information, please refer to [the README](https://github.com/sogouda/node-sogouda/).
 */
export default class App {
    /**
     * Whether or not to enable debug mode.
     *
     * @type {boolean}
     */
    debug: boolean

    /**
     * The height of the window.
     *
     * @type {number}
     */
    height: number

    /**
     * Whether or not the window is frameless.
     *
     * @type {boolean}
     */
    frameless: boolean

    /**
     * The title of the window.
     *
     * @type {string}
     */
    title: string

    /**
     * The URL where the `App`'s data is located.
     *
     * @type {string}
     */
    url: string

    /**
     * The width of the window.
     *
     * @type {number}
     */
    width: number


    /**
     * Get the default options.
     *
     * @public
     * @since v0.1.0
     * @version 0.1.0
     *
     * @returns {AppOptions}
     */
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


    /**
     * Start the app.
     *
     * @async
     *
     * @public
     * @since v0.1.0
     * @version 0.1.0
     *
     * @returns {Promise<void>}
     */
    async start () {
        return new Promise<void>(
            (resolve, reject) => {
                try {
                    this.startSync();
                } catch (error) {
                    reject(error.message);
                }

                resolve(undefined);
            }
        )
    }


    /**
     * Start the app.
     *
     * @public
     * @since v0.1.0
     * @version 0.1.0
     *
     * @returns {ChildProcessWithoutNullStreams}
     */
    startSync () {
        bindings.start(this.#getOptions());
    }


    #getOptions (): StartOptions {
        return {
            debug: this.debug,
            frameless: this.frameless,
            height: this.height,
            title: this.title,
            url: this.url,
            width: this.width
        };
    }
}
