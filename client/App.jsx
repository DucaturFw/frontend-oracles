import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  { ThemeProvider } from 'styled-components';
import 'semantic-ui-css/semantic.min.css';
import theme from './styles/theme';
import './styles/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import Container from './components/container/index';
import Header from './components/header';
import Footer from './components/footer';
import MainContent from './components/maincontent/index';
import CreateContract from './components/createcontract/index';
import ContractList from './components/contractlist/index';
export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Container>
              <Header />
              <MainContent>
                <Route exact path="/" component={CreateContract} />
                <Route exact path="/mycontracts" component={ContractList} />
              </MainContent>
              <Footer />
            </Container>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}
