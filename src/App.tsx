import React, { useEffect, useState } from 'react';
import './App.scss';
import globalHook from './common/hooks/globalHook';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import NotReady from './common/components/notReady/NotReady';

function App(): React.ReactElement {
  const global = globalHook();
  const router = createBrowserRouter(AppRouter);
  const [isReady, setIsReady] = useState(true);

  async function loadScript(): Promise<void> {
    // global script load here
    await global.addScript('tabler', '/js/tabler.min.js', 'tablerReady', 10);
    await global.addScript('tablerDemo', '/js/demo.min.js', 'tablerDemo', 10);
    await global.addScript('demoTablerTheme', '/js/demo-theme.min.js', 'demoTablerTheme', 10);
    setIsReady(true);
  }

  useEffect(() => {
    window.parent.document.title = global.appName;
    loadScript();
    // userEffect implement here
  }, [global.appName]);

  if (isReady) {
    return (
      <RouterProvider router={router} />
    );
  }
  else {
    return (
      <NotReady></NotReady>
    );
  }
}

export default App;
