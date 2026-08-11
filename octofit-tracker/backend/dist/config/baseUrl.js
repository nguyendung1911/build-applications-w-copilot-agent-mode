export function getBaseUrl(port = 8000) {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-${port}.app.github.dev`;
    }
    return `http://localhost:${port}`;
}
