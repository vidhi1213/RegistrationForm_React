import React, {useEffect,useState} from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import {  Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SendIcon from '@material-ui/icons/Send';
import Userside from 'components/chat/Userside';
import {sendEvent, getEvent, SucessAlert, ErrorAlert} from 'services/apiservices'
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { Editor } from "react-draft-wysiwyg";
import {EditorState, convertToRaw} from 'draft-js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'draft-js/dist/Draft.css';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Message from 'components/chat/Message';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,useParams } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Box from '@material-ui/core/Box';
import Cookies from 'universal-cookie';
import Sidebar from 'components/common/Sidebar';

function MainLayout({children }) {   
    const cookies = new Cookies();
    let navigate = useNavigate();
  
    let token =  cookies.get('Token');

  return (
      <>
      
        {
            token && 
                <div className='outer_chat'>
                    <Container>
                        <Row>
                            <Col sm="3" className=''>
                                <Sidebar  />
                            </Col>
                            <Col sm="9" className=''>
                                {children}
                            </Col>
                        </Row>
                    </Container>
                </div>
        }
      </>
  )
}

export default MainLayout