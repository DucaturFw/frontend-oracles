import React from 'react';
import { Container } from 'semantic-ui-react';
import MainContent from '../maincontent';
import { Account } from './index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser } from '../../actions/register';

const mapDispatchtoProps = dispatch => bindActionCreators({ buttonAction: registerUser }, dispatch);
const mapStateToProps = state => ({
  preloader: state.register.loading,
  register: true,
  buttonText: 'Регистрация'
});

const Register = connect(
  mapStateToProps,
  mapDispatchtoProps
)(Account);

const WrappedRegister = () => {
  return (
    <Container>
      <MainContent>
        <Register />
      </MainContent>
    </Container>
  );
};
export default WrappedRegister;
