import React from 'react'

import '../App.css'
import {Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import sortBy from 'sort-by'



  class RootView extends React.Component {



    render() {

      const posts = this.props.posts


      return (
        <div>
          
           <h1>Posts</h1>
           <ol>
               {posts.map((post) => (

                 <li> {post.title}</li>
               )
            )}
               
               </ol>
           <Link
              to="/comments"
              className="add-contact"
              >To Comments</Link>

        </div>
      )
    }

  }
  

function mapStateToProps ({posts}) {
  let mainPosts = Object.keys(posts).map((key)=>{ return posts[key]})
  mainPosts.sort(sortBy('timestamp'))
  return {"posts":mainPosts}
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