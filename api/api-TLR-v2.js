const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("firebase");

const app = express();
app.use(bodyParser.json());

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
const db = firebase.firestore();
const collection = db.collection('TLR');

// API Tomás
function API_TLR_v2(app, db) {
  app.get('/api/v2/vehicles-stock/docs', (req, res) => {
    const documentationURL = 'https://documenter.getpostman.com/view/19421857/2sA2xiYCmf';
    res.redirect(documentationURL);
  });

  app.get('/api/v2/vehicles-stock/loadInitialData', async (req, res) => {
    try {
      const snapshot = await collection.get();
      if (snapshot.empty) {
        initialDatos.forEach(async data => {
          await collection.add(data);
        });
        res.sendStatus(201);
      } else {
        res.sendStatus(200);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/v2/vehicles-stock/search', async (req, res) => {
    const queryParams = req.query;
    try {
      let query = collection;
      for (const key in queryParams) {
        if (Object.hasOwnProperty.call(queryParams, key)) {
          query = query.where(key, '==', queryParams[key]);
        }
      }
      const snapshot = await query.get();
      const result = snapshot.docs.map(doc => doc.data());
      res.send(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/v2/vehicles-stock', async (req, res) => {
    try {
      const snapshot = await collection.get();
      const result = snapshot.docs.map(doc => doc.data());
      res.send(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/v2/vehicles-stock/:geo/:year', async (req, res) => {
    const geo = req.params.geo;
    const year = parseInt(req.params.year);
    try {
      const snapshot = await collection.where('geo', '==', geo).where('year', '==', year).get();
      if (snapshot.empty) {
        res.sendStatus(404);
      } else {
        const result = snapshot.docs[0].data();
        res.send(result);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/v2/vehicles-stock', async (req, res) => {
    const newData = req.body;
    try {
      await collection.add(newData);
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.put('/api/v2/vehicles-stock/:geo/:year', async (req, res) => {
    const geo = req.params.geo;
    const year = parseInt(req.params.year);
    const updatedData = req.body;
    try {
      await collection.doc(`${geo}-${year}`).set(updatedData);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.delete('/api/v2/vehicles-stock', async (req, res) => {
    try {
      const snapshot = await collection.get();
      snapshot.docs.forEach(async doc => {
        await doc.ref.delete();
      });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.delete('/api/v2/vehicles-stock/:geo/:year', async (req, res) => {
    const geo = req.params.geo;
    const year = parseInt(req.params.year);
    try {
      const snapshot = await collection.where('geo', '==', geo).where('year', '==', year).get();
      if (snapshot.empty) {
        res.sendStatus(404);
      } else {
        snapshot.docs.forEach(async doc => {
          await doc.ref.delete();
        });
        res.sendStatus(200);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
    // Datos Iniciales
let initialDatos = [
  {
    id: 1,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Albania',
    year: 2017,
    obs_value: 6583,
    flights_passangers: 18336,
    cars_deaths: 1079
  },
  {
    id: 2,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Albania',
    year: 2021,
    obs_value: 7867,
    flights_passangers: 26258,
    cars_deaths: 976
  },
  {
    id: 3,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Austria',
    year: 1990,
    obs_value: 9400,
    flights_passangers: 25762,
    cars_deaths: 958
  },
  {
    id: 4,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Austria',
    year: 1991,
    obs_value: 9400,
    flights_passangers: 23582,
    cars_deaths: 956
  },
  {
    id: 5,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Austria',
    year: 1992,
    obs_value: 9900,
    flights_passangers: 24887,
    cars_deaths: 931
  },
  {
    id: 6,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'España',
    year: 2003,
    obs_value: 56000,
    flights_passangers: 24580,
    cars_deaths: 878
  },
  {
    id: 7,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'España',
    year: 2004,
    obs_value: 57000,
    flights_passangers: 23372,
    cars_deaths: 768
  },
  {
    id: 8,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'España',
    year: 2005,
    obs_value: 58200,
    flights_passangers: 24235,
    cars_deaths: 730
  },
  {
    id: 9,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'España',
    year: 2006,
    obs_value: 60400,
    flights_passangers: 26353,
    cars_deaths: 691
  },
  {
    id: 10,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'España',
    year: 2007,
    obs_value: 61000,
    flights_passangers: 22210,
    cars_deaths: 679
  },
  {
    id: 11,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bélgica',
    year: 2008,
    obs_value: 16000,
    flights_passangers: 19744,
    cars_deaths: 633
  },
  {
    id: 12,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bélgica',
    year: 2009,
    obs_value: 16100,
    flights_passangers: 17677,
    cars_deaths: 552
  },
  {
    id: 13,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bélgica',
    year: 2010,
    obs_value: 16200,
    flights_passangers: 17055,
    cars_deaths: 523
  },
  {
    id: 14,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bélgica',
    year: 2011,
    obs_value: 16100,
    flights_passangers: 14031,
    cars_deaths: 531
  },
  {
    id: 15,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bélgica',
    year: 2012,
    obs_value: 16000,
    flights_passangers: 13733,
    cars_deaths: 455
  },
  {
    id: 16,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bélgica',
    year: 2013,
    obs_value: 15800,
    flights_passangers: 13115,
    cars_deaths: 430
  },
  {
    id: 17,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bulgaria',
    year: 2012,
    obs_value: 23000,
    flights_passangers: 12675,
    cars_deaths: 479
  },
  {
    id: 18,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bulgaria',
    year: 2013,
    obs_value: 23300,
    flights_passangers: 11562,
    cars_deaths: 432
  },
  {
    id: 19,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bulgaria',
    year: 2014,
    obs_value: 23603,
    flights_passangers: 10777,
    cars_deaths: 414
  },
  {
    id: 20,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bulgaria',
    year: 2015,
    obs_value: 24010,
    flights_passangers: 10119,
    cars_deaths: 409
  },
  {
    id: 21,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bulgaria',
    year: 2016,
    obs_value: 23359,
    flights_passangers: 8537,
    cars_deaths: 416
  },
  {
    id: 22,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bulgaria',
    year: 2017,
    obs_value: 21020,
    flights_passangers: 7837,
    cars_deaths: 344
  },
  {
    id: 23,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bulgaria',
    year: 2018,
    obs_value: 20818,
    flights_passangers: 9246,
    cars_deaths: 362
  },
  {
    id: 24,
    freq: 'A',
    vehicle: 'BUS_TOT',
    unit: 'NR',
    geo: 'Bulgaria',
    year: 2019,
    obs_value: 20687,
    flights_passangers: 9026,
    cars_deaths: 370
  },
  {
    id: 25,
    freq: 'A',
    vehicle: 'TRC',
    unit: 'NR',
    geo: 'Bélgica',
    year: 2014,
    obs_value: 44693,
    flights_passangers: 2532,
    cars_deaths: 1397
  }

];
};

module.exports = { API_TLR_v2 };



