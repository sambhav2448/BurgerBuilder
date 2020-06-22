import React,{Component} from "react";
import Aux from "../../../hoc/Auxx";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component{
render(){
  const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey=>{
        return(
          <li key={igKey}>

          <span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}
          </li>
        );
      });
  return(
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious Burger with following ingredients:</p>
      <ul>
          {ingredientSummary}
      </ul>
      <p><strong>total price: {this.props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={this.props.purchasedCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  );
}
}


export default OrderSummary;
