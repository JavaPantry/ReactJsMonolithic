import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash, FaSort } from 'react-icons/lib/fa';

import { getEntities } from './job.reducer';
import { IJob } from 'app/shared/model/job.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IJobProps {
  getEntities: ICrudGetAllAction<IJob>;
  jobList: IJob[];
  totalItems: 0;
  location: any;
  history: any;
  match: any;
}

export type IJobState = IPaginationBaseState;

export class Job extends React.Component<IJobProps, IJobState> {
  state: IJobState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { jobList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Jobs
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FaPlus />
            Create new Job
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  ID <FaSort />
                </th>
                <th className="hand" onClick={this.sort('jobTitle')}>
                  Job Title <FaSort />
                </th>
                <th className="hand" onClick={this.sort('minSalary')}>
                  Min Salary <FaSort />
                </th>
                <th className="hand" onClick={this.sort('maxSalary')}>
                  Max Salary <FaSort />
                </th>
                <th>
                  Employee <FaSort />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {jobList.map((job, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${job.id}`} color="link" size="sm">
                      {job.id}
                    </Button>
                  </td>
                  <td>{job.jobTitle}</td>
                  <td>{job.minSalary}</td>
                  <td>{job.maxSalary}</td>
                  <td>{job.employeeId ? <Link to={`employee/${job.employeeId}`}>{job.employeeId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${job.id}`} color="info" size="sm">
                        <FaEye /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${job.id}/edit`} color="primary" size="sm">
                        <FaPencil /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${job.id}/delete`} color="danger" size="sm">
                        <FaTrash /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ job }) => ({
  jobList: job.entities,
  totalItems: job.totalItems
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(Job);
