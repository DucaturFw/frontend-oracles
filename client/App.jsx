import React, { Fragment } from 'react';
import { Web3Provider } from 'react-web3';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
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
import { ConnectedRouter } from 'connected-react-router';
import Register from './components/userinfo/register';

const App = ({ authenticated }) => (
  <ThemeProvider theme={theme}>
    <ConnectedRouter history={history}>
      {authenticated ? (
        <Web3Wrap>
          <Container>
            <Header />
            <MainContent>
              <Switch>
                <Route exact path="/create" component={CreateContract} />
                <Route exact path="/contracts" component={ContractList} />
                <Route path="/contracts/:id" component={Contract} />
                <Route exact path="/userinfo/:id" component={UserInfo} />
                <Route exact path="/notifications" component={Notifications} />
                <Redirect to={'/contracts'} />
              </Switch>
            </MainContent>
            <Footer />
          </Container>
        </Web3Wrap>
      ) : (
        <Fragment>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Login} />
            <Redirect to={'/'} />
          </Switch>
        </Fragment>
      )}
    </ConnectedRouter>
  </ThemeProvider>
);

const mapStateToProps = state => ({
  authenticated: state.login.authenticated || localStorage.getItem('hash')
});

const ConnApp = connect(mapStateToProps)(App);

const Web3Wrap = props => {
  if (window.web3) return <Fragment>{props.children}</Fragment>;
  return <Web3Provider>{props.children}</Web3Provider>;
};
const store = configureStore();
const WrapApp = () => {
  return (
    <Provider store={store}>
      <ConnApp />
    </Provider>
  );
};

export default WrapApp;
