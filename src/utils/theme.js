const THEME_CHANGE_EVENT = "pidify-theme-change";
const DEFAULT_THEME = "light";

const getUserThemeKey = (user) => {
  return "app_theme";
};

export const getStoredUser = () => {
  try {
    const localUser = localStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : null;
  } catch {
    return null;
  }
};

export const getStoredTheme = (user = getStoredUser()) => {
  const key = getUserThemeKey(user);
  return key ? localStorage.getItem(key) || DEFAULT_THEME : DEFAULT_THEME;
};

export const applyTheme = (theme = DEFAULT_THEME) => {
  const root = document.documentElement;
  const prefersDark =
    theme === "system" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = theme === "dark" || prefersDark;

  root.classList.toggle("dark", shouldUseDark);
  root.dataset.theme = shouldUseDark ? "dark" : "light";
  root.dataset.themePreference = theme;
};

export const saveTheme = (theme, user = getStoredUser()) => {
  const key = getUserThemeKey(user);
  if (key) {
    localStorage.setItem(key, theme);
  }

  applyTheme(theme);
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }));
};

export const THEME_EVENT = THEME_CHANGE_EVENT;
