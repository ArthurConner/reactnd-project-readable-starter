

import React from 'react'

import '../styles/ui/semantic.min.css'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { Item, Header, ItemContent, ItemDescription, Button } from 'semantic-ui-react'
import { postFromProps } from "./categoryIcon"
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
    let color = {}
    let catdesc = cat 
    if (this.props.categories && this.props.categories[cat]) {
    let catInfo = this.props.categories[cat]
     color = catInfo.color
     catdesc = catInfo.desc
    }
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

      >{catdesc}</Link>,  Comments:<Link
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
)(PostView)