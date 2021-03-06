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
			<main className="main" >
            <Breadcrumb />
            <Container fluid style={{padding: "0 0px"}}>
              <Switch>
                <Route path="/telus/buy" name="Dashboard" component={Dashboard}/>
                <Route path="/telus/subscribers" name="SubscriberInfo" component={SubscriberInfo}/>
								<Redirect from="/" to="/telus/buy"/>
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
