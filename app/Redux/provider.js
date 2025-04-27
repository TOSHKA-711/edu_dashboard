"use client"; 

import { Provider } from "react-redux";
import {store} from "./Store";


const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
