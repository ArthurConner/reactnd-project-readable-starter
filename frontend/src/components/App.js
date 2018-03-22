import React from 'react'

import '../styles/App.css'
import { Switch, Route } from 'react-router-dom'
import MainView from './rootView.js'
import CommentView from './commentView.js'
import PostDetailView from "./PostDetailView"
import PostEditView from "./PostEditView"
import PostNewView from "./PostNewView"

import { connect } from 'react-redux'
import { loadPosts } from '../actions'
import { withRouter } from 'react-router'



class BooksApp extends React.Component {


  // When the component mounts, we need to load out books from the AJAX call
  componentDidMount() {
    this.props.loadPosts()
  }

  render() {


    return (
      <div>
        
          <Switch>
          <Route exact path='/' render={() => (
        <MainView  />
      )}/>
          <Route exact path='/post/comments/:id' render={({history, match}) => (
        <PostDetailView  postid={match.params.id} />
      )}/>

       <Route exact path='/category/:id' render={({history, match}) => (
        <MainView  category={match.params.id} />
      )}/>



       <Route exact path='/post/edit/:id' render={({history, match}) => (
        <PostEditView  postid={match.params.id} />
      )}/>


       <Route exact path='/new/post' render={({history}) => (
        <PostNewView  />
      )}/>

         
          </Switch>
        

        </div>
    )
  }

}


/*
   <Route exact path="/post/:id" render={({history, match}) => (
        <PostDetailView postid={match.params.id} />
      )}/>


      */
/*

function mapStateToProps ({books,searchResults,query}) {
const mainBooks = Object.keys(books).map((key)=>{ return books[key]})
return {books:mainBooks,searchResults,query}
}
*/

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: (data) => dispatch(loadPosts(data))
  }
}



export default withRouter(connect(
  null, mapDispatchToProps
)(BooksApp))
