import React,{useState,useEffect,useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {Searchpackage} from 'services'
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import _ from 'lodash'
// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Loader from '../components/common/Loader';

const { debounce } = _;

export default function Search() {
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [search, SetSearch] = useState('');
    const [total,setTotal] = useState()
    const [data,setData] = useState([])
    const [loader,setLoader] = useState(false)

    const[copydata,setCopydata]= useState([])

    const [size,setSize] = useState(10)
    const [from,setFrom] = useState(0)
    const [isfilter,setIsFilter] = useState()
    const debounceLoadData = useCallback(debounce(console.log, 2000), []);

    const [column,setColum] = useState([
        {
            id:'1',
            label:'Publisher',
            // key:'username',
            isFilter:false,
            showFilterIcon:false
        },
        {
            id:'2',
            label:'Package',
            key:'name',
            isFilter:false,
            showFilterIcon:true
        },
        {
            id:'3',
            label:'Links',
            // key:'link',
            isFilter:false,
            showFilterIcon:false
        },
        {
            id:'4',
            label:'Date',
            key:'date',
            isFilter:false,
            showFilterIcon:true
        },
    ])

// Select
const [age, setAge] = React.useState(10);
const [open, setOpen] = React.useState(false);
// Pagination
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);

    const ChangeInput = (e) => {
        const {name,value} = e.target
        SetSearch(value)

       const filterData =  copydata.filter((item) => {
                                return  item?.package?.name.includes(value)
                            })
                            console.log("filterData",filterData);
                            setData(filterData)

    }  

    const SubmitSearch = () => {
        SearchData()
        setFrom(0)
        // SetSearch('')
    }

    const SearchData = () => {
        console.log("SearchData from",from,"size",size);
        setLoader(true)
        Searchpackage(search,size,from).then(rs => {  
            setData(rs?.data?.objects)
            setCopydata(rs?.data?.objects)
            setTotal(rs?.data?.total)
            setPageCount(rs?.data?.total/size)
            setLoader(false)
        } )
    }

    const handlePageClick = async (event) => {
        const newOffset = (event.selected * size) % total;
        console.log("from",newOffset);
        setFrom(newOffset)
    }

    useEffect(() => {
        SearchData()
    }, [from,size]);
    
    // Select 
    const handleChange = (event) => {
        setAge(event.target.value);
        setSize(event.target.value)
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const filterData = (key,filterId) => {
       

        let colmata =  column.map(item => {
            if(item.id === filterId){
               if(item.isFilter === false){
                   item.isFilter = true
                   const sortedObjs = _.sortBy(data, [`package.${key}`]);
                    setData(sortedObjs)
                }else{
                    item.isFilter = false
                    const sortedObjs = _.reverse(_.sortBy(data, [`package.${key}`]));
                     setData(sortedObjs)
                }
            }else{
                    item.isFilter = false
                }
                return item
        })
        setColum(colmata)
                    
        // setIsFilter(!isfilter)

        // if(isfilter){
        //     const sortedObjs = _.sortBy(data, [`package.${key}`]);
        //     setData(sortedObjs)
        //     // setData(data.sort(UnSortComparator(key)))

        //     {console.log("iff  data>>>>>",sortedObjs)}
        // }else{
        //     const sortedObjs = _.reverse(_.sortBy(data, [`package.${key}`]));
        //     setData(sortedObjs)

        //     // setData(data.sort(NameComparator(key)))

        //     {console.log("else  data>>>>>",sortedObjs)}

        // }
        forceUpdate()
    }

    // const NameComparator = (property) => {
    //     var sortOrder = 1;
    //     if(property[0] === "-") {
    //         sortOrder = -1;
    //         property = property.substr(1);
    //     }
    //     return function (a,b) {
    //         /* next line works with strings and numbers, 
    //         * and you may want to customize it to your needs
    //         */
    //         var result = (a.package[property] < b.package[property]) ? -1 : (a.package[property] > b.package[property]) ? 1 : 0;
    //         return result * sortOrder;
    //     }
    // }
    // const UnSortComparator = (property) => {
    //     var sortOrder = 1;
    //     if(property[0] === "-") {
    //         sortOrder = -1;
    //         property = property.substr(1);
    //     }
    //     return function (a,b) {
    //         /* next line works with strings and numbers, 
    //         * and you may want to customize it to your needs
    //         */
    //         var result = (a.package[property] > b.package[property]) ? -1 : (a.package[property] < b.package[property]) ? 1 : 0;
    //         return result * sortOrder;
    //     }
    // }

    

   

  return (
    <Container maxWidth="lg">
        <Box m={2} pt={3} display="flex">
            <TextField fullWidth  label="Search" name="search" value={search} onChange={ChangeInput} />
            <Button variant="contained" color="primary" onClick={SubmitSearch}> Search </Button>
        </Box>

        <TableContainer component={Paper}>
            <Table  size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    {
                        column.map((col,i) => {
                            return (
                                <TableCell key={i} align="left" > {col?.label} {col.showFilterIcon ? <span style={{cursor:"pointer"}} onClick={() => filterData(col?.key,col?.id)}> {col?.isFilter ? <ArrowDownwardIcon /> : <ArrowUpwardIcon /> } </span>: ''} </TableCell>
                            )
                        })
                    }
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((item,i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell align="left">{item?.package?.publisher?.username}</TableCell>
                                    <TableCell align="left">{item?.package?.name}</TableCell>
                                    <TableCell align="left">{item?.package?.links?.npm}</TableCell>
                                    <TableCell align="left">{moment(item?.package?.date).format('DD-MM-YYYY')}</TableCell>
                                </TableRow>
                            )
                        })
                    }
               
                </TableBody>
            </Table>
        </TableContainer>



        <div className="custom_pagingtion">
            <Box display="flex" alignItems="center" >
                <Box display="flex" alignItems="center" >
                    <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={age}
                    onChange={handleChange}
                    >
                
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={250}>250</MenuItem>
                    </Select>

                    <Box ml={2}> {from+1} to {size+from} Total Records - {total} </Box>
                </Box>             
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </Box>  
        </div>
        {
            loader ? <Loader /> :''
        }
    </Container>    
  )
}
