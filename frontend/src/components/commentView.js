import React from 'react'

import '../styles/App.css'

import { connect } from 'react-redux'

import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import { fetchPost } from '../actions'

class RootView extends React.Component {



  componentDidMount() {
    //console.log("did monunt comments")
    this.props.fetchPost({
      postid: this.props.postid
    })
  }


  render() {

    const comments = this.props.comments

    // const {postid, post} = this.props;

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
  // console.log("this is our post id")
  if (!(ownProps.postid)) {
    // console.log("do not have a postid")
    // console.log(posts)
    return {
      comments: []
    }
  }
  //console.log(posts[ownProps.postid])


  if (!(posts[ownProps.postid])) {
    // console.log("do not have a posts[ownProps.postid]")
    //console.log(posts)
    return {
      comments: []
    }
  }

  const ourPost = posts[ownProps.postid]
  //console.log("our post", ourPost)
  const comments = ourPost.comments
  const keys = Object.keys(comments)

  //console.log("these are our comments")
  //console.log(comments)

  if (keys.length > 0) {
    let mainPosts = Object.keys(comments).map((key) => {
      return comments[key]
    })
    mainPosts.sort(sortBy('timestamp'))
    return {
      "comments": mainPosts
    }
  }

  return {
    "comments": []
  }
}


function mapDispatchToProps(dispatch) {
  console.log("mapping fetch")
  return {
    fetchPost: (data) => dispatch(fetchPost(data))
  }
}




export default connect(
  mapStateToProps, mapDispatchToProps
)(RootView)