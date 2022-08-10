import Layout from 'components/Common/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
