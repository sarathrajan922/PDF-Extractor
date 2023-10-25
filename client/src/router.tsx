import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./components/common/error";
import Login from "./components/login/login";
import Upload from "./components/upload/upload";
import Editor from "./components/editor/editor";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Service from "./components/pages/Service";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "upload",
        element: <Upload />,
      },
      {
        path: "editor/:id",
        element: <Editor />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "service",
        element: <Service />,
      },
    ],
  },
]);

export default AppRouter;
