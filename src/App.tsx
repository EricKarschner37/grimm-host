import "./App.scss";
import "./_core.scss";
import { Home } from "./Home";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from '@datadog/browser-rum-react/react-router-v6'
import { Play } from "./Play/Play";
import { PageBoard } from "./PageBoard/PageBoard";
import { PageHost } from "./PageHost/PageHost";
import { datadogRum } from '@datadog/browser-rum';
import { reactPlugin } from '@datadog/browser-rum-react';

datadogRum.init({
    applicationId: '3ea73014-381d-48cb-8b30-c6c60e5ad4e2',
    clientToken: 'pub06d653881246223cdf4f55cd996bce7d',
    site: 'datadoghq.com',
    service:'grimm-host',
    env: 'prod',
    
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate:  100,
    sessionReplaySampleRate: 100,
    defaultPrivacyLevel: 'mask',
    plugins: [reactPlugin({ router: true })],
});

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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
