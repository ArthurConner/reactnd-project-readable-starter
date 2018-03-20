

import React from 'react'

import '../styles/App.css'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { Item, Header, ItemContent, ItemDescription, Icon, ButtonGroup, Button } from 'semantic-ui-react'
import { iconForCategory, colorForCategory } from "./categoryIcon"


function nextButton(x, postid) {


  if ('undefined' === typeof x) {

    let commentLink = "/post/comments/" + postid

    return (
      <Link
      to={commentLink}>
     <Button circular  size = "tiny" icon='folder open outline' >
      </Button>
      </Link>
    )
  }

  let editLink = "/post/edit/" + postid
  return (

    <Link
    to={editLink}>
   <Button circular  size = "tiny" icon='pencil alternate' >
    </Button>
    </Link>
  )




}
class PostView extends React.Component {

  render() {

    const comments = this.props.comments
    const postid = this.props.postid
    const post = this.props.post

    const isSummary = this.props.isSummary
    // const {postid, post} = this.props;
    let link = "/post/" + postid
    let commentLink = "/post/comments/" + postid
    let cat = post.category
    let catlink = "/post/comments/"
    let ic = iconForCategory({
      cat
    })
    let color = colorForCategory({
      cat
    })
    let catLink = "/category/" + cat

    const finalButton = nextButton(this.props.isSummary, postid)

    var d = new Date(post.timestamp).toDateString();


    return (


      <div key="postdetail_{postid}_{isSummary}">
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
 <Button circular  size = "tiny" icon='hand point up outline' />
     <Button circular  size = "tiny" icon='hand point down outline' />
   
     {finalButton}

</span>
<div><br/>

</div>
      </ItemDescription>
     

      </ItemContent>

  

       </Item>
      
        </div>
    )
  }

}

/*
  
      <ButtonGroup>
        <Button circular color='facebook' icon="hand point up outline icon" />
        <Button circular color='linkedin' icon="hand point down outline icon" />
        <Button circular icon="settings" />
      </ButtonGroup>
      */



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
      post: {}
    }
  }

  const post = posts[ownProps.postid]
  return {
    post
  }
}






export default connect(
  mapStateToProps, null
)(PostView)