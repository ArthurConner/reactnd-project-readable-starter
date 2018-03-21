

import React from 'react'

import '../styles/ui/semantic.min.css'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { Item, Header, ItemContent, ItemDescription, Button } from 'semantic-ui-react'
import { postFromProps } from "./categoryIcon"
import { changePostVote } from '../actions'
import MenuView from "./menu.js"




class PostEditView extends React.Component {


  savePost(x, post) {

    console.log("doing save")
  }

  render() {


    const postid = this.props.postid
    const post = this.props.post

    const isSummary = this.props.isSummary

    let commentLink = "/post/comments/" + postid
    /*
    let cat = post.category

    let color = colorForCategory({
      cat
    })
    let catLink = "/category/" + cat
    */

    let catLink = "/category/"
    let color = ""


    var d = new Date(post.timestamp).toDateString();

    const header = "here we are"

    return (


      <div key="postdetail_{postid}_{isSummary}">
      
      <MenuView/>
      <div style = {{
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        backgroundColor: "white"
      }}>
      
      <Header style={{
        color
      }}>{header}</Header>

     
      <Item> 
       <ItemContent>
         <Header style ={{
        color
      }}
      >{post.title}</Header>

      <ItemDescription>
      {post.body}


</ItemDescription>
      <ItemDescription>
      <small>{d}, 
      Author:<i>{post.author}</i>, Category:<Link
      to={catLink}
      style ={{
        color
      }}

      >{post.category}</Link>,  Comments:<Link
      to={commentLink}

      >{post.commentCount} </Link> , score:{post.voteScore} 
      </small>
    
 

<span style={{
        float: "right"
      }}  >
 <Button circular  size = "tiny" icon='save'
      onClick={ () => {
        this.savePost({
          post,
          direction: true
        })
      }
      }




      />
   
 

</span>
<div><br/>

</div>
      </ItemDescription>
      </ItemContent>
       </Item>
      
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
    changePostVote: (data) => dispatch(changePostVote(data))
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps
)(PostEditView)