import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
    return ( <
        BrowserRouter >
        <
        Routes >
        <
        Route path = "/"
        element = { < Login / > }
        />

        <
        Route path = "/dashboard"
        element = { <
            PrivateRoute >
            <
            h1 > User Dashboard < /h1> <
            /PrivateRoute>
        }
        />

        <
        Route path = "/admin"
        element = { <
            PrivateRoute >
            <
            RoleRoute role = "admin" >
            <
            h1 > Admin Dashboard < /h1> <
            /RoleRoute> <
            /PrivateRoute>
        }
        /> <
        /Routes> <
        /BrowserRouter>
    );
}

export default App;