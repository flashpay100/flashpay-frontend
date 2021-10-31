import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Signin from "./user-component/Signin.js"
import Signup from "./user-component/Signup.js"
import Home from "./user-component/Home.js"
import Profile from "./user-component/Profile.js"
import Transactions from "./transaction-component/Transactions.js"
import Cards from "./card-component/Cards.js"
import Error from "./global-component/Error.js"

export default function Components() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/cards" component={Cards} />
            <Route path="*" component={Error} />
          </Switch>
        </Router>
      </div>
    )
}