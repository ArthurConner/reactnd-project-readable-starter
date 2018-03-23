import React from 'react'

import '../styles/ui/semantic.min.css'
import PropTypes from "prop-types";

import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import { categoryFromProps } from "./CategoryUtils"
import { addPost } from '../actions'
import MenuView from "./Menu.js"



function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


class PostNewView extends React.Component {

  state = {
    author: "",
    title: "",
    category: "react",
    body: "",
    commentCount: 0,
    id: guid(),
    timestamp: new Date().getTime(),
    voteScore: 0
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




  handleChange = (e, {name, value}) => {
    console.log("Changing form", name, value)
    this.setState({
      [name]: value
    })

  }

  handleButton = (e, {name, value}) => {
    // this.setState({ [name]: value })

    // console.log("Handling button:", name, value)

    this.setState({
      category: value
    })
  }

  handleSubmit = () => {
    const {author, body, category, title, commentCount, deleted, id, voteScore} = this.state


    let newPost = {
      author,
      body,
      category,
      commentCount,
      deleted,
      id: id,
      timestamp: new Date().getTime(),
      title,
      voteScore
    }
    console.log(newPost)

    this.props.addPost({
      post: newPost,
      finish: (() => {

        this.context.router.history.push("/category/" + category)
      }

      )
    })




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


function mapStateToProps({categories}) {

  return categoryFromProps({
    categories
  })

}


function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data))
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps
)(PostNewView)