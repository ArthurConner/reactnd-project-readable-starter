import React from 'react'

import '../styles/App.css'
import MenuView from "./Menu.js"

import { connect } from 'react-redux'

import sortBy from 'sort-by'

import { fetchPost } from '../actions'
import PostView from "./PostView"

import CommentView from "./CommentDisplay.js"
import CommentEditView from "./CommentEditView.js"


class PostDetailView extends React.Component {



  componentDidMount() {
    //console.log("did monunt comments")
    this.props.fetchPost({
      postid: this.props.postid
    })
  }


  state = {
    commentStatus: {}

  }

  render() {

    const comments = this.props.comments.filter((post) => {
      return !(post.deleted)
    })

    const {postid} = this.props;

    const toggleItem = (x) => {
      console.log("did toggle ", x)

      let commentStatus = {
        ...this.state.commentStatus
      }
      const status = commentStatus[x]
      if (status && status === "editing") {
        commentStatus[x] = "done"
      } else {
        commentStatus[x] = "editing"
      }
      this.setState({
        commentStatus
      })
    }

    const removeItem = (x) => {
      console.log("did remove ", x)
    }

    const saveItem = (x) => {
      console.log("did remove ", x)
    }

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
      comments.map((comment) => {
        const status = this.state.commentStatus[comment.id]
        if (status && status === "editing") {
          return <CommentEditView comment={comment} toggleItem={toggleItem}/>
        }
        return (
          <CommentView comment={comment}  toggleItem={toggleItem} removeItem={removeItem}/>
        )
      }
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
  let comments = ourPost.comments

  /*
  if ('undefined' !== typeof comments) {
   comments = comments.filter((post) => {
    return !(post.deleted)
  })
  }*/
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