

import React from 'react'

import '../styles/ui/semantic.min.css'

import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import { Item, Header, ItemContent, ItemDescription, Button } from 'semantic-ui-react'
import { postFromProps } from "./categoryIcon"
import { changePostVote, updatePost } from '../actions'


function nextButton(x, postid, post, host) {

  if ('undefined' === typeof x) {

    let commentLink = "/post/comments/" + postid

    return (


      <span style={{
        float: "right"
      }}  >
 <Button circular  size = "tiny" icon='hand point up outline'
      onClick={ () => {
        host.props.changePostVote({
          post,
          direction: true
        })
      }
      }
      />
     <Button circular  size = "tiny" icon='hand point down outline'

      onClick={ () => {
        host.props.changePostVote({
          post,
          direction: false
        })
      }
      }


      />
   
   <Link
      to={commentLink}>
     <Button circular  size = "tiny" icon='folder open outline' >
      </Button>
      </Link>

</span>

    )
  }

  let editLink = "/post/edit/" + postid
  return (


    <span style={{
      float: "right"
    }}  >
<Button circular  size = "tiny" icon='hand point up outline'
    onClick={ () => {
      host.props.changePostVote({
        post,
        direction: true
      })
    }
    }
    />
   <Button circular  size = "tiny" icon='hand point down outline'

    onClick={ () => {
      host.props.changePostVote({
        post,
        direction: false
      })
    }
    }
    />


<Button circular  size = "tiny" icon='trash'
    onClick={ () => {
      host.remove()
    }
    }
    >
    </Button>
    <Link
    to={editLink}>
   <Button circular  size = "tiny" icon='pencil alternate' >
    </Button>
    </Link>

   </span>




  )
}


class PostView extends React.Component {


  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
      }).isRequired,
      staticContext: PropTypes.object
    }).isRequired
  };

  remove() {
    console.log("will remove")
    const post = {
      ...this.props.post,
      deleted: true
    }


    this.props.updatePost({
      post,
      finish: this.context.router.history.goBack
    })



  }
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




    var d = new Date(post.timestamp).toDateString();

    let buttonBar = nextButton(isSummary, postid, post, this);

    return (


      <div key={"postdetail_" + postid + "_" + isSummary}>
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
      {buttonBar}
    
 

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
    changePostVote: (data) => dispatch(changePostVote(data)),
    updatePost: (data) => dispatch(updatePost(data))
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps
)(PostView)