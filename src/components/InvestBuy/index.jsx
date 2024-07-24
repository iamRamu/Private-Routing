import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'
import InvestBuyItem from '../InvestBuyItem'
import { FaSearch } from 'react-icons/fa'
import { FaLocationCrosshairs } from "react-icons/fa6";
import { store } from '../../App'
import {BallTriangle} from 'react-loader-spinner'

const InvestBuy = () => {
    const [sites, setSites] = useState(null)
    const [pageLimit, setPageLimit] = useState(4)
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0);
    const [userSearch, setuserSearch] = useState("")
    const [specificSearch, setSpecificSearch] = useState("")
    const {token, setToken} = useContext(store)
    // const apiUrl = "http://devapi.telosamerica.com/buypage?deafault=true&page=1&pageLimit=2&sorting=&search="
    useEffect(() => {
        const apiUrl = `http://devapi.telosamerica.com/buy?page=${page}&pageLimit=${pageLimit}&search=${specificSearch}`
        const countApiData = `http://devapi.telosamerica.com/buy?search=${specificSearch}&count=true`
        const loginApiUrl = "http://devapi.telosamerica.com/user"
        const options = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({email : "karthikucr@yopmail.com", password : "Karthik@123"}),
            
        }
        const getUserToken = async() => {
            const response = await fetch(loginApiUrl, options)
            const data = await response.json()
            //console.log("getUserToken", data)
            setToken(data.token)

        }
        getUserToken()
        const getSites = async() => {
            const response = await axios.get(apiUrl, {headers : {
                Authorization : `${token}`,
                'Content-Type': 'application/json'
            }})
            const data = response.data.data
            setSites(page > 1 && sites ? [...sites, ...data] : data)
        }
        getSites()

        const getSitesCount = async() => {
            const response = await axios.get(countApiData, {headers : {
                Authorization : `${token}`,
                'Content-Type': 'application/json'
            }})
            //const data = response.data.data
            //setSites(page > 1 && sites ? [...sites, ...data] : data)
            //console.log("count", response.data.count)
            setCount(response.data.count)
        }
        getSitesCount()
    },[pageLimit, page, specificSearch, token])

    const toggleSelfLike = id => {
        const filteredSites = sites.map(eachFilterSite => {
            if(eachFilterSite._id === id){
                return {...eachFilterSite, selfLike : !eachFilterSite.selfLike}
            }
            return eachFilterSite
        })
        //console.log("filteredSite", filteredSites)
        setSites(filteredSites)
    }

    const handlePageLimit = () => {
        //setPageLimit(prev => prev+2)
        setPage(prev => prev+1)
    }

    const handleUserSearch = () => {
        setSpecificSearch(userSearch)
        setPage(1)
    }
   


    return(
        <div className='invest-buy-bg-container'>
            <div className='search-container'>
                <FaLocationCrosshairs className='location-icon'/>
                <input type='text' className='search' onChange={e => setuserSearch(e.target.value)} placeholder='Location Search'/>
                <FaSearch className='search-icon' onClick={handleUserSearch}/>
            </div>
            <div className='invest-buy-items-container'>
                {sites && sites.map(eachSite => <InvestBuyItem siteDetailes={eachSite} key={eachSite._id} toggleSelfLike={toggleSelfLike}/>)}
            </div>
            {sites ?
                sites.length < count &&
                <button className='invest-but-load-more-button' onClick={handlePageLimit}>Load More</button>
                :
                <div className='loader-container'>
                    <BallTriangle
                        height={100}
                        width={100}
                        radius={5}
                        color="#4fa94d"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            }
            
        </div>
    )
}
export default InvestBuy