  import React, { Component } from "react";
  import Aux from "../../hoc/Auxx";
  import Burger from "../../components/Burger/burger";
  import BuildControls from "../../components/Burger/BuildControls/BuildControls";
  import Modal from "../../components/UI/Modal/Modal";
  import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
  import axios from "../../components/axios-order";
  import Spinner from "../../components/UI/spinner/spinner";

  const INGREDIANT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
  }

  class BurgerBuilder extends Component{

    state={
      ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
      },
      totalPrice:4,
      purchasable:false,
      purchasing:false,
      loading:false
    }

    updatePurchasestate(ingredients){
      const sum = Object.keys(ingredients)
            .map(igKey=>{
              return ingredients[igKey];
            })
            .reduce((sum, el)=>{
              return sum+el;
            },0)
          this.setState({purchasable:sum>0});
    }

    addIngredientHandler=(type)=>{
      const oldCount = this.state.ingredients[type];
      const updatedCount=oldCount+1;
      const updatedIngredients={
        ...this.state.ingredients
      };
      updatedIngredients[type]=updatedCount;
      const priceAddition=INGREDIANT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({
        totalPrice:newPrice,
        ingredients:updatedIngredients
      });
      this.updatePurchasestate(updatedIngredients);

    }

    removeIngredientHandler=(type)=>{

      const oldCount = this.state.ingredients[type];
      const updatedCount=oldCount-1;
      const updatedIngredients={
        ...this.state.ingredients
      };
      updatedIngredients[type]=updatedCount;
      if(oldCount<=0){
        return null;
      }
      const priceDeduce=INGREDIANT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduce;
      this.setState({
        totalPrice:newPrice,
        ingredients:updatedIngredients
      });
      this.updatePurchasestate(updatedIngredients);

    }
    purchasecancel=()=>{
      this.setState({purchasing:false})
    }
    purchaseCont=()=>{
    //  alert("You Continue!");
    this.setState({loading:true});
    const d = new Date();
    const date1={one:d.getDate(),
                two:d.getMonth()+1,
                three:d.getFullYear()}
    const order={
      ingredients:this.state.ingredients,
      price:this.state.totalPrice.toFixed(2),
      customer:{
        name:"Sambhav",
        address:{
          street:"Bangalore",
          zipCode:"560037",
          country:"India"
        },
        email:"Sambhav123@gmail.com"
      },
      deliveryMode:"Fast",
      Date:date1.one+"/"+date1.two+"/"+date1.three
    }
    // axios.post("/orders.json",order)
    //   .then(res=>this.setState({loading:false,purchasing:false}))
    //   .catch(err=>this.setState({loading:false,purchasing:false}));

    }

    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
      render(){
        const disableinfo={
          ...this.state.ingredients
        }
        for (let key in disableinfo){
          disableinfo[key] = disableinfo[key] <=0
        }

        let orderSummary= <OrderSummary
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
        purchasedCancelled={this.purchasecancel}
        purchaseContinued={this.purchaseCont}/>;
          if(this.state.loading){
            orderSummary=<Spinner />;
          }

          return(
              <Aux>
                  <Modal show={this.state.purchasing} modalClosed={this.purchasecancel}>
                 {orderSummary}
                  </Modal>
                  <Burger ingredients={this.state.ingredients}/>
                  <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableinfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
              </Aux>
          );
      }
  }

  export default BurgerBuilder;
