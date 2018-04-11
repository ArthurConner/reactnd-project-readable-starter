import React from 'react'

import '../styles/App.css'
import { Switch, Route } from 'react-router-dom'
import MainView from './RootView.js'

import PostDetailView from "./PostDetailView"
import PostEditView from "./PostEditView"
import PostNewView from "./PostNewView"

import { connect } from 'react-redux'
import { loadPosts } from '../actions'
import { withRouter } from 'react-router'
import { categoryFromProps } from "./CategoryUtils"


class BooksApp extends React.Component {


  // When the component mounts, we need to load out books from the AJAX call
  componentDidMount() {
    this.props.loadPosts()
  }



  render() {

    let {catKeys} = this.props


    if ('undefined' === typeof catKeys) {
      catKeys = ["empty"]
    }

    //console.log("menuitems are: ", catKeys)
    return (
      <div>
        
          <Switch>
          <Route exact path='/' render={() => (
        <MainView  />
      )}/>

{
      catKeys.map((key) => {

        const path = "/" + key + "/:id"
        //console.log("made path for ", key, path)
        const cKey = "dispatch_" + path

        return (
          <Route key={cKey} exact path={path} render={({history, match}) => (
            <PostDetailView  postid={match.params.id} />
          )}/>
        )

      })

      }

      
        

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


function mapStateToProps({categories}) {

  return categoryFromProps({
    categories
  })

}


function mapDispatchToProps(dispatch) {
  return {
    loadPosts: (data) => dispatch(loadPosts(data))
  }
}



export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(BooksApp))
