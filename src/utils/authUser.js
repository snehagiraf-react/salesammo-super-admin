/** Normalize login/API user payloads into a consistent shape for the UI. */
export const normalizeAuthUser = (raw, fallbackEmail = "") => {
  if (!raw || typeof raw !== "object") {
    return fallbackEmail
      ? { name: fallbackEmail.split("@")[0], email: fallbackEmail }
      : null;
  }

  const email = raw.email || fallbackEmail || "";
  const name =
    raw.name ||
    raw.fullName ||
    raw.username ||
    (email ? email.split("@")[0] : "Admin User");

  return {
    id: raw.id || raw._id || null,
    name,
    email,
    role: raw.role || null,
    status: raw.status || null,
  };
};

/** Read user claims from a JWT access token (legacy APIs that omit user). */
export const userFromAccessToken = (accessToken) => {
  if (!accessToken || typeof accessToken !== "string") return null;
  try {
    const payloadPart = accessToken.split(".")[1];
    if (!payloadPart) return null;
    const json = atob(payloadPart.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(json);
    return normalizeAuthUser(payload, payload.email);
  } catch {
    return null;
  }
};

export const extractLoginUser = (responseData, fallbackEmail = "") => {
  const raw =
    responseData?.user ||
    responseData?.admin ||
    (responseData?.email || responseData?.name
      ? responseData
      : null);

  return (
    normalizeAuthUser(raw, fallbackEmail) ||
    userFromAccessToken(responseData?.accessToken) ||
    normalizeAuthUser(null, fallbackEmail)
  );
};
