import { useContext, useState } from 'react'
import './index.css'
import { FaHeart , FaRegHeart} from "react-icons/fa"
import {useNavigate} from 'react-router-dom'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegTrashAlt, FaPen } from "react-icons/fa";
import { store } from '../../App'
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie' 

const InvestBuyItem = props => {
    const {likedCartIds, setLikedCartIds} = useContext(store)
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(true)
    //console.log("likedCartIds", likedCartIds)
    const {siteDetailes, toggleSelfLike} = props
    const {_id, propertyID, city, propertyType, state, images, selfLike, name} = siteDetailes
    //console.log("images List", images)
    const isLiked = likedCartIds.includes(_id)
    const image = images.length === 0 ? "https://ucrealestate.s3.amazonaws.com/ucr_files/1719552873965.images.jpg" : images[Math.floor(Math.random()*images.length)]
    //console.log("random", Math.floor(Math.random()*images.length))
    const heartIcon = selfLike || isLiked? <FaHeart/> : <FaRegHeart/>
    const heartColor = selfLike || isLiked ? "filled-heart-icon" : "heart-icon"
    const token = Cookies.get("token")
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
    const handleHamburger = event => {
        event.preventDefault()
        event.stopPropagation()
        setIsHamburgerClicked(false)
    }
    const handleDelete = event => {
        event.preventDefault()
        event.stopPropagation()
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                const apiUrl = `http://devapi.telosamerica.com/property/${_id}`
                try {
                    await axios.delete(apiUrl, {
                        headers : {
                            Authorization : `${token}`,
                            'Content-Type' : 'application/json'
                        }
                    })
                    navigate("/invest-buy")
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire(
                        'Error',
                        'Property Delete Failed',
                        'error'
                    )
                }
                
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                );
            }
        });
    }
    const handleEdit = event => {
        event.preventDefault()
        event.stopPropagation()
        navigate("/edit-property", {state : {id : _id}})
    }
    return(
        <div className='invest-buy-item-bg-container' onClick={handleCard}>
            <div className='invest-buy-item-site-img' style={{backgroundImage:`url(${image})`, backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundPosition:"center"}}>
                <button className={`heart-button ${heartColor}`} onClick={toggleLikeButton}>{heartIcon}</button>
            </div>
            <div style={{display : "flex", alignItems:"flex-start", justifyContent:"space-between"}}>
                <div>
                    <h2 className='property-id'>ID #{propertyID}</h2>
                    <h3 className='city-state'>{name}</h3>
                </div>

                {isHamburgerClicked ?
                    <div className='hamburger-icon-container' onClick={handleHamburger}>
                        <HiOutlineDotsVertical className='hamburger-icon'/>
                    </div>
                    :
                    <div className='hamburger-icon-container2' onClick={handleHamburger}>
                        <FaRegTrashAlt className='trash-edit trash' onClick={handleDelete}/>
                        <FaPen className='trash-edit edit' onClick={handleEdit}/>
                    </div>
                }
                
            </div>
            
        </div>
    )
}
export default InvestBuyItem