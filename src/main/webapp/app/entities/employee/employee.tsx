import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash, FaSort } from 'react-icons/lib/fa';

import { getEntities, reset } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IEmployeeProps {
  getEntities: ICrudGetAllAction<IEmployee>;
  reset: Function;
  employeeList: IEmployee[];
  links: {
    last: 0;
  };
  totalItems: 0;
  location: any;
  match: any;
}

export type IEmployeeState = IPaginationBaseState;

export class Employee extends React.Component<IEmployeeProps, IEmployeeState> {
  state: IEmployeeState = {
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
    const { employeeList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Employees
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FaPlus />
            Create new Employee
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
                  <th className="hand" onClick={this.sort('firstName')}>
                    First Name <FaSort />
                  </th>
                  <th className="hand" onClick={this.sort('lastName')}>
                    Last Name <FaSort />
                  </th>
                  <th className="hand" onClick={this.sort('email')}>
                    Email <FaSort />
                  </th>
                  <th className="hand" onClick={this.sort('phoneNumber')}>
                    Phone Number <FaSort />
                  </th>
                  <th className="hand" onClick={this.sort('hireDate')}>
                    Hire Date <FaSort />
                  </th>
                  <th className="hand" onClick={this.sort('salary')}>
                    Salary <FaSort />
                  </th>
                  <th className="hand" onClick={this.sort('commissionPct')}>
                    Commission Pct <FaSort />
                  </th>
                  <th>
                    Department <FaSort />
                  </th>
                  <th>
                    Manager <FaSort />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {employeeList.map((employee, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${employee.id}`} color="link" size="sm">
                        {employee.id}
                      </Button>
                    </td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>
                      <TextFormat type="date" value={employee.hireDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{employee.salary}</td>
                    <td>{employee.commissionPct}</td>
                    <td>{employee.departmentId ? <Link to={`department/${employee.departmentId}`}>{employee.departmentId}</Link> : ''}</td>
                    <td>{employee.managerId ? <Link to={`employee/${employee.managerId}`}>{employee.managerId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${employee.id}`} color="info" size="sm">
                          <FaEye /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${employee.id}/edit`} color="primary" size="sm">
                          <FaPencil /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${employee.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ employee }) => ({
  employeeList: employee.entities,
  totalItems: employee.totalItems,
  links: employee.links
});

const mapDispatchToProps = {
  getEntities,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
