import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Card, CardImg, CardBody, CardTitle, CardText, Button} from "reactstrap"
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';

const ArticleCard = (props) => {
    const navigate = useNavigate()
    const [like, setLike] = useState(false)
    const gotToArticle = (title) => {
        navigate('/my-article/' + props.article.id, {state: props.article})
    }

    return (
        <div>
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
                    {props.article.title} <FaHeart style={like ? {color: 'red'} : {color: 'gray'}} onClick={() => setLike(!like)} />
                </CardTitle>
                <CardText>
                    {props.article.body}
                </CardText>
                <Button onClick={() => gotToArticle(props.article)}>Voir article</Button>
                
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

export default ArticleCard;