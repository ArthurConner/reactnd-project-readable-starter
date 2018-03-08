
export const LOAD_POSTS = 'LOAD_POSTS'



export function loadPosts() {
  
  return {
        type: LOAD_POSTS,
        posts:[]
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