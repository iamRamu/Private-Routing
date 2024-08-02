import { useLocation, useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import './index.css'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { store } from '../../App'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
const EditProperty = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [defaultData, setDefaultData] = useState(null)
    //console.log("location", location)
    console.log("defaultData", defaultData)
    const {state} = location
    //const {token} = useContext(store)
    const token = Cookies.get("token")
    console.log("token", token)
    const getDefaultData = async() => {
        const url = `http://devapi.telosamerica.com/property?id=${state?.id}`
        const response = await axios.get(url, {headers : {
            Authorization : `${token}`,
            'Content-Type' : 'application/json'
        }})
        const data = await response.data
        setDefaultData(data.data)
    }
    useEffect(()=>{
        if(!state || !token){
            navigate("/invest-buy")
        }
        
    },[state,token])

    useEffect(()=>{
        getDefaultData()
    },[])

    const updateProperty = async(values) => {
        const apiUrl = `http://devapi.telosamerica.com/property`
        try {
            const response = await axios.put(apiUrl, {
                ...values,
                _id : defaultData?._id,
                propertyID : defaultData?.propertyID

            }, {
                headers: {
                    Authorization : `${token}`,
                    'Content-Type' : 'application/json',
                },
            })
            console.log("Property Update response", response)
            Swal.fire('Success', 'Property updated successfully', 'success').then((result)=>{
                if(result.isConfirmed){
                    navigate("/invest-buy")
                }
            })
           
        } catch (error) {
            Swal.fire('Error', 'Property update failed', 'error');
            console.log("property Update Error", error)
        }
    }

    const formik = useFormik({
        initialValues : {
            Title: defaultData?.Title ,
            //address: defaultData?.address ,
            ZipCode: defaultData?.ZipCode ,
            askingPrice: defaultData?.askingPrice ,
        },
        enableReinitialize: true,
        onSubmit : values => {
            console.log("values", values)
            updateProperty(values)
        },
        validate : values => {
            let errors = {}
            if(!values.Title){
                errors.Title = "*Required Title"
            }
            if(!values.ZipCode){
                errors.ZipCode = "*Required ZipCode"
            }
            if(!values.askingPrice){
                errors.askingPrice = "*Required askingPrice"
            }
            return errors
        }
    })
 
    
    return(
        <div>
            {defaultData &&
                <form className='propery-bg-container' onSubmit={formik.handleSubmit} autoComplete='off'>
                    <h1 className='property-info-heading'>Property Info</h1>
                    <div className='property-details-container'>
                        <div className='property-fields-container'>
                            <label htmlFor='Title' className='property-label'>Title</label>
                            <input id='Title' className='property-input-field' value={formik.values.Title} name='Title' onChange={formik.handleChange}/>
                            {formik.errors.Title && formik.touched.Title && <p>{formik.errors.Title}</p>}
                        </div>
                        {/* <div className='property-fields-container'>
                            <label htmlFor='address' className='property-label'>Address</label>
                            <input id='address' className='property-input-field' value={formik.values.address} name='address' onChange={formik.handleChange}/>
                        </div> */}
                        <div className='property-fields-container'>
                            <label htmlFor='ZipCode' className='property-label'>Zip Code</label>
                            <input id='ZipCode' className='property-input-field' value={formik.values.ZipCode} name='ZipCode' onChange={formik.handleChange}/>
                            {formik.errors.ZipCode && formik.touched.ZipCode && <p>{formik.errors.ZipCode}</p>}
                        </div>
                        <div className='property-fields-container'>
                            <label htmlFor='askingPrice' className='property-label'>Asking Price ($)</label>
                            <input id='askingPrice' className='property-input-field' value={formik.values.askingPrice} name='askingPrice' onChange={formik.handleChange}/>
                            {formik.errors.askingPrice && formik.touched.askingPrice && <p>{formik.errors.askingPrice}</p>}
                        </div>
                    </div>
                    <button className='property-submit-button' type='submit'>Submit</button>
                    
                </form>
            }
        </div>
    )
}
export default EditProperty