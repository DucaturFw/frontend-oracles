import React, { Component, Fragment } from 'react';
import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './store/history';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import theme from './styles/theme';
import './styles/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'reset-css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Container from './components/container/index';
import Header from './components/header';
import Footer from './components/footer';
import MainContent from './components/maincontent/index';
import CreateContract from './components/createcontract/index';
import ContractList from './components/contractlist/index';
import Contract from './components/contract/index';
import UserInfo from './components/userinfo/index';
import Notifications from './components/notifications/index';
import Login from './components/login/index';

class App extends Component {
  render() {
    const { authenticated } = this.props;
    //  if(localStorage.getItem('login') === 'true')
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router history={history}>
            {authenticated || localStorage.getItem('login') == 'true' ? (
              <Container>
                <Header />
                <MainContent>
                  <Route exact path="/createcontract" component={CreateContract} />
                  <Route exact path="/mycontracts" component={ContractList} />
                  <Route exact path="/contract/:id" component={Contract} />
                  <Route exact path="/userinfo" component={UserInfo} />
                  <Route exact path="/notifications" component={Notifications} />
                </MainContent>
                <Footer />
              </Container>
            ) : (
              <Fragment>
                <Route exact path="/login" component={Login} />
                <Redirect to="/login" />
              </Fragment>
            )}
          </Router>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  authenticated: state.login.authenticated
});

export default connect(mapStateToProps)(App);
