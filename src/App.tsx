import { RouterProvider } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import router from "./router";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
