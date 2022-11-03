import './App.scss';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import {setBasePath} from '@shoelace-style/shoelace/dist/utilities/base-path';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/');

function App() {
    return (
        <div className="App sl-theme-dark">
        </div>
    );
}

export default App;
