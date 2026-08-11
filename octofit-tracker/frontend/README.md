# OctoFit Frontend (React 19 + Vite)

This presentation tier uses `react-router-dom` for navigation and fetches data from the backend API.

## Environment setup

Define `VITE_CODESPACE_NAME` in `.env.local`.

Example:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When set, the API base URL is:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api
```

Safe fallback is enabled. If `VITE_CODESPACE_NAME` is not set, the app uses:

```text
http://localhost:8000/api
```

This prevents invalid URLs such as `https://undefined-8000.app.github.dev`.

## Run

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
