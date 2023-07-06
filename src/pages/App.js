import { Routers, store } from "../config";
import { Provider } from 'react-redux';


function App() {
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
}

export default App;
