import React from 'react'
import '../styles/ui/semantic.min.css'

import { Link } from 'react-router-dom'

import { Menu, Breadcrumb, BreadcrumbSection } from 'semantic-ui-react'

import sortBy from 'sort-by'




class MenuView extends React.Component {


    state = { activeItem: 'inbox' }

    handleItemClick = (e, { name }) => this.setState(
        { activeItem: name })


  render() {

    const { activeItem } = this.state


    const posts = this.props.posts

    // console.log("we have posts")
    // const foo = posts.map((post) => {
    // console.log(post)
    //  return post
    //  })

    //console.log(foo)
    const spacing = 2

    return (
        <div style = {{
            backgroundColor:"White"
            }} >
        <div class="ui medium header" style = {{
            textAlign: "center"
            }}
             >Audacity Reader
             </div>
        <BreadcrumbSection>
           
        <Menu.Item as= {Link}  to="/" >
          Home
        </Menu.Item>


      </BreadcrumbSection>
      
      </div>
    )
  }

}






export default MenuView