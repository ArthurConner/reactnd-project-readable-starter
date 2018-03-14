import React from 'react'
import '../styles/ui/semantic.min.css'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { Card, Icon, Image } from 'semantic-ui-react'

import sortBy from 'sort-by'
import MenuView from "./menu.js"



class RootView extends React.Component {



  render() {

    const posts = this.props.posts

    // console.log("we have posts")
    // const foo = posts.map((post) => {
    // console.log(post)
    //  return post
    //  })

    //console.log(foo)

    return (
      <div>
      <MenuView/>
     
           
               {posts.map((post) => {
        let link = "/post/" + post.id
        let commentLink = "/post/comments/" + post.id
        return (

          <div class="ui raised segment">  <Link
          to={link}
          className="add-contact"
          >{post.title}</Link>
            comments  
          

           <Link
          to={commentLink}
          className="add-contact"
          >{post.commentCount}</Link>

          
           </div>
        )
      }
      )}
               
    
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



export default connect(
  mapStateToProps, null
)(RootView)