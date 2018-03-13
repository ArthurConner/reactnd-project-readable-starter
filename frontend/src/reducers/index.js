

import { LOAD_SERVER, UPDATE_COMMENT } from '../actions'

const initialTestCalendarState = {



  posts: {
    "8xf0y6ziyjabvozdd253nd": {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 6,
      deleted: false,
      commentCount: 2
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: '6ni6ok3ym7mf1p33lnez',
      timestamp: 1468479767190,
      title: 'Learn Redux in 10 minutes!',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thingone',
      category: 'redux',
      voteScore: -5,
      deleted: false,
      commentCount: 0
    }
  },

  comment: {
    "894tuq4ut84ut8v4t8wun89g": {
      id: '894tuq4ut84ut8v4t8wun89g',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1468166872634,
      body: 'Hi there! I am a COMMENT.',
      author: 'thingtwo',
      voteScore: 6,
      deleted: false,
      parentDeleted: false
    },
    "8tu4bsun805n8un48ve89": {
      id: '8tu4bsun805n8un48ve89',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1469479767190,
      body: 'Comments. Are. Cool.',
      author: 'thingone',
      voteScore: -5,
      deleted: false,
      parentDeleted: false
    }
  }
}

const initialRedState = {

  posts: {

  },

  categories: []

}


function bookReducer(state = initialRedState, action) {



  switch (action.type) {
    case LOAD_SERVER:
      const {posts, categories} = action

      /*
      const nextPost = posts.map((p)=>{
        p["comments"] = []
        return p
      })
      */

      const nextPosts = posts.reduce((acc, post) => {
        post.comments = {}
        acc[post.id] = post


        if (post.id in state.posts) {
          const oldcomments = state.posts[postid].comments
          post.comments = {
            ...oldcomments
          }

        }
        return acc
      }, {})

      return {
        ...state,
        "posts": nextPosts,
        categories
      }

    case UPDATE_COMMENT:
      const {comments, postid} = action

      const nextComments = comments.reduce((acc, comment) => {
        acc[comment.id] = comment
        return acc
      }, {})

      let p = state.posts[postid]
      let nextP

      if (p) {
        nextP = {
          ...p,
          "comments": nextComments
        }
      } else {
        nextP = {
          "comments": nextComments
        }
      }

      let retPosts = {
        ...state.posts
      }
      retPosts[postid] = nextP

      // console.log("with",postid,"reducing posts",state.posts,"to something likle",retPosts)
      return {
        ...state,
        "posts": retPosts

      }



      return state



    default:
      return state
  }
}




export default bookReducer