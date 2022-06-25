import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import CheckIcon from '@mui/icons-material/Check';

const useStyles = makeStyles({
  planetsList: {
    backgroundColor: '#ffffff',
    borderRadius: 3,
    color: '#001674',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
    height: '100%',
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    marginBottom: '2%',
  },
  planet: {
    borderRadius: 3,
    color: '#001674',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
    height: '100%',
    width: '25%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: '1%',
    padding: '1%',
    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
      cursor: 'pointer',
    }
  },
});

const PlanetsList = ({ planetsList, handlePlanetSelected, selectedPlanets }) => {
  const classes = useStyles();

  return (
    <div className={classes.planetsList}>
      {planetsList.length > 0 ?
        planetsList.map((item, index) => (
          <Card className={classes.planet} key={index} onClick={() => handlePlanetSelected(item.name, item.url)}>
            <CardContent sx={{ minWidth: 275 }}>
              <Typography variant="h5">
                {item.name}
              </Typography>
              <Typography component="p">
                {item.rotation_period}
              </Typography>
              <Typography component="p">
                {item.orbital_period}
              </Typography>
              <Typography component="p">
                {item.diameter}
              </Typography>
              <Typography component="p">
                {item.gravity}
              </Typography>
              <Typography component="p">
                {item.surface_water}
              </Typography>
              <Typography component="p">
                {item.population}
              </Typography>
            </CardContent>
            {selectedPlanets.filter(e => e.name === item.name).length > 0 ? (
              <CardContent>
                <CheckIcon />
              </CardContent>
            ) : null}
          </Card>
        ))
        : <Typography variant="h3">
          No planets found
        </Typography>}
    </div >
  );
}

export default PlanetsList;
