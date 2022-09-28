import './App.css';
import Navbar from './components/navbar/NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Articles from './articles/Articles'
import MyArticles from './articlesPerUser/ArticlesPerUser'
import ShowOneArticle from './showOneArticle/ShowOneArticle';

function App() {
  return (
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Articles />} />
            <Route path='/my-article' element={<MyArticles />} />
            <Route path='/my-article/:id' element={<ShowOneArticle />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
