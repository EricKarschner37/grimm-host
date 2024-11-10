import "./App.scss";
import "./_core.scss";
import { Home } from "Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Play } from "Play/Play";
import { PageBoard } from "PageBoard/PageBoard";
import { PageHost } from "PageHost/PageHost";
import { PageGames } from "PageGames/PageGames";

const router = createBrowserRouter([
  { path: "/play/:lobbyId", element: <Play /> },
  { path: "/board/:lobbyId", element: <PageBoard /> },
  { path: "/host/:lobbyId", element: <PageHost /> },
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
  {
    path: "/games",
    element: <PageGames />,
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
