import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import ArticleCard from '../components/ArticleCard';
import ('./article.css')


const Articles = () => {
    const [articles, setArticle] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')

    useEffect(() => {
        const getArticle = async () => {
            let articles;
            
            if(category){
                
                articles = await fetch('/article/category/' + category)
                //console.log('category', articles)
            }else{
                articles = await fetch('/all-article')
                //console.log(articles)
            }
            const articleJson = await articles.json()
            console.log('json', articleJson.posts)
            setArticle(articleJson.posts)
            const categoriesFromBack = await fetch('/categories')
            const categoriesFromBackJson = await categoriesFromBack.json()
            setCategories(categoriesFromBackJson)
        }

        getArticle()
    }, [category])

    const getCategoryFromChild = (categoryFromChild) => {
        //console.log(categoryFromChild)
        setCategory(categoryFromChild)
    }


    return (
        <div className='article'>
            
            <Container>
                <div className="displayPostByCat">
                    {
                        categories.map((item) => (
                            <Button className='button-cat' size="lg" color='warning' onClick={() => getCategoryFromChild(item.id)}>{item.theme}</Button>
                        ))
                    }
                </div>
                <Row>
                {
                    articles.map((article, index) => (
                    <Col md="4" key={index}>
                        {
                            categories.map((cat) => {
                                if( cat.id === article.categoryId ){
                                    return <ArticleCard key={article.id} article={article} handleParentProps={getCategoryFromChild} category={cat} />
                                }
                            })
                        }
                    </Col>
                        
                    ))
                }
                </Row>
            </Container>
            
            
        </div>
    );
};

export default Articles;