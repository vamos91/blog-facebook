import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Card, CardImg, CardBody, CardTitle, CardText, Button} from "reactstrap"
import './show.css'


const ShowOneArticle = () => {
    const location = useLocation()

    useEffect(() => {
        const getArticleAndComment = async () => {
            const articleAndComment = await fetch('/article/' + location.state.id)
            const articleAndCommentJson = await articleAndComment.json()
            console.log(articleAndCommentJson)
        }
        getArticleAndComment()
    }, [])


    return (
        <div className='show-one-article'>
            <Card className="my-2">
                <CardImg
                alt="Card image cap"
                src="https://picsum.photos/900/180"
                style={{
                    height: 180
                }}
                top
                width="50%"
                />
                <CardBody>
                <CardTitle tag="h5">
                    {location.state.title}
                </CardTitle>
                <CardText>
                    {location.state.body}
                </CardText>
                <CardText>
                    <small className="text-muted">
                    Last updated 3 mins ago
                    </small>
                </CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default ShowOneArticle;