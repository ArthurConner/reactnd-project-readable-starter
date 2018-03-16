import React from 'react'
import '../styles/ui/semantic.min.css'

import { Link } from 'react-router-dom'
import { iconForCategory, colorForCategory } from "./categoryIcon"
import { Menu, DropdownMenu, DropdownItem, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'




class MenuView extends React.Component {


  state = {
    activeItem: 'inbox'
  }

  handleItemClick = (e, {name}) => this.setState(
    {
      activeItem: name
    })


  render() {

    const {activeItem} = this.state


    let {categories, catKeys} = this.props

    console.log("we have categories", catKeys)
    // const foo = posts.map((post) => {
    // console.log(post)
    //  return post
    //  })

    //console.log(foo)
    const spacing = 2

    return (
      <div style = {{
        backgroundColor: "White"
      }} >
        <Header style = {{
        textAlign: "center"
      }}
      >Audacity Reader
             </Header>
        <Menu>
           
        <Menu.Item as= {Link}  to="/" >
          All
        </Menu.Item>




  {
      catKeys.map((key) => {
        const cat = categories[key]
        const catLink = "/category/" + cat.path
        let color = colorForCategory({
          cat: cat.path
        })

        return <Menu.Item as ={Link} style ={{
            color
          }}  to={catLink} >{cat.name}</Menu.Item>
      })
      }

      </Menu>
      
      </div>
    )
  }

}



function mapStateToProps({categories}) {


  //console.log("we have cats of ",categories,Object.keys(categories))

  if (!(categories)) {
    return {
      categories: {},
      catKeys: []
    }
  }


  let catKeys = Object.keys(categories)
  catKeys.sort()


  return {
    categories,
    catKeys
  }

}




export default connect(
  mapStateToProps, null
)(MenuView)





