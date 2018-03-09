import React from 'react'

import '../styles/App.css'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import sortBy from 'sort-by'



class RootView extends React.Component {



  render() {

    const {postid, post} = this.props;


    return (
      <div>
          
           <h1>{post.title}</h1>
      
           <Link
      to="/comments"
      className="add-contact"
      >To Comments</Link>

        </div>
    )
  }

}


function mapStateToProps({posts}, ownProps) {
  if (ownProps.id in posts) {
    return {
      "post": posts[ownProps.id]
    }
  }

  return {
    "post": {}
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