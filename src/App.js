
import './App.css';

import DspList from './components/DspList';
import Editor from './components/Editor';




function App() {
  document.addEventListener('contextmenu', event => event.preventDefault());

  return (
    <div className='App'>
      <div className='section mt-0 pt-5'>
        <div className="columns">

          <div className="column">
            <div className='editor'>
              <Editor/>
            </div>
          </div>

          <DspList/>
          
        </div>
      </div>
      
    </div>
  );
}

export default App;
