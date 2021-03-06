import React, { Component } from 'react';

import logo from './beary2.png';

import Panel from './components/Panel'
import Input from './components/Input'
import Button from './components/Button'

import './App.css';

import API from "./utils/API";

class App extends Component {
  
  state = {
    isLoggedIn: false
  }
  
  componentWillMount(){
    this.checkAuth();
  }

  checkAuth(){
    API.checkAuth()
    .then(data => {return data.json()})
    .then(response => {
      this.setState({
        isLoggedIn: response
      })
    })
    .catch(err => console.log("err", err));
  }

  handleSubmitAccess(e){
    if(this.refs.submitForm.reportValidity()) {
      e.preventDefault();

      const userData = {
        email:    document.getElementById("user-email").value,
        local_pw: document.getElementById("user-pw").value
      }
    
      let selectedButton = e.target.innerText;
      selectedButton = selectedButton.toLowerCase();

      this.refs.submitForm.reset();

      selectedButton === "signup" ?  this.handleSignup(userData) : this.handleLogin(userData)
    }
  }

  handleLogin(userData){
    API.handleLogin(userData)
    .then(data => {return data.json()})
    .then(response=>{
      if(response === true){
        this.setState({
          isLoggedIn: response
        }) 
      }
      else {
        const errorWrap = document.getElementById("form-error");
        errorWrap.innerText = "UH-OH! Please try again.";
        errorWrap.className += "error";
      } 
    })
    .catch(err=> console.log("err",err));
  }

  handleSignup(userData){
    API.handleSignup(userData)
    .then(data => {return data.json()})
    .then(response=>{
      if(response === true){
        this.setState({
          isLoggedIn: response
        }) 
      }
      else {
        const errorWrap = document.getElementById("form-error");
        errorWrap.innerText = "UH-OH! Please try again.";
        errorWrap.className += "error";
      }  
    })
    .catch(err=> console.log("err",err));
  }

  handlelogout(){
    API.handlelogout()
    .then(data => {return data.json()})
    .then(response=>{
      console.log(response)
      this.setState({
        isLoggedIn: response
      })
    })
    .catch(err=> console.log("err",err))
  }

  resetError(){
    const errorWrap = document.getElementById("form-error");
    errorWrap.innerText = "";
    errorWrap.classList.remove("error");
  }

  renderAccountContent(){
   return(
      <div>
      <h3>Welcome to your account panel.</h3>
      <h4>♡</h4>
      <Button float="none" handleBtnClick={this.handlelogout.bind(this)}>logout</Button>
      </div>
    )
  }

  renderLoginForm(){
    return(
      <div>
        <form ref="submitForm" onClick={this.resetError.bind(this)}>
          <p id="form-error"></p>
          <Input elementID="user-email" inputType="email" placeholder="email" img="email" required={true} size="3"/>
          <Input elementID="user-pw" inputType="password" placeholder="password" img="password" required={true} size="6"/>
          <Button handleBtnClick={this.handleSubmitAccess.bind(this)} float="left">LOGIN</Button>
          <Button handleBtnClick={this.handleSubmitAccess.bind(this)} float="right">SIGNUP</Button>
        </form>
      </div>
    )
  }

  renderPanelContent(){
    return(this.state.isLoggedIn)? this.renderAccountContent() : this.renderLoginForm()
  }

  render() {
    return (
      <div className="App">
        <section className="App-skew">
        </section>
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">USER ACCOUNT DEMO</h1>
        </header>
        <Panel>
          {this.renderPanelContent()}
        </Panel>
      </div>
    );
  }
}

export default App;
