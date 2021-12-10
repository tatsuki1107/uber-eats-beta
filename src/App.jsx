import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

//pages
import Login from './pages/auth/Login/Login'
import SignUp from './pages/auth/SignUp/SignUp'
import Restaurants from './pages/Restaurants'
import Foods from './pages/Foods/food'
import Orders from './pages/Oders'
import HistoryOrders from './pages/HistoryOrders'


import { AuthProvider } from './AuthService';
import LoggedInRoute from './LoggedInRoute'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <LoggedInRoute exact path='/' component={Restaurants} />

          <Route exact path='/login' component={Login} />

          <Route exact path='/signup' component={SignUp} />

          <LoggedInRoute
            exact
            path='/:id/foods'
            component={Foods}
          />

          <LoggedInRoute exact path='/order' component={Orders} />

          <LoggedInRoute exact path='/history' component={HistoryOrders} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App;
