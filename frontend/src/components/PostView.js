

import React from 'react'

import '../styles/App.css'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { Item, Header, ItemContent, ItemDescription, Button } from 'semantic-ui-react'
import { colorForCategory } from "./categoryIcon"
import { changePostVote } from '../actions'


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


    const postid = this.props.postid
    const post = this.props.post

    const isSummary = this.props.isSummary

    let commentLink = "/post/comments/" + postid
    let cat = post.category

    let color = colorForCategory({
      cat
    })
    let catLink = "/category/" + cat

    const finalButton = nextButton(isSummary, postid)

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
 <Button circular  size = "tiny" icon='hand point up outline'
      onClick={ () => {
        this.props.changePostVote({
          post,
          direction: true
        })
      }
      }
      />
     <Button circular  size = "tiny" icon='hand point down outline'

      onClick={ () => {
        this.props.changePostVote({
          post,
          direction: false
        })
      }
      }


      />
   
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



function mapStateToProps({posts}, ownProps) {

  if (!(ownProps.postid)) {
    return {
      comments: []
    }
  }


  if (!(posts[ownProps.postid])) {
    return {
      post: {}
    }
  }

  const post = posts[ownProps.postid]
  return {
    post
  }
}



function mapDispatchToProps(dispatch) {

  return {
    changePostVote: (data) => dispatch(changePostVote(data))
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps
)(PostView)