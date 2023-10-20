import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./components/common/error";
import Login from "./components/login/login";
import Navbar from "./components/navbar/navbar";

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                path:'login',
                element: <Login/>
            },
            {
                path:'nav',
                element: <Navbar/>
            }
        ]
    }
]);

export default AppRouter;