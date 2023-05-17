import React,{useState,useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {BusinessApi} from 'services'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';

function debounce(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }

export default function Yelpsearch() {
    const [search, SetSearch] = useState('');
    const [suggession, SetSuggession] = useState([]);
    const [businessess, SetBusinessess] = useState([]);
    
    const onChange = async (value) => {
        const data = await BusinessApi.AutoComplite(value).then(res => {SetSuggession(res?.data?.categories) })
        console.log("data",data);
    }
    const debounceOnChange = React.useCallback(debounce(onChange, 1000), []);

    const SubmitSearch = () => { 

    }

    const SearchClick = (searchText) => {
        BusinessApi.SearchBsiness(searchText).then(res => { SetBusinessess(res?.data?.businesses)}, SetSuggession([]))
    }

  return (
    <Container maxWidth="lg">
        <Box my={2} pt={3} display="flex">
            <TextField fullWidth  label="Search" name="search"  onChange={e => debounceOnChange(e.target.value)} />
            <Button variant="contained" color="primary" onClick={SubmitSearch}> Search </Button>
        </Box>
        <Box>
            <List >
                {
                    suggession.map((sug,i) => {
                        return (
                            <ListItem key={i} onClick={() => SearchClick(sug?.alias)}>
                                {sug.title}
                            </ListItem>
                        )
                    })
                }
            </List>    
        </Box>
        
                <Box display="flex" boxShadow={1} flexWrap="wrap"   >
                {
                    businessess.map((business,i) => {
                            return(
                                    <Grid container xs={6} >
                                        <Grid item xs={4} >
                                            <Box p={2}>
                                                <img src={business?.image_url} alt="image" />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={8} >
                                            <Box p={2} >
                                                <h5>{business?.name}</h5>
                                                <p> <CallIcon /> {business?.display_phone}</p>
                                                <h3> {business?.price} </h3>
                                                <Box component="p" display="flex">
                                                        <Rating name="read-only" value={business?.rating} readOnly /> <span>{business?.review_count} </span>
                                                </Box>  
                                                <Box>
                                                    <LocationOnIcon /> {business?.location?.address1} , <b> city </b> : {business?.location?.city} 
                                                </Box>
                                                <Box>
                                                   <b> Country : </b> {business?.location?.country}
                                                </Box>  
                                            </Box>
                                        </Grid>
                                    </Grid>         
                            )
                    })
                }
           </Box>

    </Container>    
  )
}
