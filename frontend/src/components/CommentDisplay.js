import React from 'react'

import '../styles/App.css'
import { connect } from 'react-redux'

import { Item, ItemContent, ItemDescription, Button } from 'semantic-ui-react'
import { changeCommentVote, updateComment, deleteComment } from '../actions/comments.js'



class CommentView extends React.Component {


  state = {
    author: this.props.comment.author,
    category: this.props.comment.category,
    body: this.props.comment.body,
    commentCount: this.props.comment.commentCount,
    deleted: this.props.comment.deleted,
    id: this.props.comment.id,
    parentId: this.props.comment.parentId,
    timestamp: this.props.comment.timestamp,
    voteScore: this.props.comment.voteScore,
    isEdit: this.props.isEdit

  }



  componentWillReceiveProps(nextProps) {
    if (nextProps.comment) {
      this.setState({
        author: nextProps.comment.author,
        category: nextProps.comment.category,
        body: nextProps.comment.body,
        commentCount: nextProps.comment.commentCount,
        deleted: nextProps.comment.deleted,
        id: nextProps.comment.id,
        parentId: nextProps.comment.parentId,
        timestamp: nextProps.comment.timestamp,
        voteScore: nextProps.comment.voteScore,
        isEdit: nextProps.isEdit
      })
    }
  }


  handleChange = (e, {name, value}) => {
    // console.log("Changing form", name, value)
    this.setState({
      [name]: value
    })

  }

  handleButton = (e, {name, value}) => {
    // this.setState({ [name]: value })

    console.log("Handling button:", name, value)

    this.setState({
      category: value
    })
  }


  handleSubmit = () => {
    const {author, body, category, commentCount, deleted, id, parentId, voteScore} = this.state
    //console.log("HANDLE SUBMIT")
    //console.log("author: "+author)
    //console.log(this.state)

    let newPost = {
      author,
      body,
      category,
      commentCount,
      deleted,
      id,
      timestamp: new Date().getTime(),
      parentId,
      voteScore
    }
    console.log(newPost)

  }

  /*
  this.props.updatePost({
    post: newPost,
    finish: (() => {

      this.context.router.history.push("/category/" + category)
    })
  })

  this.context.router.history.goBack()

  

   
  if (this.state.newPost===true) {
    this.props.newPost(newPost)
  }
  else {
    this.props.updatePost(newPost)

  }
//    setPost
//    updatePost
*/
  // this.context.router.history.goBack()




  changeVote({direction}) {

    const {author, body, category, commentCount, deleted, id, parentId, timestamp, voteScore} = this.state

    let comment = {
      author,
      body,
      category,
      commentCount,
      deleted,
      id,
      timestamp: timestamp,
      parentId,
      voteScore
    }

    this.props.changeCommentVote({
      comment,
      direction
    })

  }


  remove() {

    const {author, body, category, commentCount, id, parentId, timestamp, voteScore} = this.state
    const {post} = this.props
    let comment = {
      author,
      body,
      category,
      commentCount,
      deleted: true,
      id,
      timestamp: timestamp,
      parentId,
      voteScore
    }

    this.props.deleteComment({
      comment,
      post
    })

  }

  render() {

    const {toggleItem} = this.props

    var d = new Date(this.state.timestamp).toDateString();

    return (
      <Item key ={"commentRaw_" + this.state.id}> 
      <ItemContent>
       {this.state.body}

     <ItemDescription> {d}, 
     <small>
     Author:<i>{this.state.author}</i>, score:{this.state.voteScore} 
     </small>
     <span style={{
        float: "right"
      }}  >

    <Button circular  size = "tiny" icon='hand point up outline'
      onClick={ () => {
        this.changeVote({
          direction: true
        })
      }}
      />
       <Button circular  size = "tiny" icon='hand point down outline'

      onClick={ () => {
        this.changeVote({
          direction: false
        })
      }}
      />
    
    
    <Button circular  size = "tiny" icon='trash'
      onClick={ () => {
        this.remove()
      }
      }
      >
        </Button>
       
       <Button circular  size = "tiny" icon='pencil alternate'

      onClick={ () => {
        toggleItem(this.state.id)
      }
      }

      >
        </Button>
       
    
       </span>
   
<div><br/>

</div>
     </ItemDescription>
     </ItemContent>

      </Item>
    )
  }

}


function mapDispatchToProps(dispatch) {

  return {
    changeCommentVote: (data) => dispatch(changeCommentVote(data)),
    updateComment: (data) => dispatch(updateComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data))

  }
}




export default connect(
  null, mapDispatchToProps
)(CommentView)

