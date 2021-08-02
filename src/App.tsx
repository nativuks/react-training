import { Button } from "./components/Button";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { AuthContextProvider } from "./context/AuthContext";
import { Button1 } from "./components/Button1";
import { Room } from "./pages/Room";


function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Switch>
       <Route exact path="/" component= {Home} />
       <Route path="/rooms/new" component= {NewRoom} />
       <Route path="/rooms/:id" component= {Room} />
      </Switch>
       
    </AuthContextProvider>
    
  </BrowserRouter>
    
  );
}

export default App;
