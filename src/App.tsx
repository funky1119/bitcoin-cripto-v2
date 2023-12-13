import { RouterProvider } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import router from "./router";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
