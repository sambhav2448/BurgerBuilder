import React, {Component} from "react";
import Aux from "../../hoc/Auxx";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/toolbar/toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

class Layout extends Component{
  state={
    showsidedraw:false
  }
  SideDrawerClose=()=>{
    this.setState({showsidedraw:false});
  }

  sidedrawhandle=()=>{
    this.setState((prevState)=>{
      return  {showsidedraw:!prevState.showsidedraw};
    });

  }
  render(){
    return(
      <Aux>
          <Toolbar
          drawertoggleclick={this.sidedrawhandle}
          />
          <SideDrawer open = {this.state.showsidedraw}
           closed={this.SideDrawerClose}/>
          <main className={classes.content}>
              {this.props.children}
          </main>
      </Aux>
    )
  }
}

export default Layout ;
