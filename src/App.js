import './App.css';
import Login from './Components/Login'
import Chat from './Components/Chat';
import Messages from './Components/Messages';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Chat />
  },
  {
    path: "/signin",
    element: <Login />
  },
  {
    path: "/messages",
    element: <Messages />
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
