import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  searchForm: {
    height: '4.5em',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
    margin: 'auto',
  },
  searchInput: {
    width: '50%',
    height: '90%',
    border: 'none',
    backgroundColor: '#ffffff',
    '&:focus': {
      outline: 'none',
    }
  },
  button: {
    width: '10%',
    height: '90%',
    border: 'none',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    '&:focus': {
      cursor: 'pointer',
    }
  }
}
);

const SearchPlanet = ({ onSearchValue }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const classes = useStyles();

  function search(event) {
    event.preventDefault()
    onSearchValue(searchValue)
  }

  function onChangeValue(event) {
    setSearchValue(event.target.value)
  }

  return (
    <form className={classes.searchForm} onSubmit={search}>
      <input
        className={classes.searchInput}
        type="search"
        placeholder="Search a planet name"
        value={searchValue}
        onChange={onChangeValue} />
      <button className={classes.button} type="submit"><SearchIcon /></button>
    </form>
  )
}

export default SearchPlanet