import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import { getEntities } from './department.reducer';
import { IDepartment } from 'app/shared/model/department.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDepartmentProps {
  getEntities: ICrudGetAllAction<IDepartment>;
  departmentList: IDepartment[];
  match: any;
}

export class Department extends React.Component<IDepartmentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { departmentList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          Departments
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FaPlus />
            Create new Department
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Department Name</th>
                <th>Location</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {departmentList.map((department, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${department.id}`} color="link" size="sm">
                      {department.id}
                    </Button>
                  </td>
                  <td>{department.departmentName}</td>
                  <td>{department.locationId ? <Link to={`location/${department.locationId}`}>{department.locationId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${department.id}`} color="info" size="sm">
                        <FaEye /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${department.id}/edit`} color="primary" size="sm">
                        <FaPencil /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${department.id}/delete`} color="danger" size="sm">
                        <FaTrash /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ department }) => ({
  departmentList: department.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(Department);
