import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Progress, Label, Input} from 'reactstrap';
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
		alert("Plan selected : " + changePlanTo);

		var selectedSubscribers = this.props.selectedRows;
		var selectedSuIds = [];
		for (var index = 0; index < selectedSubscribers.length; index++) {
			selectedSuIds.push(selectedSubscribers[index].id);
		}
		this.setState({subscriberIds: selectedSuIds});
		alert("subs : "+ selectedSuIds);

		{/*const data = {
		    "subIds" : [
		        selectedSuIds
		    ],
		    "ratePlan": changePlanTo
		};
		const options = {
		  method: 'POST',
		  headers: { 'content-type': 'application/json' },
		  data: qs.stringify(data),
			url:'/kafka/topic1',
			baseURL: config.get('kafkaBaseUrl')
		};
		axios(options).then(res => {
        const response = res.data;
				console.log(response);
    });
		*/}

	}


  toggle(tab) {
    if (this.state.activeTab !== tab) {
			if (tab === 'changeRatePlans') {
				var map = new Map();
				map = config.get('ratePlanMap');
				console.log(map.values);
				// call API to fetch all rate plans
				var dummyPlans = [];
				const dummyPlansIds = Object.keys(config.get('ratePlanMap')); //['XPAT30U','XPPDCPTRV', 'XPAT30U', 'XPAT55P1P'];
				var totalPlans = dummyPlansIds.length;
				for (var i = 0; i < totalPlans; i++) {
					var planName = config.get('ratePlanMap.'+dummyPlansIds[i]);
					dummyPlans.push(planName);
				}
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
						return(
							<p><input type="radio" name="ratePlanRadio" value={ratePlan}/> {ratePlan}</p>
							);
					})
					}
					<p><button onClick={ () => this.handleChangeRatePlan() }>Submit</button></p>
					</div>

					<div id="backButton">
					<p><a href="/#/telus/subscribers" onClick={() => { this.toggle('chooseActions');}}>Back</a></p>
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
