
import axios from 'axios'
export const LOAD_SERVER = 'LOAD_SERVER'
export const UPDATE_POST = 'UPDATE_POST'
const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
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

