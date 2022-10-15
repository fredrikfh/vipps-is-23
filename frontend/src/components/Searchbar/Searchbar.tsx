import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import './Searchbar.css';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

interface ApiResponse {
    article: string,
    status: string,
    data: any,
    occurrences: number
}

function Searchbar() {

    const [loading, setLoading] = useState(false);

    const [searchString, setSearchString] = useState('');
    const [response, setResponse] = useState<ApiResponse>(); // json object

    const updateSearchString = (event: any) => {
        setSearchString(event.target.value);
    };

    // fetches from api every time searchString changes
    useEffect(() => {
        if (searchString == null || searchString === '') {
            return;
        }
        setLoading(true);
        fetch(`http://localhost:8080/article/${searchString}`, {
            method: 'GET',
        })
          .then((res) => res.json())
          .then((res) => {
            setResponse(res);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
          })
        }, 
    [searchString]);

    // Displays the word count of the article
    const textToReturn = () => {
        if (searchString === '' || loading) {
            return;
        }
        
        if (response?.occurrences === null) {
            return <p className="occurrenceText">Fant ingen artikkel</p>;
        } else {
            return <p className="occurrenceText"><b>{response?.occurrences}</b> ord</p>;
        }
    };

    // adds red border to textField if no article is found
    const textFieldToReturn = () => {
        if (response?.status === "does not exist" && searchString !== '') {
            return <TextField error fullWidth label="Søk wikipedia" className="searchTextField" variant="outlined" onChange={updateSearchString} value={searchString} InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }} />;
        } else {
            return <TextField fullWidth color="secondary" label="Søk wikipedia" className="searchTextField" variant="outlined" onChange={updateSearchString} value={searchString} InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }} />;
        }
    };

    const displayLoading = () => {
        return loading ? <LoadingIndicator /> : <></>;
    }

    return (
        <>
            {textFieldToReturn()}
            {textToReturn()}
            {displayLoading()}
        </>
    );
}

export default Searchbar;