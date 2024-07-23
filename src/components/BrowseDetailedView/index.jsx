import {useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'
import { useLocation, useNavigate} from 'react-router-dom'
import { TiArrowBack } from "react-icons/ti";

const BrowseDetailedView = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {specificId} = location.state || {} // is a defensive programming technique that ensures the specificId is safely extracted from location.state without causing runtime errors if location.state is not defined.
    const [specificIdData, setSpecificIdData] = useState(null)
    
    const apiUrl = `http://devapi.telosamerica.com/buy?id=${specificId}`
    useEffect(() => {
        if(specificId === undefined){
            navigate("/")
        }
        else{
            const getSpecificIdData = async() => {
                const response = await axios.get(apiUrl, {headers : {
                    Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU1NWQ3MzM3OTlkMzFhMWE5YzYzNGYiLCJlbWFpbCI6ImthcnRoaWt1Y3JAeW9wbWFpbC5jb20iLCJpYXQiOjE3MjEzNzk3NzksImV4cCI6MTcyMTk4NDU3OX0.MITjWmLAWyiq_4AEZeOmADbAw6EaF9FfSbMAyiDRyCg`,
                    'Content-Type' : 'application/json'
                }})
                const data = await response.data
                setSpecificIdData(data.data)
            }
            getSpecificIdData()
        } 
    }, [specificId])
    // let image = specificIdData && specificIdData.images.length > 1 ? specificIdData.images[1] : specificIdData.images[0]
    let image 
    if(specificIdData){
        specificIdData.images.length === 0 ? image = "https://ucrealestate.s3.amazonaws.com/ucr_files/1719552873965.images.jpg" : image = specificIdData.images[Math.floor(Math.random()*specificIdData?.images.length)]
    }
    return(
        <div className='browse-details-view-bg-container'>
            <div className='browse-detailed-view-img-container'>
                {specificIdData && 
                    <img src={image} className='browse-detailed-view-img' alt="img"/>
                }
            </div>
            {specificIdData && (
                <div className="browse-detailed-view-details">
                    <h2 className='browse-detailed-view-propertyId'>#{specificIdData.propertyID}</h2>
                    <div className='browse-details-view-main-container'>
                        <div className='browse-details-view-left-container'>
                            <h2>Address</h2>
                            <p style={{marginTop:"-15px", marginBottom:"-10px"}}>--</p>
                            <p>{specificIdData.state}, {specificIdData.city}</p>
                            <h2 style={{marginBottom:"0px"}}>Details</h2>
                            <div className='each-feild'>
                                <p>Title</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Zip Code</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Property Type</p>
                                <p className='strong'>{specificIdData.propertyType}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Investment Type</p>
                                <p className='strong'>{specificIdData.investmentType}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Lease Type</p>
                                <p className='strong'>{specificIdData.leaseType}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Tenancy</p>
                                <p className='strong'>{specificIdData.tenancy}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Lease Term (Months)</p>
                                <p className='strong'>{specificIdData.leaseTerm}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Lease Expiration</p>
                                <p className='strong'>{new Date(specificIdData.leaseExpiration).toLocaleDateString()}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Square Footage</p>
                                <p className='strong'>{specificIdData.squareFootage}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Occupancy (%)</p>
                                <p className='strong'>{specificIdData.occupancy}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>NOI ($)</p>
                                <p className='strong'>{specificIdData.NOI}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Lot Size (acres)</p>
                                <p className='strong'>{specificIdData.lotSize}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Rent Bumps</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Lease Options</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Ownership</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Property Use</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Amenities</p>
                                <p className='strong'>--</p>
                            </div>
                        </div>
                        <div className='browse-detailed-view-right-container'>
                            <h2>Date Added</h2>
                            <p className='strong'>{new Date().toLocaleDateString()}</p>
                            <div className='empty-div'></div>
                            <div className='each-feild'> 
                                <p>Asking Price ($)</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Investment Sub Type</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Sub Type</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Tenant Credit</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Brand/Tenant</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Lease Commencement</p>
                                <p className='strong'>{new Date(specificIdData.leaseCommencement).toLocaleDateString()}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Remaining Term (Months)</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Cap Rate (%)</p>
                                <p className='strong'>{specificIdData.capRate}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Occupancy Date</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Year Built</p>
                                <p className='strong'>{specificIdData.yearBuilt}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Parking (spaces)</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Broker Co-Op</p>
                                <p className='strong'>{specificIdData.brokerCoOp}</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Ground Lease</p>
                                <p className='strong'>--</p>
                            </div>
                            <div className='each-feild'> 
                                <p>Lease Structure</p>
                                <p className='strong'>--</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <button className='back-button' onClick={()=>navigate(-1)}><TiArrowBack/> Back</button>
        </div>
    )
}
export default BrowseDetailedView