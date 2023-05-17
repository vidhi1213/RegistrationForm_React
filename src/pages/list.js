import React,{useState,useEffect,useMemo} from 'react';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import LinkIcon from '@material-ui/icons/Link';
import {api, GetNews, onError, onSuccess} from './../services'
import { useParams } from "react-router-dom";
import Loader from 'components/common/Loader'

function ListPage() {
   const [rows,SetRoes] = useState([])
   const [count, setCount] = useState(21);
   const [types] = useState()
   const[total,SetTotal] = useState()
   const[loader,setLodaer] = useState(false)
   const [ids,SetIds] = useState([])
   const [list, setList] = useState([]);
   let { type } = useParams();
   const columns = [
    { id: 'title', label: 'Title', minWidth: 170, },
    { id: 'by', label: 'By', minWidth: 170, },
    { id: 'type', label: 'Type', minWidth: 170, },
    { id: 'score', label: 'Score', minWidth: 170, },
    { id: 'image', label: 'Image', minWidth: 170, },
   ]

    useEffect(async () => {
        setLodaer(true)
        const {data} = await GetNews.InitialNews(type||`topstories`)
        SetTotal(data.length)
        console.log("???InitialNews",data,data.length);
        SetIds(data);
        GetIDS(data,0 ,20)
    },[type])

    const showMore = async() => {
        setLodaer(true)
        const {data} = await GetNews.InitialNews(type ||`topstories`)
        SetTotal(data.length)
        console.log("??? showMore",data,data.length);
        let showmore =  await GetIDS(data,count, count + 20)
        setCount(count + 20)
    }

    const GetIDS = async (res,start,end) => {
        console.log("??? GetIDS",res,start,end);
        const arr = [];
        res.slice(start,end).map( item => arr.push(item));

        console.log("arr GetIDS",arr,ids);
        const resData = await GetNews.getDeatils(arr)
        console.log("===resData",resData);
        const results = await Promise.all(resData);
        console.log(":::===results",results);
        setList(results)
        setLodaer(false)
    }

  return (
        <>
        <Container maxWidth="lg"> 
            <h1>List </h1>
            <TableContainer component={Paper}>
                <Table  stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((row) => (
                        <TableRow >
                            <TableCell > {row?.data?.title}  </TableCell>
                            <TableCell > <PersonIcon /> {row?.data?.by}  </TableCell>
                            <TableCell > {row?.data?.type}  </TableCell>
                            <TableCell > {row?.data?.score}  </TableCell>
                            <TableCell > <LinkIcon /> {row?.data?.url}  </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            {
                (list.length > 0 && ( total != list.length))  ?
                    <button onClick={() => showMore()}>More</button>
                :''
            }
        </Container>
        {
            loader ? <Loader /> :''
        }
        </>
  )
}

export default ListPage