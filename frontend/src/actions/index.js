
import axios from 'axios'
export const LOAD_SERVER = 'LOAD_SERVER'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
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



export function fetchPostComments({postid}) {

  return (dispatch) => {

    const postsurl = {
      method: 'get',
      url: `${api}/posts/${postid}/comments`,
      headers: {
        ...headers,
      }
    }




    axios(postsurl)
      .then(function(response) {

        console.log("now have response")
        console.log(response)

        const comments = response.data
        const action = {
          type: UPDATE_COMMENT,
          postid,
          comments
        }

        console.log("going to do fetchPostComments", action)
        dispatch(action)

      })
      .catch(function(error) {
        console.log("we have a fetchPost error")
        console.log(error);
      });



  }



}





/*
export function moveBook(x) {
  const { book, shelf } = x

  return (dispatch) => {

    BooksAPI.update(book, shelf).then((result) => {

      dispatch({
        type: MOVE_BOOK,
        book,
        shelf,
      })
    })
  }
}


export function searchTitle({ query }) {

  return (dispatch) => {
    
    BooksAPI.search(query).then((searchResults) => {

      //console.log("got search result")
      //console.log(searchResults)

      if (searchResults instanceof Array) {
        dispatch({
          type: SEARCH_TITLE,
          query,
          searchResults
        })
      }
      else {
        console.log("We have an error with search")
 
      }
    })
  }
}

export function loadBookShelf() {

  return (dispatch) => {

    BooksAPI.getAll().then((books) => {
      dispatch({
        type: LOAD_BOOKSHELF,
        books,
      })

    })
  }


}

*/