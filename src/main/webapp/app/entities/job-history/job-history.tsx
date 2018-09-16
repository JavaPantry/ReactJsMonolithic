import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash, FaSort } from 'react-icons/lib/fa';

import { getEntities, reset } from './job-history.reducer';
import { IJobHistory } from 'app/shared/model/job-history.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IJobHistoryProps {
  getEntities: ICrudGetAllAction<IJobHistory>;
  reset: Function;
  jobHistoryList: IJobHistory[];
  links: {
    last: 0;
  };
  totalItems: 0;
  location: any;
  match: any;
}

export type IJobHistoryState = IPaginationBaseState;

export class JobHistory extends React.Component<IJobHistoryProps, IJobHistoryState> {
  state: IJobHistoryState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => this.getEntities());
  };

  handleLoadMore = page => {
    this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.reset()
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { jobHistoryList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Job Histories
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FaPlus />
            Create new Job History
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage <= this.props.links.last}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    ID <FaSort />
                  </th>
                  <th className="hand" onClick={this.sort('startDate')}>
                    Start Date <FaSort />
                  </th>
                  <th className="hand" onClick={this.sort('endDate')}>
                    End Date <FaSort />
                  </th>
                  <th className="hand" onClick={this.sort('language')}>
                    Language <FaSort />
                  </th>
                  <th>
                    Job <FaSort />
                  </th>
                  <th>
                    Department <FaSort />
                  </th>
                  <th>
                    Employee <FaSort />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {jobHistoryList.map((jobHistory, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${jobHistory.id}`} color="link" size="sm">
                        {jobHistory.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={jobHistory.startDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={jobHistory.endDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{jobHistory.language}</td>
                    <td>{jobHistory.jobId ? <Link to={`job/${jobHistory.jobId}`}>{jobHistory.jobId}</Link> : ''}</td>
                    <td>
                      {jobHistory.departmentId ? <Link to={`department/${jobHistory.departmentId}`}>{jobHistory.departmentId}</Link> : ''}
                    </td>
                    <td>{jobHistory.employeeId ? <Link to={`employee/${jobHistory.employeeId}`}>{jobHistory.employeeId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${jobHistory.id}`} color="info" size="sm">
                          <FaEye /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${jobHistory.id}/edit`} color="primary" size="sm">
                          <FaPencil /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${jobHistory.id}/delete`} color="danger" size="sm">
                          <FaTrash /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ jobHistory }) => ({
  jobHistoryList: jobHistory.entities,
  totalItems: jobHistory.totalItems,
  links: jobHistory.links
});

const mapDispatchToProps = {
  getEntities,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(JobHistory);
