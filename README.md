# Video capture (single-page)

A minimal single-page web app that requests camera access, shows a live preview and captures a photo automatically after a few seconds.

## Prerequisites

- A modern browser that supports getUserMedia (Chrome, Firefox, Safari).
- Node.js installed for the npm script (optional).

## Run the app (recommended)

From the project root (where `index.html` and `package.json` live):

1. Install dependencies (optional): this project uses `npx` so a global install is not required.

2. Start the local server using the npm script:

```bash
npm start
```

This runs the script defined in `package.json` which launches a simple static server (http-server) and serves the project on port 8080 by default.

Open this URL in your browser:

- http://localhost:8080

Note: `localhost` is considered a secure context so camera access via getUserMedia will work without HTTPS.

## Alternative: run using npx directly

If you prefer not to use `npm start`, run the server directly with npx:

```bash
npx http-server -p 8080 .
# then open http://localhost:8080
```

## How the app works

- Click the "Start" button to request camera permission.
- If you allow access, a live preview appears and the app automatically captures a photo after a short delay (5 seconds) and displays it below the preview.
- If you deny access, an error message appears in the live preview area.

## Stopping the server

- In the terminal where the server is running press Ctrl+C.

## Troubleshooting

- Camera blocked: ensure the browser prompt is allowed and that you are using `http://localhost` or HTTPS.
- No video: confirm no other app is using the camera and that your browser has permission.
- Changes not showing: if you ran a server that enables caching, do a hard reload (Cmd+Shift+R) or re-run the server with caching disabled.

