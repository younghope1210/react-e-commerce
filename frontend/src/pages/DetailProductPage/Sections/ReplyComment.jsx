// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';
import { useParams } from 'react-router-dom';

const ReplyComment = ({commentLists, parentCommentId, refreshFunction, comment}) => {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReply, setOpenReply] = useState(false)

    const { productId } =  useParams();

    useEffect(() => {
   
        let commentNumber = 0;

        commentLists.map((comment) => {
            if(comment.responseTo === parentCommentId){
                commentNumber ++ 
            }
        })
        setChildCommentNumber(commentNumber)
    }, [commentLists, parentCommentId])
    

    const renderReplyComment = (parentCommentId) => 

       commentLists.map((comment, index) => (
        <>
           {
            comment.responseTo === parentCommentId &&
               <div   
                   key={index}        
                   style={{marginLeft:'40px', width:'80%'}}
               >
              <SingleComment refreshFunction={refreshFunction} comment={comment} commentId={productId}  />
             <ReplyComment refreshFunction={refreshFunction} commentLists={commentLists}  parentCommentId={comment._id} commentId={productId} />
           </div>
           }
        </>
        ))



   function onHandleChange() {

        setOpenReply(!OpenReply);

    }



return (
    
    <div className='transition duration-500 ease-in-out'>
        {ChildCommentNumber > 0 && 

        <p 
        onClick={onHandleChange}
        style={{ fontSize:'12px', margin:'0', color:'#C73A59', cursor:'pointer'}}

        >
        {ChildCommentNumber}개의 댓글 확인하기
        </p>

        }
        

        {OpenReply &&

            <p className='transition duration-500 ease-in-out'>
            {renderReplyComment(parentCommentId)}
            </p>

        }

    </div>
  )
}

export default ReplyComment