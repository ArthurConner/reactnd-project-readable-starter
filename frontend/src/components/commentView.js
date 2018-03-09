import React from 'react'

import '../styles/App.css'
import {Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'


  class RootView extends React.Component {




    render() {

      const comments = this.props.comments

      return (
        <div>
          
          <h1>Comments</h1>
          <ol>
               {comments.map((comment) => (

                 <li> {comment.author}</li>
               )
            )}
               
               </ol>

        

  <Link
              to="/"
              className="add-contact"
              >To Posts</Link>

        </div>
      )
    }

  }
  

function mapStateToProps ({comments}) {
  let mainPosts = Object.keys(comments).map((key)=>{ return comments[key]})
  mainPosts.sort(sortBy('timestamp'))
  return {"comments":mainPosts}
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