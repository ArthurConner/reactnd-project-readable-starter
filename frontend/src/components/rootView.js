import React from 'react'
import '../styles/ui/semantic.min.css'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { Header, List, Dropdown } from 'semantic-ui-react'

import sortBy from 'sort-by'
import MenuView from "./menu.js"

import PostView from "./PostView"
import { categoryFromProps } from "./categoryIcon"




class RootView extends React.Component {

  state = {
    orderBy: "timestamp"
  }


  /*
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  */

  shiftItem = (event) => {
    const orderBy = event.target.value
    const ret = {
      orderBy
    }

    console.log("changing order", ret)
    this.setState(ret)
  }

  render() {


    let posts = this.props.posts
    let orderBy = this.state.orderBy

    posts = [...posts]

    let secName = this.props.category

    let header = ""
    let color = {}

    if (secName) {

      if (this.props.categories && this.props.categories[secName]) {

        header = this.props.categories[secName].desc
        color = this.props.categories[secName].color
      } else {
        header = secName
      }


      posts = posts.filter((post) => {
        return post.category === secName
      })
    }

    if (posts) {
      posts.sort(sortBy(orderBy))
    }

    const sortItems = ["timestamp", "author", "title", "voteScore", "commentCount"].map((item) => {

      return {
        key: item,
        value: item,
        text: item
      }
    })

    return (
      <div key="Main Menu">
      
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

      <div style={{
        textAlign: "right"
      }}>
      Order By:
     
      <Dropdown defaultValue={orderBy} inline options={sortItems}  value={orderBy}

      onChange={(event) => {
        const orderBy = event.target.textContent
        console.log("changing order", event.target.textContent, orderBy)
        this.setState({
          orderBy
        })
      }}

      />
      </div>
    
      <List>
           
               {posts.map((post) => {

        return <PostView postid={post.id} />

      }
      )}
        </List> 
        </div>
        </div>
    )
  }

}


function mapStateToProps({posts, categories} ,ownProps) {

  const keys = Object.keys(posts)

  let cats = categoryFromProps({
    categories
  })

  if (keys.length > 0) {
    let mainPosts = Object.keys(posts).map((key) => {
      return posts[key]
    })

    return {
      ...cats,
      "posts": mainPosts,

    }
  }
  return {
    ...cats,
    "posts": [],
  }
}

/*
function mapDispatchToProps (dispatch) {
    return {
      loadBookShelf: (data) => dispatch(loadBookShelf(data))
    }
  }
  */



export default connect(
  mapStateToProps, null
)(RootView)