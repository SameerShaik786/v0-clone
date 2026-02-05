export function getLanguageFromFileName(fileName) {
  if (!fileName) return "plaintext"

  if (fileName.endsWith(".ts")) return "typescript"
  if (fileName.endsWith(".tsx")) return "typescript"
  if (fileName.endsWith(".js")) return "javascript"
  if (fileName.endsWith(".jsx")) return "javascript"
  if (fileName.endsWith(".json")) return "json"
  if (fileName.endsWith(".css")) return "css"
  if (fileName.endsWith(".html")) return "html"
  if (fileName.endsWith(".md")) return "markdown"

  return "plaintext"
}
