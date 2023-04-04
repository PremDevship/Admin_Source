import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import AdminRegister from "./AdminRegister";
import Teams from "./Teams";
import Usermenu from "./Usermenu";

function Router(){
    return(
        <div>
            <BrowserRouter>
            <Route exact path="/" component={AdminRegister} />
            <Route path="/login" component={AdminLogin} />
            <Route path="/Dashboard" component={AdminDashboard} />
            <Route path="/menu" component={Usermenu} />
            <Route path="/Teams" component={Teams} />
            </BrowserRouter>
        </div>
    )
}
export default Router;