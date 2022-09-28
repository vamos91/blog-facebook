import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ArticleCard from '../components/ArticleCard';
import('./article.css')

const Articles = () => {
    const [articles, setArticle] = useState([])

    useEffect(() => {
        const getArticle = async () => {
            const articles = await fetch('/all-article')
            const articleJson = await articles.json()
            setArticle(articleJson.posts)
        }

        getArticle()
    }, [])

    return (
        <div className='article'>
            <Container>
                <Row>
                {
                    articles.map((article) => (
                    <Col md="4">
                        <ArticleCard key={article.id} article={article} />
                    </Col>
                        
                    ))
                }
                </Row>
            </Container>
            
            
        </div>
    );
};

export default Articles;