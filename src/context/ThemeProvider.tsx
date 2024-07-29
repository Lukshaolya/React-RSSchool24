import { createContext, useContext, useState, PropsWithChildren } from 'react';

type Themes = 'light' | 'dark';

interface ThemeContextType {
  theme: Themes;
  change: () => void;
}

export const THEME_LIGHT: Themes = 'light';
export const THEME_DARK: Themes = 'dark';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(THEME_DARK);

  const change = () => {
    const newTheme = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    console.log(newTheme);
    setTheme(newTheme);
    changeCSSStyles(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, change }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const changeCSSStyles = (theme: Themes) => {
  const root = document.querySelector(':root') as HTMLElement;
  const CSS = ['bg', 'personalinfo', 'input'];
  CSS.forEach((element) => {
    root.style.setProperty(
      `--theme-default-${element}`,
      `var(--theme-${theme}-${element})`,
    );
  });
};
