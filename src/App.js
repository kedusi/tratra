import { Switch } from 'react-router';
import './App.css';
import Details from './components/Details';
import Setras from './components/Setras';

function App() {

  return (
    <div className="App">
      <Setras />
      <Details setraName='Fill Suite De-Gowning' />
    </div>
  );
}

export default App;
