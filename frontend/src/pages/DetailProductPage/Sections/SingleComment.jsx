// eslint-disable-next-line no-unused-vars
import React,{ useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import axiosInstance from '../../../utils/axios';
import LikeDislikes from './LikeDislikes';
const SingleComment = ({ refreshFunction, comment, product}) => {

    const { productId } =  useParams();
    // 리덕스 안의 state에서 user 정보 가져옴
    const userData = useSelector(state => state.user?.userData);

    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value)
}

//싱글 코멘트 토글기능
const onClickReplyOpen = () => {
    setOpenReply(!OpenReply)
}

const actions = [
    <span 
        style={{border:'1px solid #bbb', display:'inline-block',padding:'0 7px 0 7px', borderRadius:'5px', cursor:'pointer', fontSize:'11px', transition:'1s'}}
        onClick={onClickReplyOpen} key="comment-basic-reply-to"
    >
        댓글쓰기
    </span>
]

// 싱글 코멘트 저장
const onSubmit = async (e) => {
    e.preventDefault();

     // 코멘트에 대한 body
     const variableComment = {
        content: CommentValue,
        writer: userData._id, // 리덕스 안의 state에서 user 정보 가져옴
        commentId: productId,
        responseTo: comment._id 
    }

   try{

    const response = await axiosInstance.post('/comments/saveComment', variableComment);
    setCommentValue(" ");
    setOpenReply(false);
    refreshFunction(response.data.review)
  

  } catch(error){
    console.error(error);
  }   

}

// if(!comment) return null;

  return (
    <div>
        <div className=' text-sm py-2'>
        
            <p className='py-1 font-semibold text-gray-500'>{comment.writer.name}</p>
            <p className='py-2 text-base'>{comment.content}</p>  
    
        {/* 리뷰 좋아요 싫어요 버튼 */}
            <LikeDislikes 
                comment={comment} product={product} 
            />
            
       </div>
       <div className='my-3'>
       {actions}   
       </div>
         {/* Comment Form */}
    {OpenReply && 
      
        <form style={{ display:'flex', marginTop:'10px', fontSize:'12px', width:'90%'}} onSubmit={onSubmit}>

        <textarea
            style={{ width:'100%', borderRadius:'5px', border:'1px solid #ddd',height:'62px'}}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder=" 리뷰에 대한 답변을 작성하세요."
        > 

        </textarea>
        <button
            style={{ width:'20%', height:'62px', border:'1px solid #ddd', fontSize:'14px'}}
            onClick={onSubmit}
        >
            코멘트 입력
        </button>
        </form>
    } 
    </div>
  )
}

export default SingleComment