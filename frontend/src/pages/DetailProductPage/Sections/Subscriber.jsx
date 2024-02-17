// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../utils/axios'
import axios from "axios";
// import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { RiHeartAddFill,  RiHeartAddLine } from "react-icons/ri";


const Subscriber = () => {

    // const { productId } =  useParams();
    // 리덕스 안의 state에서 user 정보 가져옴
    const userData = useSelector(state => state.user?.userData);


    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)


    const numberHandler = () => {

        
      let variable = {
        userTo : userData._id
      }

        return axiosInstance.post('/subscribers/subscribeNumber',variable ).then((res) => setSubscribeNumber(res.data.subscribeNumber))
      }
    
      const subscribedHandler = () => {

        let subscribedVariable = {
            userTo : userData._id,
            userFrom: localStorage.getItem('userId')
      }
  
        return axiosInstance.post('/subscribers/subscribed', subscribedVariable).then((res) => setSubscribed(res.data.subscribed))
      }
    
      useEffect(() => {
        axios.all([numberHandler(), subscribedHandler()]).then(
          axios.spread((a, b) => {
            console.log(a, b)
          }),
        )
      }, [])


      const onSubscribe = ( ) => {

        let subscribeVariable = {
                userTo : userData._id,
                userFrom : localStorage.getItem('userId')
        }
  
        if(Subscribed) {
            //when we are already subscribed 
            axiosInstance.post('/subscribers/unSubscribe', subscribeVariable )
                .then(res => {
                    if(res.data.success){ 
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독 취소에 실패했습니다')
                    }
                })
  
        } else {
            // when we are not subscribed yet
            
            axiosInstance.post('/subscribers/subscribe', subscribeVariable )
                .then(res => {
                    if(res.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독하는데 실패했습니다')
                    }
                })
        }
  
    }
 

 return (
          <>
            <p onClick={onSubscribe} 
              className='gap-1 text-red-500'
            >
              {/* <span className='flex-row inline-block align-middle text-sm mr-1 pt-1' > 관심</span> */}
            <span className='flex-row inline-block align-middle text-base pt-1 cursor-pointer'>
               { Subscribed ? <RiHeartAddFill /> : <RiHeartAddLine/>} 
            </span>
             
             <span className='flex-row inline-block align-middle text-sm ml-1'> {SubscribeNumber} </span>
             </p>
              
            </>
  )
}

export default Subscriber