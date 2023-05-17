import React,{useState,useEffect,useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,Table } from 'reactstrap';
import {Link} from 'react-router-dom'
import SimpleReactValidator from "simple-react-validator";
import { useNavigate } from "react-router-dom";
import Step1 from '../auth/steps/step1'
import Step2 from '../auth/steps/step2'
import Step3 from '../auth/steps/step3'

export default function StepForm() {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    let navigate = useNavigate();

    const form1Validator = useRef(new SimpleReactValidator({ autoForceUpdate:this }))
    const form2Validator = useRef(new SimpleReactValidator({ autoForceUpdate:this }))
    const form3Validator = useRef(new SimpleReactValidator({ autoForceUpdate:this }))
    // Step Form
    const [activeStep,setActiveStep] = useState(1);
    const allForm = [
        {
          Step1: {
            firstname: '',
            lastname: '',
            email: ''
          }
        },
        {
          Step2: {
            email: '',
            profile: '',
            gender: ''
          }
        },
        {
          Step3: {
            password: '',
            confirmpass: '',
          }
        },
    ]
    const [user,setUser] = useState({id:"",fname:"" ,lname:"",phone:"",email:"",password:"",confirmpass:"",gender:"",profile:"",agree:false,check:false})
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
    const handleChange = (e) => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUser({...user,[name]:value})

        forceUpdate()
        
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (form3Validator.current.allValid()) {
            user.id = Math.round(Math.random()*10000 + 1 );
            
            // dispatch({type:'ADD_USERS',users:user})
            NextForm(activeStep)

            navigate('/')
            
        } else {
            form3Validator.current.showMessages();
            console.log("simpleValidator.current",form3Validator.current);
            forceUpdate()
        }

    }

    const BackForm = (e) => {
        setActiveStep(activeStep-1)
    }

    const NextForm = (e, STEP) => {
        console.log(form1Validator.current.allValid(),form2Validator.current,form3Validator.current);
        if(STEP===1 ? form1Validator.current.allValid() : STEP === 2 ? form2Validator.current.allValid() : form3Validator.current.allValid() ){
            setActiveStep(activeStep+1)
        }
        else{
            if(STEP === 1)form1Validator.current.showMessages();
            if(STEP === 2)form2Validator.current.showMessages();
            if(STEP === 3)form3Validator.current.showMessages();
            
            forceUpdate()
        }



    }

    const ChangeTab = (index) => {
        setActiveStep(index)
    }

    return (
        <Container >
            {console.log("activeStep",activeStep)}
            <Row>
                <Col sm="12" >
                    <h1 className="text-center">Register</h1>
                </Col>
            </Row>
            <ul className='tabstep'>
                {
                    allForm.map((item,i) => {
                        return (
                            <li key={i}  className={`${activeStep === i+1 ? 'active' : ''}`}>
                                <span onClick={() => ChangeTab(i+1)}>{i+1}</span>    
                            </li>
                        )
                    })
                }
            </ul>
            <form onSubmit={(e) => submitForm(e)}>
                <Row>
                    { activeStep === 1 && <Step1 user={user} handleChange={handleChange}  form1Validator={form1Validator} /> }
                    { activeStep === 2 && <Step2 user={user} handleChange={handleChange} gender={gender} form2Validator={form2Validator} /> }
                    { activeStep === 3 && <Step3 user={user} handleChange={handleChange} form3Validator={form3Validator} /> }
                </Row>
               
                {
                    activeStep > 1 ? <Button className='me-2' onClick={(e) => BackForm(e)}>Back</Button>  : ' '
                }
                {
                    activeStep !== allForm.length && <Button className='me-2'  onClick={(e) => NextForm(e ,activeStep)}>Next</Button>
                }
                {
                    activeStep === allForm.length && <Button className='me-2' onClick={(e) => submitForm(e)}>Submit</Button>
                }

            </form>
        </Container>
    )
}
