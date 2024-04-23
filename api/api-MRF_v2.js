const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("firebase");

const app = express();
const PORT = process.env.PORT || 8080;

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
const db = firebase.firestore().collection('MRF');

app.use(bodyParser.json());

// ------------------------- API Endpoints -----------------------------
function API_MRF_v2(app, db) {
    // Endpoint para la documentación de la API V1
    app.get("/api/v1/gdp-growth-rates/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/32965505/2sA2xiYCme");
    });

    // Endpoint para la documentación de la API V2
    app.get("/api/v2/gdp-growth-rates/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/32965505/2sA35G52v3");
    });

    // Endpoint para cargar datos iniciales
    app.get("/api/v2/gdp-growth-rates/loadInitialData", (req, res) => {
        // Carga de datos inicial en Firebase
        db.get()
            .then(snapshot => {
                if (snapshot.empty) {
                    // Insertar datos si no existen
                    db.add(datos_MRF)
                        .then(() => res.sendStatus(200))
                        .catch(() => res.sendStatus(500));
                } else {
                    res.sendStatus(200);
                }
            })
            .catch(() => res.sendStatus(500));
    });

    // Endpoint para obtener datos
    app.get("/api/v2/gdp-growth-rates", (req, res) => {
        // Obtener parámetros de consulta
        const { frequency, unit, na_item, geo, time_period, obs_value, growth_rate_2030, growth_rate_2040, limit = 10, offset = 0, from, to } = req.query;

        // Construir consulta
        let query = db;
        if (frequency) query = query.where('frequency', '==', frequency);
        if (unit) query = query.where('unit', '==', unit);
        if (na_item) query = query.where('na_item', '==', na_item);
        if (geo) query = query.where('geo', '==', geo);
        if (time_period) query = query.where('time_period', '==', parseInt(time_period));
        if (obs_value) query = query.where('obs_value', '==', parseInt(obs_value));
        if (growth_rate_2030) query = query.where('growth_rate_2030', '==', parseInt(growth_rate_2030));
        if (growth_rate_2040) query = query.where('growth_rate_2040', '==', parseInt(growth_rate_2040));

        if (from && to) {
            query = query.where('time_period', '>=', parseInt(from)).where('time_period', '<=', parseInt(to));
        } else if (from) {
            query = query.where('time_period', '>=', parseInt(from));
        } else if (to) {
            query = query.where('time_period', '<=', parseInt(to));
        }

        // Ejecutar consulta y devolver resultados
        query.limit(parseInt(limit)).offset(parseInt(offset)).get()
            .then(snapshot => {
                const results = [];
                snapshot.forEach(doc => results.push(doc.data()));
                res.status(200).json(results);
            })
            .catch(() => res.sendStatus(500));
    });

    // Endpoint para buscar datos
    app.get(API_BASE + "/search", (req, res) => {
        const queryParams = req.query;
        const limit = parseInt(queryParams.limit) || 10; // Tamaño predeterminado de la página
        const offset = parseInt(queryParams.offset) || 0; // Desplazamiento predeterminado
        delete queryParams.limit;
        delete queryParams.offset;

        // Convertir los atributos numéricos a enteros si están presentes
        const numericAttributes = ["time_period", "obs_value", "growth_rate_2030", "growth_rate_2040"];
        numericAttributes.forEach(attr => {
            if (queryParams[attr]) {
                queryParams[attr] = parseInt(queryParams[attr]);
                if (isNaN(queryParams[attr])) {
                    return res.sendStatus(400);
                }
            }
        });

        if (queryParams.from && queryParams.to) {
            queryParams.time_period = { $gte: parseInt(queryParams.from), $lte: parseInt(queryParams.to) };
            delete queryParams.from;
            delete queryParams.to;
        }

        // Consultar la base de datos con el filtro construido y la paginación
        db_MRF.where(queryParams)
            .offset(offset)
            .limit(limit)
            .get()
            .then(snapshot => {
                const results = [];
                snapshot.forEach(doc => results.push(doc.data()));
                if (results.length === 0) {
                    res.sendStatus(404);
                } else {
                    res.send(results);
                }
            })
            .catch(error => {
                console.error(error);
                res.sendStatus(500);
            });
    });

    // Endpoint para obtener datos por geo
    app.get(API_BASE + "/:geo", (req, res) => {
        const geo = req.params.geo;

        // Consultar la base de datos con el filtro de geo
        db_MRF.where('geo', '==', geo)
            .get()
            .then(snapshot => {
                const results = [];
                snapshot.forEach(doc => results.push(doc.data()));
                if (results.length === 0) {
                    res.sendStatus(404);
                } else {
                    res.send(results);
                }
            })
            .catch(error => {
                console.error(error);
                res.sendStatus(500);
            });
    });

    // Endpoint para obtener datos por geo y time_period
    app.get(API_BASE + "/:geo/:time_period", (req, res) => {
        const geo = req.params.geo;
        const time_period = parseInt(req.params.time_period);

        // Verificar si el año es un número válido
        if (isNaN(time_period)) {
            return res.sendStatus(400);
        }

        // Consultar la base de datos con el filtro de geo y time_period
        db_MRF.where('geo', '==', geo)
            .where('time_period', '==', time_period)
            .get()
            .then(snapshot => {
                const results = [];
                snapshot.forEach(doc => results.push(doc.data()));
                if (results.length === 0) {
                    res.sendStatus(404);
                } else {
                    res.send(results[0]);
                }
            })
            .catch(error => {
                console.error(error);
                res.sendStatus(500);
            });
    });

    // Endpoint para crear un nuevo registro
    app.post(API_BASE + "/", (req, res) => {
        const newData = req.body;
        if (!newData.geo || !newData.time_period || !newData.frequency || !newData.unit || !newData.na_item || !newData.obs_value || !newData.growth_rate_2030 || !newData.growth_rate_2040) {
            return res.sendStatus(400);
        }

        db_MRF.add(newData)
            .then(() => res.sendStatus(201))
            .catch(error => {
                console.error(error);
                res.sendStatus(500);
            });
    });

    // Endpoint para actualizar un registro por geo
    app.put(API_BASE + "/:geo", (req, res) => {
        const geo = req.params.geo;
        const updatedData = req.body;

        db_MRF.where('geo', '==', geo)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    res.sendStatus(404);
                } else {
                    snapshot.forEach(doc => {
                        doc.ref.update(updatedData);
                    });
                    res.sendStatus(200);
                }
            })
            .catch(error => {
                console.error(error);
                res.sendStatus(500);
            });
    });

    // Endpoint para actualizar un registro por geo y time_period
    app.put(API_BASE + "/:geo/:time_period", (req, res) => {
        const geo = req.params.geo;
        const time_period = parseInt(req.params.time_period);
        const updatedData = req.body;

        db_MRF.where('geo', '==', geo)
            .where('time_period', '==', time_period)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    res.sendStatus(404);
                } else {
                    snapshot.forEach(doc => {
                        doc.ref.update(updatedData);
                    });
                    res.sendStatus(200);
                }
            })
            .catch(error => {
                console.error(error);
                res.sendStatus(500);
            });
    });

    // Endpoint para eliminar todos los registros
    app.delete(API_BASE + "/", (req, res) => {
        db_MRF.get()
            .then(snapshot => {
                if (snapshot.empty) {
                    res.sendStatus(404);
                } else {
                    snapshot.forEach(doc => {
                        doc.ref.delete();
                    });
                    res.sendStatus(200);
                }
            })
            .catch(error => {
                console.error(error);
                res.sendStatus(500);
            });
    });

    // Endpoint para eliminar un registro por geo
    app.delete(API_BASE + "/:geo", (req, res) => {
        const geo = req.params.geo;

        db_MRF.where('geo', '==', geo)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    res.sendStatus(404);
                } else {
                    snapshot.forEach(doc => {
                        doc.ref.delete();
                    });
                    res.sendStatus(200);
                }
            })
            .catch(error => {
                console.error(error);
                res.sendStatus(500);
            });
    });

    // Endpoint para eliminar un registro por geo y time_period
    app.delete(API_BASE + "/:geo/:time_period", (req, res) => {
        const geo = req.params.geo;
        const time_period = parseInt(req.params.time_period);

        db_MRF.where('geo', '==', geo)
            .where('time_period', '==', time_period)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    res.sendStatus(404);
                } else {
                    snapshot.forEach(doc => {
                        doc.ref.delete();
                    });
                    res.sendStatus(200);
                }
            })
            .catch(error => {
                console.error(error);
                res.sendStatus(500);
            });
    });



// ------------------------- Carga de datos iniciales -----------------------------

// Datos iniciales
const data = [
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'austria',
        time_period: 2020,
        obs_value: -6.6,
        growth_rate_2030: 30357,
        growth_rate_2040: 34360
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'austria',
        time_period: 2021,
        obs_value: 4.2,
        growth_rate_2030: 34832,
        growth_rate_2040: 39426
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'austria',
        time_period: 2022,
        obs_value: 4.8,
        growth_rate_2030: 51398,
        growth_rate_2040: 58177
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'belgium',
        time_period: 2020,
        obs_value: -5.3,
        growth_rate_2030: 71574,
        growth_rate_2040: 81533
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'belgium',
        time_period: 2021,
        obs_value: 6.9,
        growth_rate_2030: 44930,
        growth_rate_2040: 51183
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'belgium',
        time_period: 2022,
        obs_value: 3.0,
        growth_rate_2030: 32478,
        growth_rate_2040: 36998
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'czech_republic',
        time_period: 2020,
        obs_value: -5.5,
        growth_rate_2030: 42058,
        growth_rate_2040: 49646
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'czech_republic',
        time_period: 2021,
        obs_value: 3.6,
        growth_rate_2030: 15609,
        growth_rate_2040: 18424
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'czech_republic',
        time_period: 2022,
        obs_value: 2.4,
        growth_rate_2030: 17403,
        growth_rate_2040: 20542
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'denmark',
        time_period: 2020,
        obs_value: -2.4,
        growth_rate_2030: 66538,
        growth_rate_2040: 75680
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'denmark',
        time_period: 2021,
        obs_value: 6.8,
        growth_rate_2030: 38794,
        growth_rate_2040: 44123
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'denmark',
        time_period: 2022,
        obs_value: 2.7,
        growth_rate_2030: 49658,
        growth_rate_2040: 56480
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'spain',
        time_period: 2021,
        obs_value: 6.4,
        growth_rate_2030: 33894,
        growth_rate_2040: 37961
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'spain',
        time_period: 2022,
        obs_value: 5.8,
        growth_rate_2030: 36109,
        growth_rate_2040: 40443
    },
    {
        dataflow: 'estat:teco0115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'spain',
        time_period: 2023,
        obs_value: 2.5,
        growth_rate_2030: 32608,
        growth_rate_2040: 36522
    },
    {
        dataflow: 'estat:teco00115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'iceland',
        time_period: 2020,
        obs_value: -8.7,
        growth_rate_2030: 46784,
        growth_rate_2040: 33489
    },
    {
        dataflow: 'estat:teco00115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'iceland',
        time_period: 2021,
        obs_value: 2.8,
        growth_rate_2030: 54779,
        growth_rate_2040: 37992
    },
    {
        dataflow: 'estat:teco00115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'iceland',
        time_period: 2022,
        obs_value: 4.6,
        growth_rate_2030: 48313,
        growth_rate_2040: 33302
    },
    {
        dataflow: 'estat:teco00115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'italy',
        time_period: 2020,
        obs_value: -8.5,
        growth_rate_2030: 33212,
        growth_rate_2040: 27883
    },
    {
        dataflow: 'estat:teco00115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'italy',
        time_period: 2021,
        obs_value: 8.9,
        growth_rate_2030: 35994,
        growth_rate_2040: 28373
    },
    {
        dataflow: 'estat:teco00115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'italy',
        time_period: 2022,
        obs_value: 3.9,
        growth_rate_2030: 35442,
        growth_rate_2040: 29992
    },
    {
        dataflow: 'estat:teco00115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'bulgary',
        time_period: 2020,
        obs_value: -4.0,
        growth_rate_2030: 33221,
        growth_rate_2040: 28764
    },
    {
        dataflow: 'estat:teco00115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'bulgary',
        time_period: 2021,
        obs_value: 7.7,
        growth_rate_2030: 35482,
        growth_rate_2040: 33029
    },
    {
        dataflow: 'estat:teco00115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'bulgary',
        time_period: 2022,
        obs_value: 3.9,
        growth_rate_2030: 29843,
        growth_rate_2040: 31029
    },
    {
        dataflow: 'estat:teco00115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'albania',
        time_period: 2018,
        obs_value: 4.0,
        growth_rate_2030: 17335,
        growth_rate_2040: 19220
    },
    {
        dataflow: 'estat:teco00115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'albania',
        time_period: 2019,
        obs_value: 2.1,
        growth_rate_2030: 20123,
        growth_rate_2040: 22139
    },
    {
        dataflow: 'estat:teco00115(1.0)',
        last_update: '02/02/24 23:00:00',
        frequency: 'a',
        unit: 'clv_pch_pre',
        na_item: 'b1gq',
        geo: 'albania',
        time_period: 2020,
        obs_value: -3.5,
        growth_rate_2030: 19837,
        growth_rate_2040: 25398
    }

];
};
module.exports = { API_MRF_v2 };