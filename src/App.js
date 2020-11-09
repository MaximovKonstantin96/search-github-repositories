import { Provider } from "react-redux";
import store from "./redux/store";
import { Search } from "./pages";

function App() {
  return (
    <Provider store={store}>
      <Search />
    </Provider>
  );
}

export default App;
