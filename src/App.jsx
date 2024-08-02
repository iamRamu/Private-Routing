import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import InvestBuy from './components/InvestBuy'
import BrowseDetailedView from './components/BrowseDetailedView'
import NotFound from './components/NotFound'
import { createContext, useState } from 'react'
import EditProperty from './components/Property'

export const store = createContext()

const App = () => {
  const [likedCartIds, setLikedCartIds] = useState([])
  const [token, setToken] = useState("")
  return(
    <store.Provider value={{likedCartIds, setLikedCartIds, token, setToken}}>
      <div className='app-bg-container'>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<InvestBuy/>}/>
                  <Route path='/invest-buy' element={<BrowseDetailedView/>}/>
                  <Route path='/edit-property' element={<EditProperty/>}/>
                  <Route path='*' element={<NotFound/>}/>
              </Routes>
          </BrowserRouter>
      </div>
    </store.Provider>
  )
}
export default App