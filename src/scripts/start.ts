import * as bindings from "@sogouda/bindings";


import AppOptions from "../AppOptions";
import { writeFileSync } from "fs";


// Get the script arguments.
const args = process.argv.splice(2);


writeFileSync("debug.json", JSON.stringify(JSON.parse(args[0])), "utf-8");


// Set the default app options.
const DEFAULT_APP_OPTIONS: AppOptions = {
    debug: false,
    frameless: false,
    height: 480,
    title: "Sogouda",
    url: "https://example.com",
    width: 640
};

// Start with the default options.
let options: AppOptions = structuredClone(DEFAULT_APP_OPTIONS);

// If the optional script arguments are present, apply them.
if (args.length >= 1) {
    // Parse the options passed to the script.
    options = JSON.parse(args[0]);

    // If the parsed `AppOptions` are invalid, fall back to the default values.
    if (typeof options !== "object") {
        // Fall back to the default values.
        options = structuredClone(DEFAULT_APP_OPTIONS);
    }
}

// Polyfill the default options.
options.debug ??= false;
options.frameless ??= false;
options.height ??= 480;
options.title ??= "Sogouda";
options.url ??= "https://example.com";
options.width ??= 640;

console.log(options);

// Start the app.
bindings.start(options);
