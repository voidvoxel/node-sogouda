import {
    ParseArgsConfig,
    parseArgs
} from "util";


import App from "../App";


const PARSE_ARGS_CONFIG: ParseArgsConfig = {
    allowPositionals: true,
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
            default: "https://example.com",
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
const args: Arguments = parseArgs(PARSE_ARGS_CONFIG);


async function main (
    args: Arguments
) {
    // Get the default app options.
    const options = App.getDefaultOptions();

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

    // Create the app.
    const app = new App(options);

    // Start the app.
    await app.start();
}

// Run the program.
main(args);
