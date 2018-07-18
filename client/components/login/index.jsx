import React from 'react';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authorization } from '../../actions/login';

class Login extends React.Component {
  state = {
    login: '',
    password: ''
  };
  render() {
    if (this.props.preloader) {
      return (
        <Wrap>
          <LoadingWrap>
            <FA name="spinner" size="4x" spin />
          </LoadingWrap>
        </Wrap>
      );
    }
    return (
      <Wrap>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  onChange={(event, data) => {
                    this.setState({
                      login: data.value
                    });
                  }}
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  onChange={(event, data) => {
                    this.setState({
                      password: data.value
                    });
                  }}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                <Button
                  onClick={() => {
                    this.props.authorization(this.state.login, this.state.password);
                  }}
                  color="teal"
                  fluid
                  size="large"
                >
                  Login
                </Button>
              </Segment>
              {this.props.error ? (
                <Message negative>
                  <Message.Header>Неверный логин или пароль</Message.Header>
                </Message>
              ) : (
                <div />
              )}
            </Form>
          </Grid.Column>
        </Grid>
      </Wrap>
    );
  }
}
const mapDispatchtoProps = dispatch => bindActionCreators({ authorization }, dispatch);
const mapStateToProps = state => ({
  preloader: state.login.preloader,
  error: state.login.error
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Login);

const LoadingWrap = styled.div`
  height: 400px;
  text-align: center;
  padding-top: 200px;
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
