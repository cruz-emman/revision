import Store from "@mui/icons-material/Store";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux'
import { store, persistor } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading="null" persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
  document.getElementById("root")
);
