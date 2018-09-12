import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';

// Telus
import SubscriberInfo from '../../views/Telus/SubscriberInfo/';
import test from '../../views/Telus/test/';


class Full extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pr: "test"
		}
	}
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
			<main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/telus/subscriberInfo" name="SubscriberInfo" component={SubscriberInfo}/>
								<Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
		  <Aside listNameFromParent={this.state.pr}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
