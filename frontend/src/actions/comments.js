
import axios from 'axios'
import { api, headers , fetchPost, UPDATE_POST} from './index'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'



export function updateComment({comment, finish}) {

  return (dispatch) => {

    let data = comment


    const postsurl = {
      method: "put",
      url: `${api}/comments/${comment.id}`,
      headers: {
        ...headers,
      },
      data
    }

    console.log("update comment posting", postsurl)

    axios(postsurl).then(function(response) {

     
      const back = response.data
      /*
      const retAction = {
        type: UPDATE_COMMENT,
        comment: back

      }
      dispatch(retAction)
      */
     fetchPost({postid:back.parentId,finish})
    

    }).catch(function(error) {
      console.log("we have a update comment error")
      console.log(error);
    });

  }

}


export function deleteComment({comment, post, finish}) {

  return (dispatch) => {

    let data = comment


    const postsurl = {
      method: "put",
      url: `${api}/comments/${comment.id}`,
      headers: {
        ...headers,
      },
      data
    }

    console.log("update comment posting", postsurl)

    axios(postsurl).then(function(response) {

     
      const back = response.data
    
      const retAction = {
        type: UPDATE_COMMENT,
        comment: back

      }
      dispatch(retAction)
     

      let nextP = {
        ...post
      }
  
      let nextV = post.commentCount - 1
      nextP.commentCount =  nextV

  
      dispatch({
        type: UPDATE_POST,
        post: nextP
  
      })


    // fetchPost({postid:back.parentId,finish})
    

    }).catch(function(error) {
      console.log("we have a update comment error")
      console.log(error);
    });

  }

}


export function addComment({comment, post,finish}) {

  return (dispatch) => {

    let data = comment


    const postsurl = {
      method: "post",
      url: `${api}/comments`,
      headers: {
        ...headers,
      },
      data
    }


    console.log("adding a comment",comment, " to post",post)
    axios(postsurl).then(function(response) {

      const back = response.data
      
      const retAction = {
        type: UPDATE_COMMENT,
        comment: back

      }
      dispatch(retAction)
     
      let nextP = {
        ...post
      }
  
      let nextV = post.commentCount + 1
      nextP.commentCount =  nextV

      
      dispatch({
        type: UPDATE_POST,
        post: nextP
  
      })


    }).catch(function(error) {
      console.log("we have a addComment posting error")
      console.log(error);
    });

  }

}


export function changeCommentVote({comment, direction}) {

  return (dispatch) => {
    //console.log("changing post vote",postid)
    let nextP = {
      ...comment
    }

    let nextV = comment.voteScore
    let data

    if (direction) {
      nextV += 1
      data = {
        option: 'upVote'
      }
    } else {
      nextV -= 1
      data = {
        option: 'downVote'
      }
    }

    nextP["voteScore"] = nextV

    const errorAction = {
      type: UPDATE_COMMENT,
      comment,
      isError: true
    }

    dispatch({
      type: UPDATE_COMMENT,
      comment: nextP

    })

    const postsurl = {
      method: 'post',
      url: `${api}/comments/${comment.id}`,
      headers: {
        ...headers,
      },
      data
    }

    console.log("vote posting", postsurl)

    axios(postsurl).then(function(response) {

      const back = response.data
      const retAction = {
        type: UPDATE_COMMENT,
        comment: back

      }
      dispatch(retAction)

    }).catch(function(error) {
      console.log("we have a vote error")
      console.log(error);
      dispatch(errorAction)
    });

  }

}

