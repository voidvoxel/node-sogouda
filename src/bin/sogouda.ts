#!/usr/bin/env node


import {
    ParseArgsConfig,
    parseArgs
} from "util";


import App from "../App";
import AppOptions from "../AppOptions";
import path from "path";


const DEFAULT_APP_URL
    =   "file://"
    +   path.resolve(
            path.join(
                __dirname,
                "..",
                "..",
                "pages"
            )
        )
        .replaceAll(
            "\\",
            "/"
        )
    +   "/index.html"
;


const PARSE_ARGS_CONFIG: ParseArgsConfig = {
    allowPositionals: true,
    args: process.argv.splice(2),
    options: {
        "debug": {
            default: false,
            multiple: false,
            short: "d",
            type: "boolean"
        },
        "frameless": {
            default: false,
            multiple: false,
            short: "f",
            type: "boolean"
        },
        "height": {
            default: "480",
            multiple: false,
            short: "w",
            type: "string"
        },
        "title": {
            default: "Sogouda",
            multiple: false,
            short: "t",
            type: "string"
        },
        "url": {
            default: DEFAULT_APP_URL,
            multiple: false,
            short: "u",
            type: "string"
        },
        "width": {
            default: "640",
            multiple: false,
            short: "w",
            type: "string"
        }
    }
}


type Arguments = {
    values: {
        [longOption: string]: string | boolean | (string | boolean)[];
    };
    positionals: string[];
    tokens?: any[];
};


// Parse the arguments.
const args: Arguments = parseArgs(PARSE_ARGS_CONFIG) as Arguments;


async function main (
    args: Arguments
) {
    // Get the default app options.
    const options: AppOptions = App.getDefaultOptions() as AppOptions;

    options.url = DEFAULT_APP_URL;

    if (args.values.debug)
        options.debug = args.values.debug as boolean;

    if (args.values.frameless)
        options.frameless = args.values.frameless as boolean;

    if (args.values.height)
        options.height = parseInt(args.values.height as string) as number;

    if (args.values.title)
        options.title = args.values.title as string;

    if (args.values.url)
        options.url = args.values.url as string;

    if (args.values.width)
        options.width = parseInt(args.values.width as string) as number;

    // Start the app.
    new App(options).startSync();
}

// Run the program.
main(args);
