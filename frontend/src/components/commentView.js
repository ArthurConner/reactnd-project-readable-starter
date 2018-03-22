import React from 'react'

import '../styles/App.css'
import MenuView from "./menu.js"

import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import { Item, Header, ItemContent, ItemDescription, Button } from 'semantic-ui-react'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import { fetchPost } from '../actions'

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
    const {author, body, category, commentCount, deleted, id, parentId,timestamp, voteScore} = this.state
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

    makeBar(toggle,remove){
      return (
              <span style={{
          float: "right"
        }}  >
    <Button circular  size = "tiny" icon='hand point up outline'
        onClick={ () => {
          
        }
        }
        />
       <Button circular  size = "tiny" icon='hand point down outline'
    
        onClick={ () => {
          
        }}
        />
    
    
    <Button circular  size = "tiny" icon='trash'
        onClick={ () => {
          remove(this.state.id)
        }
        }
        >
        </Button>
       
       <Button circular  size = "tiny" icon='pencil alternate' 
       
       onClick={ () => {
        toggle( this.state.id)
      }
      }
       
       >
        </Button>
       
    
       </span>
      )

    }
  
  asEdit(toggle,remove){

    const buttonBar =  this.makeBar(toggle,remove)

    return (

      <Form onSubmit={this.handleSubmit} key ={"commentInput_" + this.state.id}>
      
      <Form.Group widths='equal'>
       <Form.Input fluid label='Author'  name='author' value={this.state.author} onChange={this.handleChange} />
      </Form.Group>

      <Form.TextArea label='Body'  name='body' value={this.state.body} onChange={this.handleChange} />
      
  
      {buttonBar}
      <br/><br/>
    </Form>

    )

  }


  render() {

    const {isEdit, toggleItem,removeItem} = this.props
  
    const buttonBar =  this.makeBar(toggleItem,removeItem)

    
    if (isEdit){
      return this.asEdit( toggleItem,removeItem)

    }
    // const {postid, post} = this.props;


    var d = new Date(this.state.timestamp).toDateString();

    return (
      <Item key ={"commentRaw_" + this.state.id}> 
      <ItemContent>
       {this.state.body}

     <ItemDescription> {d}, 
     <small>
     Author:<i>{this.state.author}</i>, score:{this.state.voteScore} 
     </small>
     {buttonBar}
   
<div><br/>

</div>
     </ItemDescription>
     </ItemContent>

      </Item>
    )
  }

}


/*
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
)(RootView)

*/

export default CommentView