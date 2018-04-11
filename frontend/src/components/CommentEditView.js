import React from 'react'
import '../styles/App.css'


import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'


import { Link } from 'react-router-dom'
import { fetchPost } from '../actions'
import { changeCommentVote, updateComment, addComment,deleteComment } from '../actions/comments.js'

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

 

  handleSubmit = () => {
    const {author, body, category, commentCount, deleted, id, parentId, timestamp, voteScore} = this.state
    //console.log("HANDLE SUBMIT")
    //console.log("author: "+author)
    //console.log(this.state)

    let newComment = {
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
    console.log(newComment)

  }

  


  save(){
    const {author, body, category, commentCount, deleted, id, parentId, timestamp, voteScore} = this.state
    //console.log("HANDLE SUBMIT")
    //console.log("author: "+author)
    //console.log(this.state)

    const {post} = this.props

    let newComment = {
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
    console.log("adding",newComment, this.state)
    if (this.state.isEdit){
      console.log("going to update")
    this.props.updateComment({comment:newComment, finish:()=>{
      console.log("did save comment")
      this.props.toggleItem(this.state.id)}})

    } else {
      console.log("going to add")
      this.props.addComment({comment:newComment, post, finish:()=>{
        console.log("did save comment")
        this.props.toggleItem(this.state.id)}})
    }


  }


  render() {

    const {toggleItem} = this.props


    return (

      <Form onSubmit={this.handleSubmit} key ={"commentInput_" + this.state.id}>
      
      <Form.Group widths='equal'>
       <Form.Input fluid label='Comment Author'  name='author' value={this.state.author} onChange={this.handleChange} />
      </Form.Group>

      <Form.TextArea label='Body'  name='body' value={this.state.body} onChange={this.handleChange} />
      
  
      <span style={{
        float: "right"
      }}  >

    
    
    <Button circular  size = "tiny" icon='save'
      onClick={ () => {
        this.save()
      }
      }
      >
        </Button>
       
       <Button circular  size = "tiny" icon='cancel'

      onClick={ () => {
        toggleItem(this.state.id)
      }
      }

      >
        </Button>
       
    
       </span>
   
<div><br/>

</div>
   
      <br/><br/>
    </Form>

    )
  }

}



function mapDispatchToProps(dispatch) {

  return {
    changeCommentVote: (data) => dispatch(changeCommentVote(data)),
    updateComment: (data) => dispatch(updateComment(data)),
    addComment: (data) => dispatch(addComment(data)),
    deleteComment:(data) => dispatch(deleteComment(data))

  }
}





export default connect(
  null, mapDispatchToProps
)(CommentView)

