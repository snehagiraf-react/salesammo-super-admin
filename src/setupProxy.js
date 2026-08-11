const { createProxyMiddleware } = require("http-proxy-middleware");

function getProxyTarget() {
  if (process.env.REACT_APP_PROXY_TARGET) {
    return process.env.REACT_APP_PROXY_TARGET.replace(/\/+$/, "");
  }

  const apiBase = process.env.REACT_APP_API_BASE_URL;
  if (apiBase) {
    try {
      return new URL(apiBase).origin;
    } catch {
      // fall through
    }
  }

  return "https://salesammo-api.girafdev.com";
}

/**
 * Dev proxy: browser calls same-origin /api/*, CRA forwards to the real API.
 * Avoids CORS when developing against girafdev/Render from localhost.
 */
module.exports = function setupProxy(app) {
  const target = getProxyTarget();
  console.log(`[setupProxy] /api -> ${target}`);

  app.use(
    "/api",
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: true,
      logLevel: "warn",
    })
  );
};
