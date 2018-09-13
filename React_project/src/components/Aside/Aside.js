import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Progress, Label, Input} from 'reactstrap';
import classnames from 'classnames';

class Aside extends Component {

	componentWillMount(){
		//alert(this.props.listNameFromParent);
	}
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '2'
    };
	this.showSubscriberName = this.showSubscriberName.bind(this);
  }

  showSubscriberName() {
	  alert('hi');
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <aside className="aside-menu">
		<table>
		<tr>
        <td><input type="checkbox" name="subscriberName" value="checked" onClick="showSubscriberName()"/></td><td>Subscriber Name
		</td>
		</tr>
		<tr>
        <td>
		<input type="checkbox" name="ratePlan" value="abc"/></td><td>Rate Plan
		</td>
		</tr>
		<tr>
        <td>
		<input type="checkbox" name="phoneNumber" value="abc"/></td><td>Phone number
		</td>
		</tr>
		<tr>
        <td>
		<input type="checkbox" name="subscriptionStatus" value="abc"/></td><td>Subscription Status
		</td>
		</tr>
		<tr>
        <td>
		<input type="checkbox" name="ban" value="abc"/></td><td>Ban
		</td>
		</tr>
		<tr>
        <td>
		<input type="checkbox" name="sim" value="abc"/></td><td>Sim
		</td>
		</tr>
		<tr>
        <td>
		<input type="checkbox" name="contractStartDate" value="abc"/></td><td>Contract Start Date
		</td>
		</tr>
		<tr>
        <td>
		<input type="checkbox" name="contractEndDate" value="abc"/></td><td>Contract End Date
		</td>
		</tr>
		<tr>
        <td>
		<input type="checkbox" name="seviceBalance" value="abc"/></td><td>ServiceBalance
		</td>
		</tr>
		</table>
      </aside>
    )
  }
}

export default Aside;
