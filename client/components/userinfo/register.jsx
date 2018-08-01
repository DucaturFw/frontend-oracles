import React from 'react';
import styled from 'styled-components';
import { Grid, Segment } from 'semantic-ui-react';
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
    <Wrap>
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 1200 }}>
          <Segment stacked>
            <Register />
          </Segment>
        </Grid.Column>
      </Grid>
    </Wrap>
  );
};
export default WrappedRegister;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
