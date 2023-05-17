import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SendIcon from '@material-ui/icons/Send';
import Userside from 'components/chat/Userside';
import { sendEvent, getEvent, SucessAlert, ErrorAlert } from 'services/apiservices'
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'draft-js/dist/Draft.css';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Message from 'components/chat/Message';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Box from '@material-ui/core/Box';
import Cookies from 'universal-cookie';
import Sidebar from 'components/common/Sidebar';
import Modal from '@material-ui/core/Modal';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { ListGroup, ListGroupItem } from 'reactstrap';
import MainLayout from './MainLayout';

let sub;

let messages;
export default function Home() {
    let { userId } = useParams();
    const cookies = new Cookies();
    const [open, setOpen] = React.useState(false);
    const [limit, setLimit] = React.useState(20);
    const [userIdArr, setUserIdArr] = React.useState([]);

    const [chosenEmoji, setChosenEmoji] = useState(null);
    let navigate = useNavigate();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [sideActive, SetSideActive] = useState({})
    const [sendMessage, setSendMessage] = useState({ message: '', time: '', })
    const [getMessage, setGetMessage] = useState()
    const [welcome, SetWelcome] = useState(false)
    const senderId = useSelector(state => state?.users?.senderId);
    const [receverId, SetReceverId] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const [group, setGroupData] = React.useState({gname:''});
    const [userlist, SetUserList] = useState([])
    const [isgroup , SetIsGroup] = useState(false)

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };
   

    const InputChange = (e) => {
        setGroupData({...group,[e.target.name] : e.target.value })
    }
    const SendMessage = (e) => {
        e.preventDefault()
        let data = {
            senderId: senderId,
            message: sendMessage.message,
            receiverId: userId,
            isGroup: isgroup,
        };
        if(isgroup){
            data.groupId = userId;
            data.receiverId='';
            data.limit = limit + 20;

            setLimit(limit + 20)
        }
        if(sendMessage.message){
            setEditorState(EditorState.createEmpty())
            setSendMessage({message:''})
            sendEvent('chatDemo|sendMessage', data)
            forceUpdate()
        }
    }
    const Logout = () => {
        cookies.remove('Token',{ path: '/' })
        navigate(`/`);
    }
    const AddGroup = () => {
        let EmptyData = { userId:senderId }
        sendEvent('chatDemo|getAllUsersList', EmptyData)
    }

    const handleClose = () => {
        setOpen(false);
    };
    const ViewList = () => {
        <div>
            <h2 id="simple-modal-title">Add Member In to Group</h2>
            <Button variant="contained">Add</Button>
        </div>
    }

 

    const ScrollBtm = () => {
        var scrollBtm = document.querySelectorAll('.user_msg')[0];
        scrollBtm.scroll({ top: scrollBtm.scrollHeight, behavior: 'smooth' });
    }

    useEffect(() => {
        AddGroup()
        sub = getEvent(data => {
            switch (data.event) {
                case 'chatDemo|getAllUsersList':
                    if(!data.error){
                        SetUserList(data?.data?.docs);
                        if(userId){
                            let isChecked = data?.data?.docs.find((item) => item._id === userId)
                            SetIsGroup(isChecked?.isGroup)   
                        }
                    }
                    break;
                case 'chatDemo|getUserById':
                    if (!data.error) {
                        SetSideActive(data?.data);
                    }
                    break;
                case 'chatDemo|receiverMessage':
                    if (!data.error) {
                        messages.push(data.data)
                        setAllMessages(messages)
                        forceUpdate()
                        ScrollBtm()

                    }
                    break;
                case 'chatDemo|sendMessage':
                    if (!data.error) {
                        messages.push(data.data)
                        setAllMessages(messages)
                        forceUpdate()
                        ScrollBtm()
                    }
                    break;
                case 'chatDemo|getAllMessages':
                    if (!data.error) {
                        let allData = data.data.docs;
                        messages = data.data.docs;
                        setAllMessages(allData)
                        ScrollBtm()
                    }
                    break;
                case 'chatDemo|createGroup':
                    if (!data.error) {
                        handleClose()
                    }
                    break;
                default:
                    break;
            }
        })

    }, [])

    useEffect(() => {
        SetWelcome(userId ? false : true)
        if (userId && userlist.length) {
            let isChecked = userlist.find((item) => item._id === userId)
            let EmptyData = { 
                id: userId,
                isGroup:isChecked?.isGroup
            }
            SetIsGroup(isChecked?.isGroup)
            sendEvent('chatDemo|getUserById', EmptyData)
            let data = {
                senderId: senderId,
                receiverId: userId,
            }
            if(isChecked?.isGroup){
                data.groupId = userId;
                data.receiverId='';
                data.limit = limit;
            }
            sendEvent('chatDemo|getAllMessages', data)
        }
    }, [userId,userlist])

    const onEditorStateChange = (editorState) => {
        setSendMessage({ message: editorState.getCurrentContent().getPlainText() })
        setEditorState(editorState);
        console.log("editorState", editorState.getCurrentContent().getPlainText());
    };

    const viewMore = () => {
        
        let data = {
            senderId: senderId,
            receiverId: userId,
            limit:limit + 20,
            page:1
        }
        setLimit(limit + 20)
        sendEvent('chatDemo|getAllMessages', data)
    }

    const SelectUser = (e,Id) => {
        const {checked} = e.target
        let arry = userIdArr
        if(checked){
            arry.push(Id)
            setUserIdArr(arry)
        }else{
            let index = arry.indexOf(Id);
            if (index > -1) {
                arry.splice(index,1)
                setUserIdArr(arry)
            }
        }
        console.log("arry",arry);
    }

    const SendAddGroup = () => {
        let groupData = {
            groupName:group?.gname,
            members:userIdArr
        }
        sendEvent('chatDemo|createGroup', groupData)
    }

    return (
        <MainLayout>
            <Box display="flex" justifyContent="flex-end" className='mb-2 pt-2'>
                <Button variant="contained" color="primary" className='me-2' onClick={() => setOpen(true)}> <GroupAddIcon /> </Button>
                <Button variant="contained" color="primary"  onClick={Logout}> <ExitToAppIcon /> </Button>
            </Box>
            {
                welcome ?
                    <div className='welcome_wrp'>
                        <h2> Welcome to Chat App </h2>
                    </div>
                    :
                    <div className='top_right_side'>
                        <div className='right_top_bar'>
                            <Userside user={sideActive}  /> 
                        </div>
                        <div className='user_msg'>
                            {
                            allMessages && allMessages.length > 0 && allMessages.map((getMessage, i) => {
                                    return <div key={i} className={`message_wrap ${getMessage.senderId === senderId ? 'self_msg' : 'receiver_msg'}`}> <Message sendMessage={getMessage} /> </div>
                                })
                            }
                            {/* {
                                allMessages && allMessages.length >= 20 && <Button onClick={viewMore}>View More</Button>
                            } */}
                        </div>
                        <div className='form_wrap'>
                            <form onSubmit={SendMessage}>
                                <div className='message_input'>
                                    {/* <input type="text" name="message"  placeholder="Send Message" className='input' /> */}
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={onEditorStateChange}
                                        toolbarHidden
                                        toolbar={{
                                            options: ['inline', 'blockType'],
                                            inline: {
                                                inDropdown: false,
                                                options: ['bold', 'italic', 'underline'],
                                            },
                                            blockType: {
                                                inDropdown: false,
                                                options: ['Code'],
                                            }
                                        }}
                                    />
                                    {/* <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                    <div className='picker_icon'>
                                        <span variant="contained" className='pointer' {...bindTrigger(popupState)}> <InsertEmoticonIcon /> </span>
                                        <Popover
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                            }}
                                        >
                                            <Picker 
                                                onEmojiClick={ onEmojiClick }  
                                                pickerStyle={{ width: '400px' }}
                                                preload={true}
                                                skinTone={SKIN_TONE_MEDIUM_DARK}
                                            />
                                        </Popover>
                                    </div>    
                                )}
                                </PopupState> */}
                                    <span className='send_btn' onClick={SendMessage}>
                                        <SendIcon />
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
            }
            <Modal open={open} onClose={() => handleClose()} >
                <div className=''>
                    <div className='modal-dialog'>
                        <div className='modal-content modal-body'>                                    
                            <h4 id="simple-modal-title">Add Member In to Group</h4>
                            <div className='check_list'>
                                <FormGroup>
                                    <Label > Group Name</Label>
                                    <Input type="text" name="gname" value={group.gname} placeholder="Group Name" onChange={(e) => InputChange(e)} />
                                </FormGroup>
                                <ListGroup>
                                    <ListGroupItem>
                                        <div>  
                                            {
                                                userlist.map((item) => {
                                                    return(
                                                        <div>
                                                            <label htmlFor={item?._id}>
                                                                <input type="checkbox" name={item?.userName} id={item?._id} onChange={(e) => SelectUser(e,item?._id)} />
                                                                <span> {item?.userName} </span>
                                                            </label>
                                                        </div>
                                                    ) 
                                                })
                                            }                                   
                                            
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                            <Button variant="contained" onClick={SendAddGroup}>Add</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </MainLayout>
    )
}
