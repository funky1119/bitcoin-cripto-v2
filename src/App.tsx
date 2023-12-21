import { RouterProvider } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import router from "./router";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { ReactQueryDevtools } from "react-query/devtools";
import ThemeToggle from "./ThemeToggle";
import { useRecoilState } from "recoil";
import { applyThemeState } from "./state/atorms";

function App() {
  const [applyTheme, setApplyTheme] = useRecoilState(applyThemeState);
  const _changeTheme = () => {
    const type = applyTheme === "light" ? "dark" : "light";
    setApplyTheme(type);
  };

  return (
    <ThemeProvider theme={theme[applyTheme]}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
      <ThemeToggle onClick={_changeTheme} />
    </ThemeProvider>
  );
}

export default App;
