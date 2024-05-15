import { Routes, Route, Navigate} from 'react-router-dom';

import Layout from "./layouts/Layout"
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout><p>Home page</p></Layout>}/>
        <Route path="/search" element={<Layout><p>Search page</p></Layout>}/>
        <Route path="/sign-in" element={<Layout><Login/></Layout>}/>
        <Route path="/register" element={<Layout><Register/></Layout>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </>
  )
}

export default App
