import React from 'react'
import '../styles/ui/semantic.min.css'

import { Link } from 'react-router-dom'
import { categoryFromProps } from "./categoryIcon"
import { Menu, DropdownMenu, DropdownItem, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'





class MenuView extends React.Component {


  render() {

    let {categories, catKeys} = this.props

    const spacing = 2

    return (
      <div style = {{
        backgroundColor: "White"
      }} >
        <Header style = {{
        textAlign: "center"
      }}
      >Audacity Reads
             </Header>
        <Menu>
           
        <Menu.Item as= {Link}  to="/" >
          All
        </Menu.Item>




  {
      catKeys.map((key) => {
        const cat = categories[key]
        const catLink = "/category/" + cat.path
        let color = cat.color
        const name = cat.desc
        const akey = "menu_" + name

        return <Menu.Item as ={Link} style ={{
            color
          }}  to={catLink} key={akey} >{name}</Menu.Item>
      })
      }

      </Menu>
      
      </div>
    )
  }

}



function mapStateToProps({categories}) {

  return categoryFromProps({
    categories
  })

}




export default connect(
  mapStateToProps, null
)(MenuView)





