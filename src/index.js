import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from 'react-redux';
import store from './store';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";

// const styleLink2 = document.createElement("link");
// styleLink2.rel = "stylesheet";
// styleLink2.href = "https://cdnjs.cloudflare.com/ajax/libs/flickity/1.0.0/flickity.css";

// const styleScript = document.createElement("script");
// styleScript.type = "text/javascript";
// styleScript.src = " https://cdnjs.cloudflare.com/ajax/libs/flickity/1.0.0/flickity.pkgd.js";

document.head.appendChild(styleLink);


ReactDOM.render(
    <Provider store={store}>
        < App />
    </Provider>,
    document.getElementById("root")
);