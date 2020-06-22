import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxx";



const sideDrawer=(props)=>{
  let attachClass=[classes.SideDrawer,classes.Close];
  if(props.open){
    attachClass=[classes.SideDrawer,classes.Open];
  }
  return (
    <Aux>
    <Backdrop show={props.open} clicked={props.closed}/>
    <div className={attachClass.join('  ')}>
      <div className={classes.Logo}>
        <Logo/>
      </div>
      <nav>
        <NavigationItems />
      </nav>

    </div>
    </Aux>
  );
};

export default sideDrawer;
