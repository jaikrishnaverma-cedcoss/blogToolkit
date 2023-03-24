import { Provider } from "react-redux";
import "./App.css";
import Store from "./features/Store";
import Routers from "./Routers";
import { SnackbarProvider } from "notistack";
function App() {
  return (
    <Provider store={Store}>
    <SnackbarProvider maxSnack={3}>
      <Routers />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
