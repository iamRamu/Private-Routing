import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import InvestBuy from './components/InvestBuy'
import BrowseDetailedView from './components/BrowseDetailedView'
import NotFound from './components/NotFound'
import { createContext, useState } from 'react'

export const store = createContext()

const App = () => {
  const [likedCartIds, setLikedCartIds] = useState([])
  return(
    <store.Provider value={{likedCartIds, setLikedCartIds}}>
      <div className='app-bg-container'>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<InvestBuy/>}/>
                  <Route path='/invest-buy' element={<BrowseDetailedView/>}/>
                  <Route path='*' element={<NotFound/>}/>
              </Routes>
          </BrowserRouter>
      </div>
    </store.Provider>
  )
}
export default App