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
            <BootstrapTable data={this.state.responseData} version="4" striped hover pagination search options={this.options} insertRow deleteRow>
				<TableHeaderColumn isKey dataField="initialdate" width='150px' dataSort>Initial Date</TableHeaderColumn>
				<TableHeaderColumn dataField="datazipfile" width='150px' dataSort>Data Zip File</TableHeaderColumn>
				<TableHeaderColumn dataField="billingaccountno" width='150px' dataSort>Billing Account No</TableHeaderColumn>
				<TableHeaderColumn dataField="subscriber" width='150px' dataSort>Subscriber</TableHeaderColumn>
				<TableHeaderColumn dataField="externalid" width='150px' dataSort>External Id</TableHeaderColumn>
				<TableHeaderColumn dataField="billcycle" width='150px' dataSort>Bill Cycle</TableHeaderColumn>
				<TableHeaderColumn dataField="billmonthnum" width='150px' dataSort>Bill Month Num</TableHeaderColumn>
				<TableHeaderColumn dataField="billyearnum" width='150px' dataSort>Bill Year Num</TableHeaderColumn>
				<TableHeaderColumn dataField="intervalstartdate" width='150px' dataSort>Interval Start Date</TableHeaderColumn>
				<TableHeaderColumn dataField="intervalenddate" width='150px' dataSort>Interval End Date</TableHeaderColumn>
				<TableHeaderColumn dataField="imei" width='150px' dataSort>IMEI</TableHeaderColumn>
				<TableHeaderColumn dataField="billcycledaysremaining" width='150px' dataSort>Bill Cycle Days Remaining</TableHeaderColumn>
				<TableHeaderColumn dataField="mtdusagedomesticindividual" width='150px' dataSort>MTD Usage Domestic Individual</TableHeaderColumn>
				<TableHeaderColumn dataField="domesticindividualbucket" width='150px' dataSort>Domestic Individual Bucket</TableHeaderColumn>
				<TableHeaderColumn dataField="domesticindividualusage" width='150px' dataSort>Domestic Individual Usage</TableHeaderColumn>
				<TableHeaderColumn dataField="mtdusagedomesticsharedsinglesub" width='150px' dataSort>MTD Usage Domestic Shared Single Sub</TableHeaderColumn>
				<TableHeaderColumn dataField="mtdusageroamingindividual" width='150px' dataSort>MTD Usage Roaming Individual</TableHeaderColumn>
				<TableHeaderColumn dataField="roamingindividualbucket" width='150px' dataSort>Roaming Individual Bucket</TableHeaderColumn>
				<TableHeaderColumn dataField="roamingindividualusage" width='150px' dataSort>Roaming Individual Usage</TableHeaderColumn>
				<TableHeaderColumn dataField="mtdusageroamingsharedindividualsub" width='150px' dataSort>MTD Usage Roaming Shared Individual Sub</TableHeaderColumn>
				<TableHeaderColumn dataField="overageusagedomestic" width='150px' dataSort>Overage Usage Domestic</TableHeaderColumn>
				<TableHeaderColumn dataField="overageusageroaming" width='150px' dataSort>Overage Usage Roaming</TableHeaderColumn>
				<TableHeaderColumn dataField="totalmtddomesticdatausage" width='150px' dataSort>Total MTD Domestic Data Usage</TableHeaderColumn>
				<TableHeaderColumn dataField="totalincludeddomesticdata" width='150px' dataSort>Total Included Domestic Data</TableHeaderColumn>
				<TableHeaderColumn dataField="domesticoveragechargedamount" width='150px' dataSort>Domestic Overage Charged Amount</TableHeaderColumn>
				<TableHeaderColumn dataField="roamingoveragechargedamount" width='150px' dataSort>Roaming Overage Charged Amount</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default DataTable;
