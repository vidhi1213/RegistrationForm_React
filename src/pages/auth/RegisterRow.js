import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,Table } from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function  RegisterRow ({user,CheckSelected,DeleteRecord,EditRow}) {
    console.log("==================",user)
    return <>
            <tr >
                <td>
                    <input type="checkbox" name={user.id} id={user.id} onChange={(e) => CheckSelected(e, user)} checked={user.check} /> {'  '}
                    {user.profile ? <img src={user.profile} width="50" height="50" className='mr-2' /> : ''}
                    {user?.name}
                </td>
                <td>{user?.phone}</td>
                <td>{user?.email}</td>
                <td>{user?.gender}</td>
                <td>  <Button outline color="primary" onClick={() => EditRow(user.id)}><EditIcon /> </Button> <Button outline color="danger" onClick={() => DeleteRecord(user.id)}> <DeleteIcon /></Button></td>
            </tr>
        </>
}

function  areEqual (prevProps, nextProps) {
    if(prevProps.user !== nextProps.user){
        return true
    }else{
        return false
    }
}


export default React.memo(RegisterRow)