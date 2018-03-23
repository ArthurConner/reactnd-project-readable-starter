
import axios from 'axios'
export const LOAD_SERVER = 'LOAD_SERVER'
export const UPDATE_POST = 'UPDATE_POST'

export const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token
}


export function loadPosts() {

  return (dispatch) => {

    const postsurl = {
      method: 'get',
      url: `${api}/posts`,
      headers: {
        ...headers,
      }
    }

    const caturl = {
      method: 'get',
      url: `${api}/categories`,
      headers: {
        ...headers,
      }
    }

    axios.all([axios(postsurl), axios(caturl)])
      .then(function(response) {

        const posts = response[0].data
        const categories = response[1].data.categories

        const action = {
          type: LOAD_SERVER,
          posts,
          categories
        }

        dispatch(action)

      })
      .catch(function(error) {
        console.log("we have a loadServer error")
        console.log(error);
      });

  }

}



export function fetchPost({postid}) {

  return (dispatch) => {

    const commenturl = {
      method: 'get',
      url: `${api}/posts/${postid}/comments`,
      headers: {
        ...headers,
      }
    }


    const postsurl = {
      method: 'get',
      url: `${api}/posts/${postid}`,
      headers: {
        ...headers,
      }
    }

    axios.all([axios(postsurl), axios(commenturl)])
      .then(function(response) {

        const post = response[0].data
        const comments = response[1].data
        const action = {
          type: UPDATE_POST,
          post,
          comments
        }

        dispatch(action)

      })
      .catch(function(error) {
        console.log("we have a fetchPost error")
        console.log(error);
      });

  }

}

export function updatePost({post, finish}) {

  return (dispatch) => {

    let data = post
    let postid = post.id

    const postsurl = {
      method: "put",
      url: `${api}/posts/${postid}`,
      headers: {
        ...headers,
      },
      data
    }

    console.log("update post posting", postsurl)

    axios(postsurl).then(function(response) {

      const back = response.data
      const retAction = {
        type: UPDATE_POST,
        post: back

      }
      dispatch(retAction)
      if ('undefined' !== typeof finish) {
        console.log("finishing the action")
        finish()
      }

    }).catch(function(error) {
      console.log("we have a update posting error")
      console.log(error);
    });

  }

}

export function addPost({post, finish}) {

  return (dispatch) => {

    let data = post

    const postsurl = {
      method: "post",
      url: `${api}/posts`,
      headers: {
        ...headers,
      },
      data
    }

    console.log("update post posting", postsurl)

    axios(postsurl).then(function(response) {

      const back = response.data
      const retAction = {
        type: UPDATE_POST,
        post: back

      }
      dispatch(retAction)
      if ('undefined' !== typeof finish) {
        console.log("finishing the action")
        finish()
      }

    }).catch(function(error) {
      console.log("we have a update posting error")
      console.log(error);
    });

  }

}


export function changePostVote({post, direction}) {

  const postid = post.id

  return (dispatch) => {
    //console.log("changing post vote",postid)
    let nextP = {
      ...post
    }

    let nextV = post.voteScore
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

    const retAction = {
      type: UPDATE_POST,
      post,
      isError: true
    }

    dispatch({
      type: UPDATE_POST,
      post: nextP

    })

    const postsurl = {
      method: 'post',
      url: `${api}/posts/${postid}`,
      headers: {
        ...headers,
      },
      data
    }

    console.log("vote posting", postsurl)

    axios(postsurl).then(function(response) {

      const back = response.data
      const retAction = {
        type: UPDATE_POST,
        post: back

      }
      dispatch(retAction)

    }).catch(function(error) {
      console.log("we have a vote error")
      console.log(error);
      dispatch(retAction)
    });

  }

}

