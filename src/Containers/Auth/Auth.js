import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/auth";
import classes from "./Auth.module.css";
import { formConfig } from "../../utilities/utilities";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import Spinner from "../../Components/UI/Spinner/Spinner";
class Auth extends Component {
  state = {
    controls: {
      email: formConfig(
        "email",
        "email",
        "Your email...",
        "",
        {
          isRequired: true,
        },
        false,
        false
      ),
      passWord: formConfig(
        "Password",
        "text",
        "Your password...",
        "",
        {
          isRequired: true,
          minLength: 6,
        },
        false,
        false
      ),
    },
    isSignUp: true,
  };
  checkValidation = (inputVal, validationRequirement) => {
    let isValid = true;
    if (validationRequirement.isRequired)
      isValid = inputVal.trim().length > 0 && isValid;
    if (validationRequirement.minLength)
      isValid =
        inputVal.trim().length >= validationRequirement.minLength && isValid;
    if (validationRequirement.maxLength)
      isValid =
        inputVal.trim().length <= validationRequirement.maxLength && isValid;
    return isValid;
  };
  inputHandler = (e, control) => {
    const updatedControls = {
      ...this.state.controls,
      [control]: {
        ...this.state.controls[control],
        value: e.target.value,
        isValid: this.checkValidation(
          e.target.value,
          this.state.controls[control].validationRequirement
        ),
        touch: true,
      },
    };
    this.setState({ controls: updatedControls });
  };
  submitHandler = (e, email, password, isSignUp) => {
    e.preventDefault();
    this.props.authenticate(email, password, isSignUp);
  };
  switchAuth = () =>
    this.setState((prevState) => ({
      isSignUp: !prevState.isSignUp,
    }));
 componentWillUnmount() {
    this.props.setAuthRedirectPath();
  }
  render() {
    return (
      <div className={classes.Auth}>
        {this.props.error ? <p>{this.props.error.message}</p> : null}
        {!this.props.isAuth ? null : <Redirect to={this.props.redirectPath} />}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form
            onSubmit={(e) =>
              this.submitHandler(
                e,
                this.state.controls.email.value,
                this.state.controls.passWord.value,
                this.state.isSignUp
              )
            }
          >
            {Object.keys(this.state.controls).map((curr) => (
              <Input
                elementConfig={this.state.controls[curr].elementConfig}
                value={this.state.controls[curr].value}
                key={curr}
                change={(e) => this.inputHandler(e, curr)}
                isValid={
                  this.state.controls[curr].touch
                    ? this.state.controls[curr].isValid
                    : true
                }
              />
            ))}
            <Button type="Success">Submit</Button>
            <Button type="Danger" clicked={this.switchAuth}>
              Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: state.auth.token !== null,
  redirectPath: state.auth.redirect_path,
});
const mapDispatchToProps = (dispatch) => ({
  authenticate: (email, password, isSignUp) =>
    dispatch(actions.authenticate(email, password, isSignUp)),
  setAuthRedirectPath: () => dispatch(actions.set_auth_redirect("/")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
