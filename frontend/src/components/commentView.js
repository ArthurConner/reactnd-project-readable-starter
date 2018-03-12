import React from 'react'

import '../styles/App.css'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import { fetchPostComments } from '../actions'

class RootView extends React.Component {



  componentDidMount() {
    this.props.fetchPostComments({postid:this.props.postid})
  }


  render() {

    const comments = this.props.comments

    const {postid, post} = this.props;

    return (
      <div>
          
          <h1>Comments</h1>
          <ol>
               {
      comments.map((comment) => (
        <li> {comment.author}</li>
      )
      )
      }      
        </ol>

  <Link
      to="/"
      className="add-contact"
      >To Posts</Link>

        </div>
    )
  }

}


function mapStateToProps({posts}, ownProps) {
  let comments = posts[ownProps.postid].comments
  if (comments) {
    return {
      comments
    }
  }


  return {
    "comments": []
  }
}


function mapDispatchToProps (dispatch) {
    return {
      fetchPostComments: (data) => fetchPostComments(loadPosts(data))
    }
  }
 



export default withRouter(connect(
  mapStateToProps, null
)(RootView))