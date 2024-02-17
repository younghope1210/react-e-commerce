// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import { useParams } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import axiosInstance from '../../../utils/axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { BsChatRightQuoteFill } from "react-icons/bs";

const Comment = ({ refreshFunction, commentLists, comment, product}) => {

    const { productId } =  useParams();
     // 리덕스 안의 state에서 user 정보 가져옴
     const userData = useSelector(state => state.user?.userData);
    
    
    const [CommentValue, setCommentValue] = useState("")


    // 코멘트 작성가능
const handleClick = (e) => {
    setCommentValue(e.currentTarget.value)
   }
   
   const onSubmit = async (e) => {
   
       e.preventDefault(); // 새로고침 방지

         // 코멘트에 대한 body
         const variableComment = {
            content: CommentValue,
            writer: userData._id, // 리덕스 안의 state에서 user 정보 가져옴
            commentId: productId 
        }

       try{

        const response = await axiosInstance.post('/comments/saveComment', variableComment);
        setCommentValue(" ");
        refreshFunction(response.data.review)
        console.log(response.data.review)

      } catch(error){
        console.error(error);
      }   
   
   }


  return (
    <div>
        <h3 className='text-x py-3 text-gray-500 border-b-[3px] border-gray-300/100'> 
           Review
        </h3>    
        
    {/* Comment Lists */}
    
    {commentLists?.map((comment, index) => (
        (!comment.responseTo && 
        <div key={index} style={{borderBottom:'1px dotted #ddd', paddingBottom:'10px'}}>  
            <SingleComment refreshFunction={refreshFunction} comment={comment} commentId={productId} product={product} />
           <ReplyComment refreshFunction={refreshFunction}  commentLists={commentLists} parentCommentId={comment._id} commentId={productId} />
            {/* <ReplyComment refreshFunction={refreshFunction}  parentCommentId={comment._id} commentLists={commentLists} commentId={productId} /> */}
        </div> 
        )

    ))}
       
   
         {/* Comment Form */}

         <form style={{ display:'flex', fontSize:'12px', marginTop:'20px'}} onSubmit={onSubmit} >
           
            <textarea
                style={{ width:'100%', borderRadius:'5px', border:'1px solid #ddd', height:'62px'}}
                onChange={handleClick}
                value={CommentValue}
                placeholder=" 상품에 대한 리뷰를 작성해 주세요"
            > 

            </textarea>
            <button
                style={{ width:'20%', height:'62px', border:'1px solid #ddd', fontSize:'14px'}}
                onClick={onSubmit}
            >
                리뷰쓰기
            </button>
            </form>
    </div>
  )
}

export default Comment