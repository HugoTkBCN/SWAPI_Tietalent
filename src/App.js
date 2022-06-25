import React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';

import PlanetsList from './components/PlanetsList';
import SearchPlanet from './components/SearchPlanet';
import PlanetStatistics from './components/PlanetStatistics';

const App = () => {
  const [planetsList, setPlanetsList] = React.useState([]);
  const [selectedPlanets, setSelectedPlanets] = React.useState([]);
  var data = [];

  React.useEffect(() => {
    getPlanets('https://swapi.dev/api/planets/');
  }, []);

  function getPlanets(url) {
    axios.get(url)
      .then(res => {
        const result = res.data;
        setPlanetsList([...planetsList, result.results]);
        Array.prototype.push.apply(data, result.results);
        if (result.next) {
          getPlanets(result.next);
        } else {
          setPlanetsList(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSearch(searchValue) {
    if (searchValue === '')
      getPlanets('https://swapi.dev/api/planets/');
    else
      setPlanetsList(planetsList.filter(planet => planet.name.toLowerCase().includes(searchValue.toLowerCase())));
  }

  function handlePlanetSelected(name, url) {
    axios.get(url)
      .then(res => {
        if (selectedPlanets.filter(e => e.name === name).length > 0) {
          setSelectedPlanets(selectedPlanets.filter(e => e.name !== name));
        } else {
          setSelectedPlanets([...selectedPlanets, res.data]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <Typography variant="h1" align="center" color="#ff2348">
        Star Wars Planets
      </Typography>
      <PlanetStatistics selectedPlanets={selectedPlanets} />
      <SearchPlanet onSearchValue={handleSearch}></SearchPlanet>
      <PlanetsList planetsList={planetsList} handlePlanetSelected={handlePlanetSelected} selectedPlanets={selectedPlanets} />
    </div>
  );
}

export default App;
