import React from 'react'

import '../styles/App.css'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import sortBy from 'sort-by'




class RootView extends React.Component {



  render() {

    const posts = this.props.posts

    console.log("we have posts")
    const foo = posts.map((post) => {
      console.log(post)
      return post
    })

    console.log(foo)

    return (
      <div>
          
           <h1>Posts</h1>
           <ol>
               {posts.map((post) => {
        let link = "/post/" + post.id
        let commentLink = "/post/comments/" + post.id
        return (

          <li>  <Link
          to={link}
          className="add-contact"
          >{post.title}</Link>
            comments  
          

           <Link
          to={commentLink}
          className="add-contact"
          >{post.commentCount}</Link>

          
           </li>
        )
      }
      )}
               
               </ol>


        </div>
    )
  }

}


function mapStateToProps({posts}) {

  const keys = Object.keys(posts)

  if (keys.length > 0) {
    let mainPosts = Object.keys(posts).map((key) => {
      return posts[key]
    })
    mainPosts.sort(sortBy('timestamp'))
    return {
      "posts": mainPosts
    }
  }
  return {
    "posts": []
  }
}

/*
function mapDispatchToProps (dispatch) {
    return {
      loadBookShelf: (data) => dispatch(loadBookShelf(data))
    }
  }
  */



export default withRouter(connect(
  mapStateToProps, null
)(RootView))