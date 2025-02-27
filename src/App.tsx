import React, { useEffect } from 'react';
import './App.scss';
import globalHook from './common/hooks/globalHook';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';

function App(): React.ReactElement {
  const global = globalHook();
  const router = createBrowserRouter(AppRouter);

  async function loadScript(): Promise<void> {
    // global script load here
  }

  useEffect(() => {
    window.parent.document.title = global.appName;
    loadScript();
    // userEffect implement here
  }, [global.appName]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
