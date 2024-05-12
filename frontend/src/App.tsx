import { Routes, Route, Navigate} from 'react-router-dom';

import Layout from "./layouts/Layout"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout><p>Home page</p></Layout>}/>
        <Route path="/search" element={<Layout><p>Search page</p></Layout>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </>
  )
}

export default App
