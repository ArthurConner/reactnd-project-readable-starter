

import { LOAD_SERVER, UPDATE_POST } from '../actions'

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

  categories: {}

}




function makeComments({state, post, comments}) {

  if (comments) {
    const nextComments = comments.reduce((acc, comment) => {
      acc[comment.id] = comment
      return acc
    }, {})

    return {
      ...post,
      "comments": nextComments
    }
  }

  if (post.id in state.posts) {
    const oldcomments = state.posts[post.id].comments

    return {
      ...post,
      "comments": oldcomments
    }

  }

  return {
    ...post,
    "comments": {}
  }
}



function makeCategory({state, category, posts}) {

  if (posts) {
    const nextposts = posts.reduce((acc, comment) => {
      acc[comment.id] = comment
      return acc
    }, {})

    return {
      ...category,
      "posts": nextposts
    }
  }

  if (category.path in state.categories) {
    const oldcomments = state.categories[category.path].posts

    return {
      ...category,
      "posts": oldcomments
    }

  }

  return {
    ...category,
    "posts": {}
  }
}



function reditReducer(state = initialRedState, action) {

  switch (action.type) {
    case LOAD_SERVER:
      const {posts, categories} = action

      const nextPosts = posts.reduce((acc, p) => {
        const post = makeComments({
          state,
          post: p,
          comments: null
        })
        acc[post.id] = post
        return acc
      }, {})

      const nextCategories = categories.reduce((acc, p) => {

        const cat = makeCategory({
          state,
          category: p,
          posts: null
        })

        acc[cat.path] = cat
        return acc
      }, {})

      return {
        ...state,
        "posts": nextPosts,
        "categories": nextCategories

      }

    case UPDATE_POST:
      const {comments, post} = action

      let nextP = makeComments({
        state,
        post,
        comments
      })
      let retPosts = {
        ...state.posts
      }
      retPosts[post.id] = nextP
      //console.log("got posts",retPosts)
      return {
        ...state,
        "posts": retPosts

      }

    default:
      return state
  }
}




export default reditReducer