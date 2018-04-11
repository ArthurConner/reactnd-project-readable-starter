import React from 'react'

import '../styles/App.css'
import MenuView from "./Menu.js"

import { connect } from 'react-redux'

import sortBy from 'sort-by'

import { fetchPost } from '../actions'
import PostView from "./PostView"

import CommentView from "./CommentDisplay.js"
import CommentEditView from "./CommentEditView.js"
import { Button,Header } from 'semantic-ui-react'


class PostDetailView extends React.Component {



  componentDidMount() {
    //console.log("did monunt comments")
    this.props.fetchPost({
      postid: this.props.postid
    })
  }


  state = {
    commentStatus: {},
    isAdding:false

  }

  bottomItem(){

    const toggleItem = (x)=> {
      let isAdding = !(this.state.isAdding)
      this.setState({isAdding})
      console.log("toggled button",isAdding)
    }

    const {post} = this.props;

    if (this.state.isAdding){
      console.log("we are true")
      function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }

      const nextComment= {
        author: "",
        category: "react",
        body: "",
        commentCount: 0,
        deleted: false,
        id: guid(),
        parentId: this.props.postid,
        timestamp: new Date().getTime(),
        voteScore: 0,
    
      }

      const isEdit = false
      return (
        <CommentEditView  comment={nextComment} post={post} toggleItem={toggleItem} isEdit={isEdit}/>
      )
    } else {

    
      console.log("we are false")
      return (

        <span style={{
          float: "right"
        }}  >
  
      
      
      <Button circular  size = "tiny" icon='add'
        onClick={ () => {
          toggleItem(0)
        }
        }
        >
          </Button>
         
      
      
         </span>

      )
    }


  }

  render() {

    const comments = this.props.comments.filter((post) => {
      return !(post.deleted)
    })

    const {postid,post} = this.props;

  


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

    const botItem = this.bottomItem()
    const isEdit = true

    console.log("at post",this.props)

    
    if (('undefined' === typeof post)|| ('undefined' === typeof post.deleted) || (post.deleted) ) {
      return (

        <div key = "pod{key}">
      
        <MenuView/>
        <div style = {{
          marginTop: "10px",
          marginLeft: "10px",
          marginRight: "10px",
          backgroundColor: "white"
        }}>
        <Header>Can't seem to find the post you are looking for.</Header>

        </div>
        </div>
      )
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
   
          
          <PostView postid={postid} post={post} isSummary={false} />
          <ol>
               {
      comments.map((comment) => {
        const status = this.state.commentStatus[comment.id]
        if (status && status === "editing") {
          return <CommentEditView comment={comment} post={post} toggleItem={toggleItem} isEdit={isEdit}/>
        }
        return (
          <CommentView comment={comment} post={post} toggleItem={toggleItem} removeItem={removeItem}/>
        )
      }
      )
      }      
        </ol>

      {botItem}


        </div>
        </div>
    )
  }

}


function mapStateToProps({posts}, ownProps) {
  //console.log("this is our post id",posts)
  if (!(ownProps.postid)) {
    // console.log("do not have a postid")
    // console.log(posts)
    return {
      comments: [],
      post: {}

    }
  }
  //console.log(posts[ownProps.postid])


  if (!(posts[ownProps.postid])) {
    // console.log("do not have a posts[ownProps.postid]")
    //console.log(posts)
    return {
      comments: [],
      post: {}
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
      "comments": mainPosts,
      post: ourPost
    }
  }

  return {
    "comments": [],
    post: ourPost
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