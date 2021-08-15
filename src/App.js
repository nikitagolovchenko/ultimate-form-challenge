import { ThemeProvider, CssBaseline } from '@material-ui/core';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Step1 from './Step1';

const Step2 = () => <>Step 2</>;
const Step3 = () => <>Step 3</>;
const Result = () => <>Result</>;

function App() {
  return (
    <>
      <CssBaseline/>
      <Header/>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Step1/>
          </Route>
          <Route path="/step2" exact>
            <Step2/>
          </Route>
          <Route path="/step3" exact>
            <Step3/>
          </Route>
          <Route path="/result" exact>
            <Result/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
