import React from "react";
// Handle console logs
// import "./utils/dropconsole";
// ROUTER
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./navigation/routerConfig";
import "./App.css";
import { GlobalProvider } from "./context/globalState";

function App() {  

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
