import React from 'react'; 
//import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import useToken from './useToken';


function App() 
{
  const { token, setToken } = useToken();

  console.log(token);
  console.log(setToken);

  if (!token) 
  {
    return <Login setToken={setToken} />
  }

  return (
    <div className = "wrapper">
      <div className="App">
        <h1>Game Nexus</h1>
      </div>

      <Dashboard />
    </div>
  );
}

export default App;


/*
class App extends Component {
  state = {
    response: {}
  };

  componentDidMount() {
    axios.get('/api/v1/say-something').then((res) => {
      const response = res.data;
      this.setState({response});
    });
  }

  render() {
    const [token, setToken] = useState();
    
    if (!token)
    {
      return (
        <Login setToken = {setToken} />
      )
    }

    return (
        <div className = "wrapper">
          <div className="App">
            <h1>Game Nexus</h1>
            <h1>{this.state.response.nazwa_projektu}</h1>
          </div>

          <BrowserRouter>
            <Switch>
              <Route path = "/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;*/