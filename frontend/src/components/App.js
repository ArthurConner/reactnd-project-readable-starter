import React from 'react'

import '../styles/App.css'
import { Switch, Route } from 'react-router-dom'
import MainView from './rootView.js'
import CommentView from './commentView.js'
import PostDetailView from "./PostDetailView"

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
          <Route path='/comments' render={() => (
        <CommentView  />
      )}/>

            <Route exact path="/post/:id" render={({history, match}) => (
        <PostDetailView postid={match.params.id} />
      )}/>

          </Switch>
        

        </div>
    )
  }

}

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
