import { useContext } from 'react'
import './index.css'
import { FaHeart , FaRegHeart} from "react-icons/fa"
import {Link, useNavigate} from 'react-router-dom'
import { store } from '../../App'

const InvestBuyItem = props => {
    const {likedCartIds, setLikedCartIds} = useContext(store)
    //console.log("likedCartIds", likedCartIds)
    const {siteDetailes, toggleSelfLike} = props
    const {_id, propertyID, city, propertyType, state, images, selfLike} = siteDetailes
    //console.log("images List", images)
    const isLiked = likedCartIds.includes(_id)
    const image = images.length === 0 ? "https://ucrealestate.s3.amazonaws.com/ucr_files/1719552873965.images.jpg" : images[Math.floor(Math.random()*images.length)]
    //console.log("random", Math.floor(Math.random()*images.length))
    const heartIcon = selfLike || isLiked? <FaHeart/> : <FaRegHeart/>
    const heartColor = selfLike || isLiked ? "filled-heart-icon" : "heart-icon"

    const toggleLikeButton = e => {
        e.preventDefault()
        e.stopPropagation()
        toggleSelfLike(_id)
        if(!likedCartIds.includes(_id) && !selfLike){
            setLikedCartIds(prev => [...prev, _id])
        }else{
            const filteredLikedCartIds = likedCartIds.filter(eachId => eachId !== _id)
            setLikedCartIds(filteredLikedCartIds)
        }
    }
    const navigate = useNavigate()
    const handleCard = () => {
        navigate("/invest-buy", { state: { specificId: _id } })
    }
    return(
        <div className='invest-buy-item-bg-container' onClick={handleCard}>
            <div className='invest-buy-item-site-img' style={{backgroundImage:`url(${image})`, backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundPosition:"center"}}>
                <button className={`heart-button ${heartColor}`} onClick={toggleLikeButton}>{heartIcon}</button>
            </div>
            <h2 className='property-id'>ID #{propertyID}</h2>
            <h3 className='city-state'>{city}, {state}</h3>
        </div>
    )
}
export default InvestBuyItem