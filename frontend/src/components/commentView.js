import React from 'react'

import '../App.css'
import {Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'


  class RootView extends React.Component {




    render() {

      const posts = this.props.posts

      return (
        <div>
          
          <h1>Comments</h1>
        

  <Link
              to="/"
              className="add-contact"
              >To Posts</Link>

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