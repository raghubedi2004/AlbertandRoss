import React, {Component} from 'react';
import {Card, CardHeader, CardBody, CardFooter} from 'reactstrap';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-select/dist/react-select.css';
import config from 'react-global-configuration';

class DataTable extends Component {

	componentWillMount(){
		//alert(this.props.route.listNameFromParent1);
		axios({
			method:'get',
			url:'/loadSubscriberDataGrid?ban=70776907',
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
			selectedHeaders: [],
			headersAvailable:[],
			hideSubscriberName: false,
			hidePhoneNumber: false,
			hideRatePlan: false,
			hideSubscriptionStatus: false,
			hideBan: false,
			hideSim: false,
			hideContractStartDate: false,
			hideContractEndDate: false,
			hideDeviceBalance: false,
		};
		this.selected = [];
		this.options = {
			sortIndicator: true,
			hideSizePerPage: true,
			paginationSize: 3,
			hidePageListOnlyOnePage: true,
			clearSearch: true,
			alwaysShowAllBtns: false,
			withFirstAndLast: true,
			sizePerPage: 20,
		}
		this.selectRow = {
			mode: "checkbox",
			clickToSelect: true,
			bgColor: "#8C68A6",
			onSelect: (row, isSelect, rowIndex, e) => {
				//alert(row.subscriber);
				if (isSelect) {
					this.selected.push(row.subscriber)
				} else {
					this.selected.pop(row.subscriber);
				}
			}
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeHeaders = this.handleChangeHeaders.bind(this);
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

	handleSubmit() {
		alert(this.selected);
	}

  render() {

    return (
      <div className="animated">

        <Card style={{width:"100%", height:"100%"}}>
          <CardBody>
					<p>
					Available Headers
					<Select multi={true} simpleValue={true} value={this.state.selectedHeaders} onChange={this.handleChangeHeaders} options={this.state.headersAvailable} closeOnSelect={false} clearable={false}/>
					</p><br/><br/><br/>
					<p>
					<BootstrapTable headerClasses="header-class" data={this.state.responseData} condensed version="4" striped hover pagination search selectRow={this.selectRow} options={this.options}>
						<TableHeaderColumn isKey dataField="id" hidden={true}>Id</TableHeaderColumn>
	          <TableHeaderColumn id="subscriberName" dataField="subscriberName" hidden={this.state.hideSubscriberName} width="150px" dataSort>Subscriber Name</TableHeaderColumn>
						<TableHeaderColumn dataField="phoneNumber" width="130px" hidden={this.state.hidePhoneNumber} dataSort>Phone Number</TableHeaderColumn>
						<TableHeaderColumn dataField="ratePlan" width="100px" hidden={this.state.hideRatePlan} dataSort>Rate Plan</TableHeaderColumn>
						<TableHeaderColumn dataField="subscriptionStatus" width="90px" hidden={this.state.hideSubscriptionStatus} dataSort>Status</TableHeaderColumn>
						<TableHeaderColumn dataField="ban" width="80px" hidden={this.state.hideBan} dataSort>Ban</TableHeaderColumn>
						<TableHeaderColumn dataField="sim" width="160px" hidden={this.state.hideSim} dataSort>SIM</TableHeaderColumn>
						<TableHeaderColumn dataField="contractStartDate" hidden={this.state.hideContractStartDate} width="180px" dataSort>Contract Start Date</TableHeaderColumn>
						<TableHeaderColumn dataField="contractEndDate" width="180px" hidden={this.state.hideContractEndDate} dataSort>Contract End Date</TableHeaderColumn>
						<TableHeaderColumn dataField="deviceBalance" width="130px"  hidden={this.state.hideDeviceBalance} dataSort>Device Balance</TableHeaderColumn>
          </BootstrapTable>
					</p>
          </CardBody>
		    </Card>
      </div>
    );
  }
}

export default DataTable;
