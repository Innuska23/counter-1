import { Provider } from 'react-redux';
import { Counter } from '../features/counter/ui/counter/Counter';
import { store } from './store/store';

import './App.css';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
      </div>
    </Provider>
  );
}

export default App;