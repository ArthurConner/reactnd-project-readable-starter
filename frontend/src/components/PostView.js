

import React from 'react'

import '../styles/App.css'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { Item, Header, ItemDescription, Icon, Menu } from 'semantic-ui-react'
import { iconForCategory, colorForCategory } from "./categoryIcon"

class PostView extends React.Component {

  render() {

    const comments = this.props.comments
    const postid = this.props.postid
    const post = this.props.post
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

    var d = new Date(post.timestamp).toDateString();


    return (


      <div key="postdetail_{postid}">
      <Item> 
       <div class="content">
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
      
      <i class="hand point up outline icon" ></i> 
      <i class="hand point down outline icon" ></i>
      <div class="ui icon menu">
  <a class="item">
    <i class="gamepad icon"></i>
  </a>
  <a class="item">
    <i class="video camera icon"></i>
  </a>
  <a class="item">
    <i class="video play icon"></i>
  </a>
</div>
 


      </ItemDescription>
      </div>
       </Item>
      
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