import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import configureStore from "./store";
import "./index.css";

const store = configureStore();

ReactDOM.render(
    <Router store={store} />,
    document.getElementById( "root" )
);
