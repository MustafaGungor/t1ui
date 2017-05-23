import React from "react";
import {render} from "react-dom";
import Switch from "app/Switch";
import {Application} from "robe-react-commons";
import template from "es6-template-strings"
import Locale from "robe-react-ui/lib/assets/tr_TR.json"; // eslint-disable-line import/no-unresolved

const app = document.getElementById("app");

// ****FOR PROD****
// window.applicationRootPath = "/robe/admin-ui/";

// ****FOR DEV****
// window.applicationRootPath = "/";
//debugger;


const hostName = window.location.origin;
// const hostName = "http://localhost:1990";


Application.setBaseUrlPath(hostName + "/mebitech-tgs");
Application.loadI18n(Locale);


render((<Switch />), app);
