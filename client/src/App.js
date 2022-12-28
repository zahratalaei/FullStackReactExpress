import './App.css';

import Layout from './Pages/Layout';
import Home from './Pages/Home';
import {Routes, Route} from 'react-router-dom'
import AddNewPost from './Pages/AddNewPost';
import Post from './Pages/Post';
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/addNewPost' element={<AddNewPost/>} />
          <Route path='/post/:id' element={<Post/>} />
        </Route>
      </Routes>

      
    </div>
  );
}

export default App;
