import React,{useState,useEffect,useMemo} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useNavigate } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {useDebouncedValue,TestDebouncing} from 'services'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function Header() {
    let navigate = useNavigate();
    const [value, setValue] = React.useState('topstories');

    const [search,SetSearch] = useState('')
    const [searchData,setSearchData] = useState([])
    const debouncedQuery = useDebouncedValue(search, 2000);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(":::newValue",newValue);
        navigate(`news/${newValue}`, { replace: true });
    };

    useEffect(() => {
        if (window?.location.pathname?.split('/')?.length > 2) {
            setValue(window?.location.pathname?.split('/')[2])
        }
    }, [window?.location?.pathname]);

    
    useEffect(async () => {
        // const  {data} = await TestDebouncing()
        // console.log("search",data);
        // setSearchData(data)
    }, []);
    


    const ChangeInput = async (e) => {
        const {name,value} = e.target
        console.log("value",value);
        SetSearch(value)

    }  
    
    const filteredEmployees = searchData.filter(item => {
        return item.title.toLowerCase().includes(debouncedQuery.toLowerCase());
    });

    return (
        <Container maxWidth="lg">
            {/* <Box m={2} pt={3}>
                <TextField fullWidth  label="Search" name="search" value={search} onChange={ChangeInput} />
            </Box> */}
            <Box>
                <List >
                    {
                        filteredEmployees.map((list,i) => {
                            return(
                                <ListItem key={i}>
                                    <ListItemText primary={list?.title} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Box>
            <Box >
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab value="topstories" label="Top" />
                        <Tab value="newstories" label="New" />
                        <Tab value="beststories" label="Best" />
                        <Tab value="askstories" label="Ask" />
                        <Tab value="jobstories" label="Jobs" />
                    </Tabs>
                </AppBar>
            </Box>
        </Container>
    )

}

export default Header;
