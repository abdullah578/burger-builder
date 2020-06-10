import React, { Component } from "react";
import Modal from "../../Components/UI/Modal/Modal";

const withErrorHandle = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(
        (req) => {
          this.setState({ error: null });
          return req;
        },
        (err) => {
          this.setState({ error: err });
          return Promise.reject(err);
        }
      );
      this.respInterceptor = axios.interceptors.response.use(null, (err) => {
        this.setState({ error: err });
        return Promise.reject(err);
      });
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.respInterceptor);
    }
    removeError = () => this.setState({ error: null });
    render() {
      return (
        <React.Fragment>
          <Modal
            show={this.state.error !== null}
            removeModal={this.removeError}
          >
            {this.state.error ? <p>{this.state.error.message}</p> : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};
export default withErrorHandle;
