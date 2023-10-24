import "./App.scss";
import "./_core.scss";
import { Home } from "Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Play } from "Play/Play";
import { PageBoard } from "PageBoard/PageBoard";

const router = createBrowserRouter([
  { path: "/play/:gameIndex", element: <Play /> },
  { path: "/board/:gameIndex", element: <PageBoard /> },
  {
    path: "/",
    element: <Home tab="play" />,
  },
  {
    path: "/play",
    element: <Home tab="play" />,
  },
  {
    path: "/host",
    element: <Home tab="host" />,
  },
  {
    path: "/board",
    element: <Home tab="board" />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
