# `sogouda`

This package exposes [Sogouda](#sogouda) as a JavaScript/[TypeScript](https://typescriptlang.org/) library.

For more information, please refer to [the main repository](https://github.com/sogouda/sogouda/).

## Installation

### As a library

To install the [`sogouda`](#sogouda) as a dependency of your package, please run the following command:

```sh
npm i sogouda
```

### As an executable

To install the [`sogouda`](#sogouda) executable globally for the user, please run the following command:

```sh
npm i -g sogouda
```

### For use within package scripts

To use [`sogouda`](#sogouda) from within package scripts, please run the following command:

```sh
npm i -D sogouda
```

## Usage (executable)

### Load an app image

#### Locally

```sh
sogouda --title "Example App" --url file:///path/to/the/app/index.html
```

#### Remotely

```sh
sogouda --title "Example App" --url https://example.com
```

## Usage (library)

### Load an app image

#### Locally

```ts
import { App } from "sogouda";


// Set the app's options.
const options = {
    title: "Example App",
    url: "file:///path/to/the/app/index.html"
};

// Create the app context.
const app = new App(options);

// Start the app.
app.startSync();
```

#### Remotely

```ts
import { App } from "sogouda";


// Set the app's options.
const options = {
    title: "Example App",
    url: "https://example.com"
};

// Create the app context.
const app = new App(options);

// Start the app.
app.startSync();
```
