import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

export default function CardBox(props) {
    const {user} = props.data
    console.log("props",props.data,user);
    return (
        <div>
            <Card>
                <CardBody>
                    <div>
                       <label>Country : </label> {props.data?.Country}
                    </div>
                    <div>
                       <label>Deaths : </label> {props.data?.Deaths}
                    </div>
                    <div>
                       <label>Confirmed : </label> {props.data?.Confirmed}
                    </div>
                    <div>
                       <label>Recovered : </label> {props.data?.Recovered}
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
