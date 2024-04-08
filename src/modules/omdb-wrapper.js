import axios from "axios";

const APIKEY = "386e41d9";

const Test = async (searchText) => {
  const requestString = `http://www.omdbapi.com/?apikey=386e41d9&s="Cars"`;
  const apiResponse = await axios.get(requestString);
  return apiResponse.data;
};

const OMDBSearchByPage = async (searchText, page = 1) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: {},
  };

  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`);
    returnObject.respuesta = true;
    returnObject.cantidadTotal = response.data.totalResults;
    returnObject.datos = response.data.Search;
  } catch (error) {
    console.error(error);
  }

  return returnObject;
};

const OMDBSearchComplete = async (searchText) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: {},
  };

  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`);
    returnObject.respuesta = true;
    returnObject.cantidadTotal = response.data.totalResults;
    returnObject.datos = response.data.Search;
  } catch (error) {
    console.error(error);
  }

  return returnObject;
};

const OMDBGetByImdbID = async (imdbID) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: {},
  };

  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`);
    returnObject.respuesta = true;
    returnObject.datos = response.data;
  } catch (error) {
    console.error(error);
  }

  return returnObject;
};

//const respuesta = await Test();
//console.log('respuesta', respuesta);



export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };