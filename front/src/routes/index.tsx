import Layout from 'components/Common/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Post from './Post'
import Profile from './Profile'
import Write from './Write'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='post/:postId' element={<Post />} />
          <Route path='profile' element={<Profile />} />
          <Route path='write' element={<Write />} />
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
