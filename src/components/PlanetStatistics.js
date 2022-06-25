import React from 'react';
import {
  Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const useStyles = makeStyles({
  planetStatistics: {
    backgroundColor: '#ffffff',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
    height: '100%',
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 'auto',
    color: '#001674',
    marginBottom: '2%',
  },
  planetStatistic: {
    backgroundColor: '#ffffff',
    height: '100%',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: '1%',
  },
  contentStatistic: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    width: '100%',
  }
});

const PlanetStatistics = ({ selectedPlanets }) => {
  const [data, setData] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    if (selectedPlanets.length > 0) {
      var tmp = [
        {
          name: 'Rotation Period',
          planets: []
        },
        {
          name: 'Orbital Period',
          planets: []
        },
        {
          name: 'Diameter',
          planets: []
        },
        {
          name: 'Gravity',
          planets: []
        },
        {
          name: 'Surface Water',
          planets: []
        },
        {
          name: 'Population',
          planets: []
        }
      ];
      selectedPlanets.map(item => {
        if (!isNaN(item.rotation_period)) tmp[0].planets.push({ name: item.name, x: item.rotation_period });
        if (!isNaN(item.orbital_period)) tmp[1].planets.push({ name: item.name, x: item.orbital_period });
        if (!isNaN(item.diameter)) tmp[2].planets.push({ name: item.name, x: item.diameter });
        const gravity = item.gravity.split(' ')[0];
        if (!isNaN(gravity)) tmp[3].planets.push({ name: item.name, x: gravity });
        if (!isNaN(item.surface_water)) tmp[4].planets.push({ name: item.name, x: item.surface_water });
        if (!isNaN(item.population)) tmp[5].planets.push({ name: item.name, x: item.population });
      })
      setData(tmp);
    } else {
      setData([]);
    }
  }, [selectedPlanets]);

  return (
    <div className={classes.planetStatistics}>
      {data !== [] ? data.map((item, index) => {
        return (
          <Card key={index + item.name} className={classes.planetStatistic}>
            <CardContent className={classes.contentStatistic}>
              <h3> {item.name} </h3>
              <RadarChart cx={150} cy={150} outerRadius={90} width={300} height={300} data={item.planets}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar dataKey="x" fill="red" fillOpacity={0.5} />
              </RadarChart>
            </CardContent>
          </Card>
        )
      }) : null}
    </div>
  )
}

export default PlanetStatistics;