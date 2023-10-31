"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app")); // Corrected import path to the local file 'app.ts'
var dotenv_1 = __importDefault(require("dotenv"));
var validateEnv_1 = __importDefault(require("./utils/validateEnv"));
var users_controller_1 = __importDefault(require("./controllers/users.controller"));
dotenv_1.default.config();
(0, validateEnv_1.default)();
var app = new app_1.default([new users_controller_1.default()], Number(process.env.PORT));
// const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client();
// async function verify() {
//   const ticket = await client.verifyIdToken({
//       idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2MjYzZDA5NzQ1YjUwMzJlNTdmYTZlMWQwNDFiNzdhNTQwNjZkYmQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjI5NzA0NjQwMTQ1LXRrZnZoaXFkOGpkOWQ4ZXVoNGxpcWt2aTY5ajFuZGxlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjI5NzA0NjQwMTQ1LXRrZnZoaXFkOGpkOWQ4ZXVoNGxpcWt2aTY5ajFuZGxlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1NDc3Mjc4NzExNjA4MDcxOTg2IiwiZW1haWwiOiJtci5oYWR5LmJhNjlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI0Wm1CTVF5TGIwMWpLdHpzZnNKSmtBIiwibmJmIjoxNjk3Mjg2NDc3LCJuYW1lIjoiSGFkeSBCYWJhZWkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSS13dFJMY0JuQmFjQzdfYlBGNGJiNXZ4cElybU5PLWQ3YVFCOXJUSi1NSXc9czk2LWMiLCJnaXZlbl9uYW1lIjoiSGFkeSIsImZhbWlseV9uYW1lIjoiQmFiYWVpIiwibG9jYWxlIjoiZW4tR0IiLCJpYXQiOjE2OTcyODY3NzcsImV4cCI6MTY5NzI5MDM3NywianRpIjoiMjRhZmY3NTViZDM2ODU3ZGQ0OWRhMzljZDdhOWIxZDU2MmIyNWQ2ZCJ9.GyG8I8LjU3Tp-QNjG_DFDZBv5EUXnChH_KeswW8hE49w2lwFcWpeoLIuVDpprFoaqs0gypMnXEFpnvReNn6YIumkR2Bxi3Dfnin-Tr3X_n3zbclCL3CvtjOr5CWtOJ-VfxdU3F88dfl3QOeH77Qi-INvlHR0dRfG98CysBjf11aJz87hZkkxhjfSZPPF1uFo6W79xtGMXWIQ8AsBSNU-gDPJ2x_4zgwalU1_JYsyA0rIurlxjofiGDbIdJRmZPxTEtWYKARbJGcnD-fqWq7EtF7f_gid_ZljX_Phc-aK0c3Z936k3alHcvysFvnhikzjf4CwiEsTG9xvNjwyWFXQGQ",
//       audience: "629704640145-tkfvhiqd8jd9d8euh4liqkvi69j1ndle.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub'];
//   console.log(payload)
//   // If request specified a G Suite domain:
//   // const domain = payload['hd'];
// }
// verify().catch(console.error);
app.listen();
