import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Card, CardImg, CardBody, CardTitle, CardText, Button} from "reactstrap"
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Form, Input } from "reactstrap"
import './show.css'


const ShowOneArticle = () => {
    const location = useLocation()
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')

    useEffect(() => {
        const getArticleAndComment = async () => {
            const articleAndComment = await fetch('/article/' + location.state.id)
            const articleAndCommentJson = await articleAndComment.json()
            setComments(articleAndCommentJson.comments)
        }
        getArticleAndComment()
    }, [content])

    const handleClick = async () => {
        const responseFromBack = await fetch(`/article/${location.state.id}/comment/new`, {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
                "token": "yADyeawBFB5tCQZ"
            },
            body: JSON.stringify({title: "Mon super titre",content: content})
        })
        const responseFromBackJson = await responseFromBack.json()
        console.log(responseFromBackJson)
        setContent('')
    }

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
            <ListGroup>
                {
                    comments.map((comment) => (
                        <ListGroupItem>
                            <ListGroupItemHeading>
                                {comment.title}
                            </ListGroupItemHeading>
                            <ListGroupItemText>
                                {comment.body}
                            </ListGroupItemText>
                        </ListGroupItem>
            
                    ))
                }
            </ListGroup>
            <Card>
                <Form className='formulaire'>
                    <Input 
                        placeholder='Lache un commentaire...' 
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        />
                    <Button color='success' onClick={() => handleClick()}>Valider</Button>
                </Form>
            </Card>
            
        </div>
    );
};

export default ShowOneArticle;