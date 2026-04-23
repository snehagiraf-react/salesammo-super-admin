let navigateFn = null;

export const setNavigate = (navigate) => {
  navigateFn = navigate;
};

export const redirectToLogin = () => {
  if (navigateFn) {
    navigateFn("/login", { replace: true });
    return;
  }

  // Fallback for cases where router navigation is not yet registered.
  if (typeof window !== "undefined") {
    window.location.replace("/login");
  }
};