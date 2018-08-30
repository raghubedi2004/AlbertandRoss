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
	}

  render() {

    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>Subscriber Information
          </CardHeader>
          <CardBody>
            <BootstrapTable data={this.state.responseData} version="4" striped hover pagination search options={this.options}>
              <TableHeaderColumn isKey dataField="subscriber" width='150px' dataSort>Subscriber</TableHeaderColumn>
				<TableHeaderColumn dataField="billingaccountno" width='150px' dataSort>Billing Acc no.</TableHeaderColumn>
				<TableHeaderColumn dataField="intervalstartdate" width='180px' dataSort>Interval Start date</TableHeaderColumn>
				<TableHeaderColumn dataField="intervalenddate" width='180px' dataSort>Interval End date</TableHeaderColumn>
				<TableHeaderColumn dataField="externalid" width='150px' dataSort>External Id</TableHeaderColumn>
				<TableHeaderColumn dataField="imei" width='150px' dataSort>IMEI</TableHeaderColumn>
				<TableHeaderColumn dataField="billcycle" width='150px' dataSort>Bill Cycle</TableHeaderColumn>
				<TableHeaderColumn dataField="billcycledaysremaining" width='150px' dataSort>billcycledaysremaining</TableHeaderColumn>
				<TableHeaderColumn dataField="domesticindividualbucket" width='150px' dataSort>Domestic individual bucket</TableHeaderColumn>
				<TableHeaderColumn dataField="domesticindividualusage" width='150px' dataSort>Domestic individual usage</TableHeaderColumn>
				<TableHeaderColumn dataField="totalmtddomesticdatausage" width='150px' dataSort>Total mtd domestic data usage</TableHeaderColumn>
				<TableHeaderColumn dataField="totalincludeddomesticdata" width='150px' dataSort>Total include domestic data</TableHeaderColumn>
				<TableHeaderColumn dataField="datazipfile" width='400px' dataSort>Data file</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default DataTable;
