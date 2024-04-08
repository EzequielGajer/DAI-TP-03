import Alumno from "./src/models/alumno.js"
import {suma, resta, multiplicar, dividir } from "./src/modules/matematica.js"
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from './src/modules/omdb-wrapper.js';

import axios from "axios";
import express from "express"; //hacernpmiexpress
import cors from "cors"; //hacernpmicors

const app = express();
const port = 3000; //Elpuerto3000(http://localhost:3000)

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Ya estoy respondiendo!');
})

app.get('/saludar',(req,res)=>{
    res.send('Hello World!');
})

app.listen(port,()=>{
    console.log(`Example app listening on port${port}`)
})

app.get('/saludar/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.status(200).send(`Hola ${nombre}`);
});

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    const { ano, mes, dia } = req.params;
    const fecha = new Date(ano, mes-1, dia); // Meses en JavaScript van de 0 a 11
    console.log(fecha);
    if (isNaN(fecha)) {
        res.status(400).send('BadRequest');
    } else {
        res.status(200).send('OK');
    }
});

app.get('/matematica/suma', (req, res) => {
    const { n1, n2 } = req.query;
    const resultado = suma(Number(n1), Number(n2));
    res.status(200).send(resultado.toString());
});

app.get('/matematica/resta', (req, res) => {
    const { n1, n2 } = req.query;
    const resultado = resta(Number(n1), Number(n2));
    res.status(200).send(resultado.toString());
});

app.get('/matematica/multiplicar', (req, res) => {
    const { n1, n2 } = req.query;
    const resultado = multiplicar(Number(n1), Number(n2));
    res.status(200).send(resultado.toString());
});

app.get('/matematica/dividir', (req, res) => {
    const { n1, n2 } = req.query;
    if (Number(n2) === 0) {
        res.status(400).send('El divisor no puede ser cero');
    } else {
        const resultado = Number(n1) / Number(n2);
        res.status(200).send(resultado.toString());
    }
});

app.get('/omdb/searchbypage', async (req, res) => {
  const { search, p } = req.query;
  console.log(search, p);
  const result = await OMDBSearchByPage(search, p);
  res.status(200).json(result);
});

app.get('/omdb/searchcomplete', async (req, res) => {
  const search = req.query.search;
  const result = await OMDBSearchComplete(search);
  res.status(200).json(result);
});

app.get('/omdb/getbyomdbid', async (req, res) => {
  const imdbid = req.query.imdbid;
  console.log("imdbID", imdbid)
  const result = await OMDBGetByImdbID(imdbid);
  res.status(200).json(result);
});

const alumnosArray = []; 

alumnosArray.push(new Alumno("Esteban Dido" ,"22888444",20));
alumnosArray.push(new Alumno("Matias Queroso","28946255",51)); 
alumnosArray.push(new Alumno("Elba Calao" ,"32623391",18));

app.get('/alumnos', (req, res) => {
  res.status(200).json(alumnosArray);
});

app.get('/alumnos/:dni', (req, res) => {
  const { dni } = req.params;
  const alumno = alumnosArray.find((alumno) => alumno.dni === dni);
  if (alumno) {
    res.status(200).json(alumno);
  } else {
    res.status(404).json({ message: "Alumno no encontrado" });
  }
});

app.post('/alumnos', (req, res) => {
  const { username, dni, edad } = req.body;
  const alumno = new Alumno(username, dni, edad);
  alumnosArray.push(alumno);
  res.status(201).json({ message: "Alumno insertado correctamente" });
});

app.delete('/alumnos', (req, res) => {
    const { dni } = req.body;
    const index = alumnosArray.findIndex(alumno => alumno.dni === dni);
    if (index !== -1) {
      alumnosArray.splice(index, 1);
      res.status(200).send('Alumno eliminado correctamente');
    } else {
      res.status(404).send('No se encontró ningún alumno con ese DNI');
    }
  });
  