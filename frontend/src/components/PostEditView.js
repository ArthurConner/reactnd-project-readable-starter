import React from 'react'

import '../styles/ui/semantic.min.css'
import PropTypes from "prop-types";

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form } from 'semantic-ui-react'
import { postFromProps } from "./categoryIcon"
import { updatePost } from '../actions'
import MenuView from "./menu.js"



class PostEditView extends React.Component {


  // state = { stitle: '', author: '', body: '', submittedEmail: '' }



  state = {
    author: this.props.post.author,
    title: this.props.post.title,
    category: this.props.post.category,
    body: this.props.post.body,
    commentCount: this.props.post.commentCount,
    deleted: this.props.post.deleted,
    id: this.props.post.id,
    timestamp: this.props.post.timestamp,
    voteScore: this.props.post.voteScore,
    newPost: this.props.post.newPost

  }


  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
      }).isRequired,
      staticContext: PropTypes.object
    }).isRequired
  };


  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      this.setState({
        author: nextProps.post.author,
        title: nextProps.post.title,
        category: nextProps.post.category,
        body: nextProps.post.body,
        commentCount: nextProps.post.commentCount,
        deleted: nextProps.post.deleted,
        id: nextProps.post.id,
        timestamp: nextProps.post.timestamp,
        voteScore: nextProps.post.voteScore,
        newPost: nextProps.post.newPost
      })
    }
  }

  handleChange = (e, {name, value}) => {
    console.log("Changing form", name, value)
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
    const {author, body, category, title, commentCount, deleted, id, timestamp, voteScore} = this.state
    //console.log("HANDLE SUBMIT")
    //console.log("author: "+author)
    //console.log(this.state)

    let newPost = {
      author: author,
      body: body,
      category: category,
      commentCount: commentCount,
      deleted: deleted,
      id: id,
      timestamp: new Date().getTime(),
      title: title,
      voteScore: voteScore
    }
    console.log(newPost)

    this.props.updatePost({
      post: newPost,
      finish: (() => {

        this.context.router.history.push("/category/" + category)
      })
    })

    this.context.router.history.goBack()

    /*

   
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

  }


  render() {

    const catKeys = this.props.catKeys
    const categories = this.props.categories

    return (


      <div key="postdetail_{postid}_{isSummary}">
      
      <MenuView/>
      <div style = {{
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        backgroundColor: "white"
      }}>
   
      <Form onSubmit={this.handleSubmit}>
      
        <Form.Group widths='equal'>
        <Form.Input fluid label='Title'  name='title' value={this.state.title} onChange={this.handleChange} />
         <Form.Input fluid label='Author'  name='author' value={this.state.author} onChange={this.handleChange} />
        </Form.Group>

        <Form.TextArea label='Body'  name='body' value={this.state.body} onChange={this.handleChange} />
        
        <Form.Group inline>
          <label>Category</label>

          {catKeys.map((key) => {
        const cat = categories[key]
        return <Form.Radio
          label={cat.desc}
          value={key}
          checked={this.state.category === key}
          onChange={this.handleButton}  />

      }
      )}
         
        </Form.Group>
     <div>
        <span style={{
        float: "right"
      }}  >
        <Form.Button content='Submit'>Save</Form.Button>
        </span>
        </div>
        <br/><br/>
      </Form>

 </div>
 </div>
    )
  }
}


function mapStateToProps({posts, categories} , ownProps) {

  return postFromProps({
    posts,
    categories
  }, ownProps)

}


function mapDispatchToProps(dispatch) {
  return {
    updatePost: (data) => dispatch(updatePost(data))
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps
)(PostEditView)