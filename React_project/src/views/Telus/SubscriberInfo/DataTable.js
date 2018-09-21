import React, {Component} from 'react';
import {Badge, Card, CardHeader, CardBody, CardFooter, NavbarToggler} from 'reactstrap';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import ToggleDisplay from 'react-toggle-display';
import Aside from '../../../components/Aside/';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-select/dist/react-select.css';
import config from 'react-global-configuration';
import ratePlanMap from 'react-global-configuration';

function filterType(cell, row) {
  // just return type for filtering or searching.
  return cell.type;
}

function statusFormat(cell, row) {
	if (cell === 'A') {
		return <Badge color="success">Active</Badge>;
	} else if(cell === 'C') {
		return <Badge color="danger">Cancelled</Badge>;
	} else if(cell === 'S') {
		return <Badge color="warning">Suspended</Badge>;
	}
}

function ratePlanFormat(cell, row) {
	var ratePlanDisplayName = config.get('ratePlanMap.'+cell);
	if (ratePlanDisplayName === null) {
		ratePlanDisplayName = cell;
	}
	return ratePlanDisplayName;
}

class DataTable extends Component {

	componentWillMount() {
		//alert(this.props.route.listNameFromParent1);
		axios({
			method:'get',
			url:'/retrieveSubscribers',
			baseURL: config.get('baseURL')
		})
		.then(res => {
        const response = res.data;
		this.setState({responseData:response});
		//console.log(response);

      })
			const defaultAvailableHeaders = [
			  { value: 'subscriberName', label: 'Subscriber Name' },
			  { value: 'phoneNumber', label: 'Phone Number' },
			  { value: 'ratePlan', label: 'Rate Plan' },
				{ value: 'subscriptionStatus', label: 'Subscription Status' },
			  { value: 'ban', label: 'Ban' },
			  { value: 'sim', label: 'Sim' },
				{ value: 'contractStartDate', label: 'Contract Start Date' },
				{ value: 'contractEndDate', label: 'Contract End Date' },
				{ value: 'deviceBalance', label: 'Device Balance' }
			];
			this.setState({headersAvailable:defaultAvailableHeaders});
			this.setState({selectedHeaders:defaultAvailableHeaders});
	}

	constructor(props) {
		super(props);
		this.state = {
			responseData:'',
			showAvailableHeaderDropDown: false,
			selectedHeaders: [],
			headersAvailable:[],
			selectedRows:[],
			hideSubscriberName: false,
			hidePhoneNumber: false,
			hideRatePlan: false,
			hideSubscriptionStatus: false,
			hideBan: false,
			hideSim: false,
			hideContractStartDate: false,
			hideContractEndDate: false,
			hideDeviceBalance: false,
			actionPanelOpen: false
		};
		this.options = {
			sortIndicator: true,
			hideSizePerPage: true,
			paginationSize: 3,
			hidePageListOnlyOnePage: true,
			clearSearch: true,
			alwaysShowAllBtns: false,
			withFirstAndLast: true,
			sizePerPage: 20,
		};
		this.selectRow = {
			mode: "checkbox",
			clickToSelect: true,
			bgColor: "#d6b4ef",
			onSelect: (row, isSelect, rowIndex, e) => {
				this.handleSelectSubscriber(row, isSelect, e);
			}
		};
		this.handleChangeHeaders = this.handleChangeHeaders.bind(this);
		this.handleToggleHeaderSelection = this.handleToggleHeaderSelection.bind(this);
		this.handleSelectSubscriber = this.handleSelectSubscriber.bind(this);
		this.handleRefreshDataTable = this.handleRefreshDataTable.bind(this);
	}

	asideToggle(e) {
		//alert(this.state.selectedRows);
		//e.preventDefault();
		document.body.classList.toggle('aside-menu-hidden');
	}

	handleChangeHeaders(e) {
		var selHeaders = e.split(",");
		this.setState({selectedHeaders: selHeaders});
		if (selHeaders) {
			if (selHeaders.includes('subscriberName')) {
				this.setState({hideSubscriberName: false});
			} else {
				this.setState({hideSubscriberName: true});
			}

			if (selHeaders.includes('ratePlan')) {
				this.setState({hideRatePlan: false});
			} else {
				this.setState({hideRatePlan: true});
			}

			if (selHeaders.includes('phoneNumber')) {
				this.setState({hidePhoneNumber: false});
			} else {
				this.setState({hidePhoneNumber: true});
			}

			if (selHeaders.includes('subscriptionStatus')) {
				this.setState({hideSubscriptionStatus: false});
			} else {
				this.setState({hideSubscriptionStatus: true});
			}

			if (selHeaders.includes('ban')) {
				this.setState({hideBan: false});
			} else {
				this.setState({hideBan: true});
			}

			if (selHeaders.includes('sim')) {
				this.setState({hideSim: false});
			} else {
				this.setState({hideSim: true});
			}

			if (selHeaders.includes('contractStartDate')) {
				this.setState({hideContractStartDate: false});
			} else {
				this.setState({hideContractStartDate: true});
			}

			if (selHeaders.includes('contractEndDate')) {
				this.setState({hideContractEndDate: false});
			} else {
				this.setState({hideContractEndDate: true});
			}

			if (selHeaders.includes('deviceBalance')) {
				this.setState({hideDeviceBalance: false});
			} else {
				this.setState({hideDeviceBalance: true});
			}
		}
		//console.log(`Option selected:`, this.state.selectedHeaders);
  }

	handleSelectSubscriber(row, isSelect, e) {
		var rows = this.state.selectedRows;
		var arrayLength = rows.length;
		if (isSelect) {
			rows.push(row);
			if (arrayLength === 0) {
				this.asideToggle();
			}
		} else {
			for (var i = 0; i < arrayLength; i++) {
				if(rows[i].id === row.id) {
					rows.splice(i, 1);
					break;
				}
			}
			var updatedRowLength = rows.length;
			if (updatedRowLength === 0) {
				this.asideToggle();
			}
		}

		this.setState({selectedRows: rows});

		//if (isSelect) {
		//	this.state.selectedRows.push(row.subscriberName);
		//	this.setState({abc: abc+","+row.subscriberName});
		//} else {
		//	this.state.selectedRows.pop(row.subscriberName);
		//	this.setState({abc: "test"});
		//}
	}

	handleRefreshDataTable(e) {
		axios({
			method:'get',
			url:'/retrieveSubscribers',
			baseURL: config.get('baseURL')
		})
		.then(res => {
        const response = res.data;
		this.setState({responseData:response});
		})

		axios({
			method:'get',
			url:'/retrieveSubscribers',
			baseURL: config.get('baseURL')
		})
		.then(res => {
        const response = res.data;
		this.setState({responseData:response});
		})
	}

	handleToggleHeaderSelection() {
		  this.setState({
	      showAvailableHeaderDropDown: !this.state.showAvailableHeaderDropDown
	    });
	  }

	render() {

    return (
      <div className="animated">

        <Card style={{width:"100%", height:"100%"}}>
          <CardBody>
					<div className="buttonLink">
					<button onClick={ () => this.handleToggleHeaderSelection() }>Available Headers</button>
					</div>
					<ToggleDisplay show={this.state.showAvailableHeaderDropDown}>
					<Select multi={true} simpleValue={true} value={this.state.selectedHeaders} onChange={this.handleChangeHeaders} options={this.state.headersAvailable} closeOnSelect={false} clearable={false}/>
					<br/><br/><br/>
	        </ToggleDisplay>
					{/*<div className="asideToggleButton">
					<NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
	          <span className="navbar-toggler-icon"></span>
	        </NavbarToggler>
					</div> */}
					<BootstrapTable headerClasses="header-class" data={this.state.responseData} condensed version="4" striped hover pagination search selectRow={this.selectRow} options={this.options}>
						<TableHeaderColumn isKey dataField="id" hidden={true}>Id</TableHeaderColumn>
	          <TableHeaderColumn id="subscriberName" dataField="subscriberName" hidden={this.state.hideSubscriberName} width="150px" dataSort>Subscriber Name</TableHeaderColumn>
						<TableHeaderColumn dataField="phoneNumber" width="130px" hidden={this.state.hidePhoneNumber} dataSort>Phone Number</TableHeaderColumn>
						<TableHeaderColumn dataField="ratePlan" width="210px" hidden={this.state.hideRatePlan}
							dataFormat={ratePlanFormat} filterFormatted dataSort>Rate Plan</TableHeaderColumn>
						<TableHeaderColumn dataField="subscriptionStatus" width="90px" hidden={this.state.hideSubscriptionStatus}
							dataSort dataFormat={statusFormat}>Status</TableHeaderColumn>
						<TableHeaderColumn dataField="ban" width="80px" hidden={this.state.hideBan} dataSort>Ban</TableHeaderColumn>
						<TableHeaderColumn dataField="sim" width="160px" hidden={this.state.hideSim} dataSort>SIM</TableHeaderColumn>
						<TableHeaderColumn dataField="contractStartDate" hidden={this.state.hideContractStartDate} width="180px" dataSort>Contract Start Date</TableHeaderColumn>
						<TableHeaderColumn dataField="contractEndDate" width="180px" hidden={this.state.hideContractEndDate} dataSort>Contract End Date</TableHeaderColumn>
						<TableHeaderColumn dataField="deviceBalance" width="130px"  hidden={this.state.hideDeviceBalance} dataSort>Device Balance</TableHeaderColumn>
          </BootstrapTable>
					</CardBody>
					<Aside {...this.state} refreshData={this.handleRefreshDataTable.bind(this)}/>
		    </Card>
      </div>
    );
  }
}

export default DataTable;
