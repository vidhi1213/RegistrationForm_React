import React,{useState,useEffect,useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,Table } from 'reactstrap';
import {Link} from 'react-router-dom'
import SimpleReactValidator from "simple-react-validator";
import { useNavigate } from "react-router-dom";
// import { addUsers } from 'store/actions/uesrs';
import Cookies from 'universal-cookie'
import RegisterRow from './RegisterRow';
import {sendEvent, getEvent, SucessAlert, ErrorAlert} from 'services/apiservices'
import { useDebouncedValue } from 'services';

let sub;


export default function Register() {
    let navigate = useNavigate();
    const cookies = new Cookies()
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const simpleValidator = useRef(new SimpleReactValidator({
        autoForceUpdate:this,
        className: 'text-danger',
        messages: {
            in: 'Passwords do not match',
        },
        validators: {
            name:{
                message: "Please use a valid :attribute",
                rule:function(val,params,validator){
                    return validator.helpers.testRegex(val,/^([a-zA-Z '. -]*)$/i) && params.indexOf(val) === -1
                }
            },
            email:{
                message: "Email Field is Require",
                rule:function(val,params,validator){
                    return validator.helpers.testRegex(val,/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && params.indexOf(val) === -1
                }
            },
        }
    }))

    const [user,setUser] = useState({id:"",name:"",phone:"",email:"",password:"",confirmpass:"",gender:"",profile:"",agree:false,check:false})
    const [gender,setGender] = useState([
        {
            name:"gender",
            value:"male",
            label:"Male"
        },
        {
            name:"gender",
            value:"female",
            label:"Female"
        },
        {
            name:"gender",
            value:"other",
            label:"Other"
        }
    ])
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);

    const [isEdit,setisEdit] = useState(false)
    const[selectedArray,setSelectedArray] = useState([])
    const [checkedAll, setCheckedAll] = useState(false);
    const [ischeck,setIsCheck]=useState(false)
    // const res = useDebouncedValue(user,1000)

    const handleChange = (e) => {
        // const {name,value} = e.target;
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUser({...user,[name]:value})
        // console.log('res',res)
    }

    const onFileChange = (event) => {
        let img = event.target.files[0];
        // setUser({...user,profile:URL.createObjectURL(img)})
        setUser({...user,profile:img.name})
    }

    const submitForm = (e) => {
        e.preventDefault();
        
        if (simpleValidator.current.allValid()) {
            if(isEdit){
                dispatch({type:'UPDATE_USERS',id:user.id,users:user})
                setisEdit(false)
                ClearData()
            }
            else{
                user.id = Math.round(Math.random()*10000 + 1 );
                dispatch({type:'ADD_USERS',users:user})
                let Userdata = {
                    userName:user.name,
                    email:user.email,
                    password:user.password,
                    confirmPassword:user.confirmpass
                }
                cookies.set('user',Userdata,{})
                sendEvent('chatDemo|register',Userdata)
                setUser({id:"",name:"",phone:"",email:"",password:"",confirmpass:"",gender:"",profile:"",agree:false})
            }
        } else {
                simpleValidator.current.showMessages();
                forceUpdate()
        }

    }

    
    useEffect(() => {
       sub = getEvent((data) => {
           switch (data.event) {
               case 'chatDemo|register':
                   if(!data.error){
                    SucessAlert("Account Create Success Fully !!")
                    navigate(`/`);
                    ClearData();
                   }else{
                    ErrorAlert( data.data.error)
                   }
                   break;
           
               default:
                   break;
           }
       })
    }, [])
    

    const ClearData = () =>{
        setUser({id:"",name:"",phone:"",email:"",password:"",confirmpass:"",gender:"",profile:"",agree:false})
        simpleValidator.current.hideMessages()
    }

    const EditRow = (id) => {
        setisEdit(true)
        const usersingle =  users.find(user => {
            return user.id === id
        });
        setUser(usersingle)
    }

    const DeleteRecord = (id) => {
        dispatch({type:'DELETE_USERS',id:id})
    }

    let selArray = []
    const CheckSelected = (e,user) => {
        const { checked } = e.target;
        console.log('users before',users);
        users.map(item => {
            if(item.id === user.id) item.check = checked;
        })
        console.log('users after',users);

        dispatch({type:'SET_ALL_USERS', users: users})
        forceUpdate();
    }

    const RemoveSelected = () => {
        dispatch({type:'REMOVEMULTIPLE_USERS',users:users})
        forceUpdate();
    }
    const SelectAllList = () => {
        users.map(item => {
            item.check = true;
        })
        dispatch({type:'SET_ALL_USERS', users: users})
        forceUpdate();
    }

    return (
        <Container >
            <Row>
                <Col sm="12" >
                    <h1 className="text-center">Register</h1>
                </Col>
            </Row>
            <form onSubmit={submitForm}>
                <Row>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="exampleEmail">Name</Label>
                            <Input type="text" name="name" value={user.name} id="name" placeholder="Full Name" onChange={handleChange} />
                            {simpleValidator.current.message('Name', user.name, `required|name`)} 
                        </FormGroup> 
                        <FormGroup>
                            <Label for="exampleEmail">Phone</Label>
                            <Input type="text" name="phone" value={user.phone} id="name" placeholder="99999999999" onChange={handleChange} />
                            {/* {simpleValidator.current.message('phone', user.phone, `required`)}  */}

                        </FormGroup> 
                        <FormGroup>
                            <div className={`${simpleValidator.current.fields.email ? '' : 'error_field'}`}>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="text" name="email" value={user.email} id="exampleEmail" placeholder="Enter Email id" onChange={handleChange} />
                            </div>
                            {simpleValidator.current.message('email', user.email, 'required|email')} 
                        </FormGroup> 
                        <FormGroup>
                            <Label for="exampleFile">Profile Picture</Label>
                            <Row>
                                <Col sm="8">
                                    <Input type="file" name="file" id="exampleFile" checked={user.agree}  onChange={(e) => onFileChange(e)} />
                                    <FormText color="muted">
                                    This is some placeholder block-level help text for the above input.
                                    It's a bit lighter and easily wraps to a new line.
                                    </FormText>
                                </Col>
                                <Col sm="4">
                                    {
                                        user.profile ? <img src={user.profile} width="100" height="100" /> : ''
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" value={user.password} placeholder="*******" onChange={handleChange}/>
                            {simpleValidator.current.message('password', user.password, `required`)}
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Confirm Password</Label>
                            <Input type="password" name="confirmpass" value={user.confirmpass} id="examplePassword" placeholder="*******" onChange={handleChange} />
                            {simpleValidator.current.message('confirmpass', user.confirmpass, `required|in:${user.password}`)}
                        </FormGroup>
                        
                        <FormGroup tag="fieldset">
                            <Label>Gender</Label>
                            {
                                gender.map((gen,i) => {
                                    return(
                                            <FormGroup key={i}>
                                                <Label>
                                                    <Input type="radio" name={gen.name} value={gen.value} onChange={handleChange} checked={user.gender === gen.value} />{' '} {gen.label}
                                                </Label>
                                            </FormGroup>
                                    )
                                })
                            }
                            {/* {simpleValidator.current.message('Gender', user.gender, `required`)} */}

                            {/* <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="gender" value="female" onChange={handleChange} />{' '} Female
                                </Label>
                            </FormGroup>
                            <FormGroup check disabled>
                                <Label check>
                                    <Input type="radio" name="gender" value="other" onChange={handleChange} />{' '} Other
                                </Label>
                            </FormGroup> */}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6" md="6">
                        <FormGroup>
                            <Label >
                            <Input type="checkbox" name="agree" value="agree" checked={user.agree}  onChange={handleChange} /> {' '}I agree with condition </Label>
                        </FormGroup>
                        {/* {simpleValidator.current.message('agree', user.agree, 'accepted')} */}
                    </Col>
                    <Col sm="6" md="6">
                        <div className="mb-2">
                            <Link to="/" >Back To Login</Link>
                        </div>
                    </Col>
                </Row>    
                <Button>{!isEdit ? "Submit" : "Edit" }</Button>
            </form>

            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length > 0 && users.map((user,i) => {
                            return (
                                <RegisterRow key={i} user={user} CheckSelected={CheckSelected}  DeleteRecord={DeleteRecord} EditRow={EditRow} />
                            )
                        })
                    }
                </tbody>
            </Table>
                    {
                        users.length > 0 ? 
                            <>
                                <Button  color="primary" onClick={RemoveSelected}>Remove Selected</Button> {' '}
                                <Button onClick={SelectAllList}>Select All</Button>
                            </>
                         :''
                    }
                   

        </Container>
    )
}
