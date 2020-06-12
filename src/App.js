import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./Containers/CheckOut/CheckOut";
function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={CheckOut} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
