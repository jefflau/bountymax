import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Exploit from './exploit';

export default class Bounties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bounties:[]};
  }

  componentDidMount(){
    this.props.connector.contract.allEvents({fromBlock:'latest'}, (error, data) => {
      this.props.connector.getBounties((bounties) => {
        this.setState({bounties:bounties})
      })
    })
    this.props.connector.getBounties((bounties) => {
      this.setState({bounties:bounties})
    })
  }

  render(){
    let showBounties = this.state.bounties.map((bounty) => {
      return(
        <TableRow>
          <TableRowColumn>
            {bounty.name}
          </TableRowColumn>
          <TableRowColumn>
            {bounty.target}
          </TableRowColumn>
          <TableRowColumn>
            {bounty.invariant}
          </TableRowColumn>
          <TableRowColumn>
            {bounty.deposit.toString()}
          </TableRowColumn>
          <TableRowColumn>
            <Exploit targetAddress={bounty.target} invariantAddress={bounty.invariant} connector={this.props.connector}/>
          </TableRowColumn>
        </TableRow>
      )
    })

    return (
      <Paper zDepth={1} style={{height:'500px'}}>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn >Name</TableHeaderColumn>
              <TableHeaderColumn >Target</TableHeaderColumn>
              <TableHeaderColumn >Invariant</TableHeaderColumn>
              <TableHeaderColumn >Deposit</TableHeaderColumn>
              <TableHeaderColumn ></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {showBounties}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}
