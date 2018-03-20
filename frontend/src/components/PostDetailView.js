import React from 'react'

import '../styles/App.css'
import MenuView from "./menu.js"

import { connect } from 'react-redux'

import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import { fetchPost } from '../actions'
import PostView from "./PostView"

class PostDetailView extends React.Component {



  componentDidMount() {
    //console.log("did monunt comments")
    this.props.fetchPost({
      postid: this.props.postid
    })
  }


  render() {

    const comments = this.props.comments

    const {postid} = this.props;

    return (


      <div key = "postdetail_{key}">
      
      <MenuView/>
      <div style = {{
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        backgroundColor: "white"
      }}>
   
          
          <PostView postid={postid}  isSummary={postid} />
          <ol>
               {
      comments.map((comment) => (
        <li> {comment.author}</li>
      )
      )
      }      
        </ol>


        </div>
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

  return {
    fetchPost: (data) => dispatch(fetchPost(data))
  }
}




export default connect(
  mapStateToProps, mapDispatchToProps
)(PostDetailView)