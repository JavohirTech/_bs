import "./App.scss"
import "./styles/custom-bootstrap.scss"
import {Outlet} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/styles.css"

function App() {
  return (
            <Outlet/>
  );
}

export default App;