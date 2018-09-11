import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import config from 'react-global-configuration';

class DataTable extends Component {
	
	componentWillMount(){
		axios({
			method:'get',
			url:'/subscribers',
			baseURL: config.get('baseURL')
		})
		.then(res => {
        const response = res.data;
		this.setState({responseData:response});
		//console.log(response);
		
		var subscriberInfo = document.getElementById("subscriberInfo");
		subscriberInfo.style.display = "block";
		var subscriberUsage = document.getElementById("subscriberUsage");
		subscriberUsage.style.display = "none";
		
      })
	}
	
	constructor(props) {
		super(props);
		this.state = {responseData:''};
		this.table = '';
		this.options = {
			sortIndicator: true,
			hideSizePerPage: true,
			paginationSize: 3,
			hidePageListOnlyOnePage: true,
			clearSearch: true,
			alwaysShowAllBtns: false,
			withFirstAndLast: true,
			pageSize: 5,
		}
		this.selectRow = {
			mode: "checkbox",
			clickToSelect: true,
			bgColor: "rgb(238, 193, 213)",
			onSelect: (row, isSelect, rowIndex, e) => {
				alert(row.subscriber);
			}
		}
		this.show_subscriberInfo= this.show_subscriberInfo.bind(this);
		this.show_subscriberUsage= this.show_subscriberUsage.bind(this);
	}
	
	show_subscriberInfo() {
		var subscriberInfo = document.getElementById("subscriberInfo");
		subscriberInfo.style.display = "block";
		var subscriberUsage = document.getElementById("subscriberUsage");
		subscriberUsage.style.display = "none";
	}
	
	show_subscriberUsage() {
		var subscriberUsage = document.getElementById("subscriberUsage");
		subscriberUsage.style.display = "block";
		var subscriberInfo = document.getElementById("subscriberInfo");
		subscriberInfo.style.display = "none";
	}

  render() {

    return (
      <div className="animated">
		
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>Subscriber Information
          </CardHeader>
		  <div id="subscriber-main">
			<a href="/#/telus/subscriberInfo" onClick={this.show_subscriberInfo}>Subscriber info</a><br/>
			<a href="/#/telus/subscriberInfo" onClick={this.show_subscriberUsage}>Subscriber usage</a>
		  </div>
          <CardBody>
			<div id="subscriberInfo" >
            <BootstrapTable data={this.state.responseData} condensed version="4" striped hover pagination search selectRow={this.selectRow} options={this.options}>
                <TableHeaderColumn isKey dataField="subscriber" dataSort>Subscriber</TableHeaderColumn>
				<TableHeaderColumn dataField="billingaccountno" dataSort>Billing Acc no.</TableHeaderColumn>
				<TableHeaderColumn dataField="intervalstartdate" dataSort>Interval Start date</TableHeaderColumn>
				<TableHeaderColumn dataField="intervalenddate" dataSort>Interval End date</TableHeaderColumn>
				<TableHeaderColumn dataField="externalid" dataSort>External Id</TableHeaderColumn>
				<TableHeaderColumn dataField="imei" dataSort>IMEI</TableHeaderColumn>
				<TableHeaderColumn dataField="billcycle" dataSort>Bill Cycle</TableHeaderColumn>
            </BootstrapTable>
			</div>
			<div id="subscriberUsage">
			<BootstrapTable data={this.state.responseData} condensed version="4" striped hover pagination search selectRow={this.selectRow} options={this.options} >
                <TableHeaderColumn isKey dataField="subscriber" dataSort>Subscriber</TableHeaderColumn>
				<TableHeaderColumn dataField="billcycledaysremaining" dataSort>billcycledaysremaining</TableHeaderColumn>
				<TableHeaderColumn dataField="domesticindividualbucket" dataSort>Domestic individual bucket</TableHeaderColumn>
				<TableHeaderColumn dataField="domesticindividualusage" dataSort>Domestic individual usage</TableHeaderColumn>
				<TableHeaderColumn dataField="totalmtddomesticdatausage" dataSort>Total mtd domestic data usage</TableHeaderColumn>
				<TableHeaderColumn dataField="totalincludeddomesticdata" dataSort>Total include domestic data</TableHeaderColumn>
				<TableHeaderColumn dataField="datazipfile" dataSort>Data file</TableHeaderColumn>
            </BootstrapTable>
			</div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default DataTable;
