// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../utils/axios';
import axios from "axios";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { BiLike, BiDislike ,BiSolidLike, BiSolidDislike } from "react-icons/bi";

const LikeDislikes = ({product, comment}) => {

  const { productId } =  useParams();
  // 리덕스 안의 state에서 user 정보 가져옴
  const userId = useSelector(state => state.user?.userData?._id);
  


  const [Likes, setLikes] = useState(0)
  const [Dislikes, setDislikes] = useState(0)
  const [LikeAction, setLikeAction] = useState(null)
  const [DislikeAction, setDislikeAction] = useState(null);

let variable = {};

if(comment){

  variable = { commentId: comment._id, userId : userId}

} else{

  variable = {productId : productId, userId : userId}

} 


// 좋아요 버튼
const likeHandler = () => {
  return axiosInstance.post('/likes/getLikes', variable)
    .then((response) => {

      if (response.data.success) {
        //좋아요 버튼을 받은 횟수 
        setLikes(response.data.likes.length)

        //내가 그 좋아요 버튼을 누른적이 있는지 확인
        response.data.likes.map(like => {
            if (like.userId === userId) {
                setLikeAction('liked')
            }
        })
    } else {
        alert('like에 대한 정보를 가져오지 못했습니다')
    }

    })
}
// 싫어요 버튼
const dislikesHandler = () => {
  return axiosInstance.post('/likes/getDislikes', variable)
    .then((response) => {
      // console.log('getDislike', response.data)
      if (response.data.success) {
          // 싫어요를 받은 횟수
          setDislikes(response.data.dislikes.length)

          // 내가 그 싫어요 버튼을 누른적이 있는지 확인
          response.data.dislikes.map(dislike => {
              if (dislike.userId === userId) {
                  setDislikeAction('disliked')
              }
          })
      } else {
          alert('dislike에 대한 정보를 가져오지 못했습니다')
      }
    })
}

useEffect(() => {

  axios.all([likeHandler(), dislikesHandler()]).then(
   
    axios.spread((a, b) => {
   
      console.log(a, b)
   
    }),
  )

}, [])

// 좋아요 버튼을 클릭했을 때

const onLike = () => {
       
  // if (userData._id && !userData._id.isAuth) {
  //     return alert('Please Log in first');
  // }

  if (LikeAction === null) { // 좋아요 버튼이 클릭되어 있지 않을 때
    
    axiosInstance.post('/likes/upLike', variable)
          .then(response => {
              if (response.data.success) {

                  setLikes(Likes + 1)
                  setLikeAction('liked')

                  //If dislike button is already clicked

                  if (DislikeAction !== null) {
                      setDislikeAction(null)
                      setDislikes(Dislikes - 1)
                  }


              } else {
                  alert('좋아요를 누른 숫자가 상승하지 않습니다')
              }
          })


  } else { // 좋아요 버튼이 이미 클릭이 되어 있다면 다시 클릭했을 땐 null 을 처리
       axiosInstance.post('/likes/unLike', variable)
        .then(response => {
              if (response.data.success) {

                  setLikes(Likes - 1)
                  setLikeAction(null)

              } else {
                  alert('좋아요 버튼을 해제하지 못했습니다')
              }
          })

  }

}

// 싫어요 버튼을 클릭했을 때

const onDisLike = () => {

// if (userData._id && !userData._id.isAuth) {
//     return alert('Please Log in first');
// }

if (DislikeAction !== null) { // 싫어요 버튼이 클릭되어 있을 때

  axiosInstance.post('/likes/unDisLike', variable)
     .then(response => {
            if (response.data.success) {

                setDislikes(Dislikes - 1)
                setDislikeAction(null)

            } else {
                alert('싫어요 버튼을 해제하지 못했습니다')
            }
        })

} else { // 클릭되어 있지 않은 상태의 싫어요 버튼을 클릭했을 때
    axiosInstance.post('/likes/upDisLike', variable)
        .then(response => {
            if (response.data.success) {

                setDislikes(Dislikes + 1)
                setDislikeAction('disliked')

                //좋아요 버튼이 클릭되어 있다면 해제해준다
                if(LikeAction !== null ) {
                    setLikeAction(null)
                    setLikes(Likes - 1)
                }

            } else {
                alert('Failed to increase dislike')
            }
        })
}

}
if(!product) return null;

  return (
    <div className='flex gap-1 text-gray-500'> 
    
       <span
        onClick={onLike}
        key="comment-basic-like"
        className='flex-row inline-block align-middle text-base pt-1 cursor-pointer'>
       
          {LikeAction === 'liked' ? <BiSolidLike /> : <BiLike /> }
          
        </span>
      
       <span className='flex-row inline-block align-middle text-sm'>
       {Likes}
        </span>
       <span
        onClick={onDisLike}
        key="comment-basic-dislike"
        className='flex-row inline-block align-middle text-base pt-1 cursor-pointer'>
       
          {DislikeAction === 'disliked' ? <BiSolidDislike /> : <BiDislike />}
          
        </span>
        <span className='flex-row inline-block align-middle text-sm'>
        {Dislikes} 
        </span>
    </div>
  )
}

export default LikeDislikes