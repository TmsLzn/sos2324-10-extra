const express = require("express");
const bodyParser = require("body-parser");
const { API_TLR_v2 } = require("./api/api-TLR-v2.js");
const { API_MRF_v2 } = require("./api/api-MRF-v2.js");
const cors = require("cors");
const path = require("path");
const firebase = require("firebase");

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDHEZiG8ikc4OPZ7dIb5Ar-2su_3l4GMjs",
    authDomain: "sos2324-10-extra.firebaseapp.com",
    projectId: "sos2324-10-extra",
    storageBucket: "sos2324-10-extra.appspot.com",
    messagingSenderId: "476945014290",
    appId: "1:476945014290:web:dfd21a38211c75863402cb",
    measurementId: "G-ZFN5KSKL37"
};

firebase.initializeApp(firebaseConfig);
const db_TLR = firebase.firestore().collection('TLR');
const db_MRF = firebase.firestore().collection('MRF');

const app = express();
const PORT = process.env.PORT || 8080;

// Activar CORS
app.use(cors());
app.use(bodyParser.json());

// API Endpoints
API_TLR_v2(app, db_TLR);
API_MRF_v2(app, db_MRF);

// Uso del handler
app.use(handler);

// Establecer subdirectorios de la web
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/", express.static("./public"));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
