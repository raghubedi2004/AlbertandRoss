import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Progress, Label, Input} from 'reactstrap';
import classnames from 'classnames';
import config from 'react-global-configuration';

class Aside extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'chooseActions',
			availableRatePlans: []
    };
		this.handleChangeRatePlan = this.handleChangeRatePlan.bind(this);
  }

	handleChangeRatePlan() {
		var plans = document.getElementsByName("ratePlanRadio");
		var numberOfPlans = document.getElementsByName("ratePlanRadio").length;
		for (var index = 0; index < numberOfPlans; index++) {
			if (plans[index].checked) {
				alert("Plan selected : " + plans[index].value);
				break;
			}
		}
	}

  toggle(tab) {
    if (this.state.activeTab !== tab) {
			if (tab === 'changeRatePlans') {
				// call API to fetch all rate plans
				const dummyPlans = ['XPAT30U','XPPDCPTRV', 'XPAT30U', 'XPAT55P1P'];
				this.setState({availableRatePlans:dummyPlans});
			}
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <aside className="aside-menu">

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="chooseActions">
					{this.props.selectedRows.length ?
					<div>
					Selected Subscribers are :<br/>
						<ul>
						{this.props.selectedRows.map(function(subscriber, i) {
							return(<li>{subscriber.subscriberName}</li>);
						})
						}
						</ul>
						<Nav className="d-md-down-none" navbar >
							<NavItem className="px-3">
								<a href="/#/telus/subscribers" onClick={() => { this.toggle('changeRatePlans');}}>Change Rate Plan</a>
							</NavItem>
							<NavItem className="px-3">
								<a href="/#/telus/subscribers">Change Status</a>
							</NavItem>
							<NavItem className="px-3">
								<a href="/#/telus/subscribers">Add Features</a>
							</NavItem>
							<NavItem className="px-3">
								<a href="/#/telus/subscribers">Remove Features</a>
							</NavItem>
							<NavItem className="px-3">
								<a href="/#/telus/subscribers">Change Subscriber Name</a>
							</NavItem>
							<NavItem className="px-3">
								<a href="/#/telus/subscribers">Change Phone Number</a>
							</NavItem>
						</Nav>
						</div>
						:
						<div>No Subscribers selected</div>
					}
          </TabPane>
          <TabPane tabId="changeRatePlans" className="p-3">
					{this.state.availableRatePlans.map(function(ratePlan, i) {
						return(
							<p><input type="radio" name="ratePlanRadio" value={ratePlan} />{ratePlan}</p>
							);
					})
					}
					<p><button onClick={ () => this.handleChangeRatePlan() }>Submit</button></p>
					<p><a href="/#/telus/subscribers" onClick={() => { this.toggle('chooseActions');}}>Back</a></p>
          </TabPane>
        </TabContent>
      </aside>
    )
  }
}

export default Aside;
