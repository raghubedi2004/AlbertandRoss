import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Progress, Label, Input, Button} from 'reactstrap';
import classnames from 'classnames';
import config from 'react-global-configuration';
import axios from 'axios';
import qs from 'qs';

class Aside extends Component {

	constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'chooseActions',
			availableRatePlans: [],
			planSelected: '',
			subscriberIds: []
    };
		this.handleChangeRatePlan = this.handleChangeRatePlan.bind(this);
		this.handleRefreshParent = this.handleRefreshParent.bind(this);
  }

	handleRefreshParent(e) {
		this.props.refreshData(e);
	}

	handleChangeRatePlan() {
		var plans = document.getElementsByName("ratePlanRadio");
		var numberOfPlans = document.getElementsByName("ratePlanRadio").length;
		var changePlanTo;
		for (var index = 0; index < numberOfPlans; index++) {
			if (plans[index].checked) {
				changePlanTo = plans[index].value;
				this.setState({planSelected: changePlanTo});
				break;
			}
		}
		if (changePlanTo != null || changePlanTo != undefined) {
			var selectedSubscribers = this.props.selectedRows;
			var selectedSuIds = [];
			for (var index = 0; index < selectedSubscribers.length; index++) {
				selectedSuIds.push(selectedSubscribers[index].id);
			}
			this.setState({subscriberIds: selectedSuIds});
			console.log("Plan selected : " + changePlanTo + "\nsubs : "+ selectedSuIds);

			const data = {
			    'subIds' : selectedSuIds,
			    'ratePlan': changePlanTo
			};
			const obj = {};
			obj['subIds'] = selectedSuIds;
			obj['ratePlan'] = changePlanTo;

			axios.post(config.get('kafkaBaseUrl'), obj).then(response => {
				console.log(response);
			}).catch(error => {
				console.log(error.response)
			});
			this.handleRefreshParent();
		}
	}



  toggle(tab) {
    if (this.state.activeTab !== tab) {
			if (tab === 'changeRatePlans') {
				var map = new Map();
				map = config.get('ratePlanMap');
				console.log(map.values);

				var plans = [];
				const plansIds = Object.keys(config.get('ratePlanMap')); //['XPAT30U','XPPDCPTRV', 'XPAT30U', 'XPAT55P1P'];
				var totalPlans = plansIds.length;
				for (var i = 0; i < totalPlans; i++) {
					var planName = config.get('ratePlanMap.'+plansIds[i]);
					plans.push(plansIds[i]+"-###-"+planName);
				}
				this.setState({availableRatePlans:plans});
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
					<div className="callout m-0 py-2 text-muted text-center bg-light text-uppercase">
            <small><b>Actions</b></small>
          </div>
					{this.props.selectedRows.length ?
					<div>
					{/*
					Selected Subscribers are :<br/>
						<ul>
						{this.props.selectedRows.map(function(subscriber, i) {
							return(<li>{subscriber.subscriberName}</li>);
						})
						}
						</ul>
						*/}
						<Nav className="d-md-down-none" navbar >
							<NavItem className="px-3">
								<NavLink href="/#/telus/subscribers" onClick={() => { this.toggle('changeRatePlans');}}>
								<span className="icon-directions"></span> Change Rate Plan</NavLink>
							</NavItem>
							<NavItem className="px-3">
								<NavLink href="/#/telus/subscribers">
								<span className="icon-symbol-male"></span> Change Status</NavLink>
							</NavItem>
							<NavItem className="px-3">
								<NavLink href="/#/telus/subscribers">
								<span className="icon-plus"></span> Add Features</NavLink>
							</NavItem>
							<NavItem className="px-3">
								<NavLink href="/#/telus/subscribers">
								<span className="icon-ban"></span> Remove Features</NavLink>
							</NavItem>
							<NavItem className="px-3">
								<NavLink href="/#/telus/subscribers">
								<span className="icon-user"></span> Change Subscriber</NavLink>
							</NavItem>
							<NavItem className="px-3">
								<NavLink href="/#/telus/subscribers">
								<span className="icon-phone"></span> Change Phone Number</NavLink>
							</NavItem>
						</Nav>
						</div>
						:
						<div>No Subscribers selected</div>
					}
          </TabPane>
          <TabPane tabId="changeRatePlans">
					<div className="m-0 py-2 text-muted text-center bg-light text-uppercase">
            <small><b>Change Rate Plan</b></small>
          </div>
					<br/>
					<div id="listRatePlansToSelect">
					{this.state.availableRatePlans.map(function(ratePlan, i) {
						const planId = ratePlan.substring(0, ratePlan.indexOf('-###-'));
						const planName = ratePlan.substring(planId.length+5, ratePlan.length);
						return(
							<p><input type="radio" name="ratePlanRadio" value={planId}/> {planName}</p>
							);
					})
					}

					</div>
					<div id="submitButtons">
					<table>
						<tr>
							<td width="80%">
								<p><a href="/#/telus/subscribers" onClick={() => { this.toggle('chooseActions');}}>Back</a></p>
							</td>
							<td>
							 <p><Button color="success" onClick={ () => this.handleChangeRatePlan() }>Submit</Button></p>
							</td>
						</tr>
					</table>
					</div>
					{/*
					<form onSubmit={this.handleChangeRatePlan}>
						{this.state.availableRatePlans.map(function(ratePlan, i) {
							return(
								<p><input type="radio" name="ratePlanRadio" value={ratePlan} />{ratePlan}</p>
								);
						})
						}
	        	<input type="submit" value="Submit" />
      		</form>
					*/}
          </TabPane>
        </TabContent>
      </aside>
    )
  }
}

export default Aside;
