import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, UncontrolledTooltip } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft, FaPencil } from 'react-icons/lib/fa';

import { getEntity } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDetailProps {
  getEntity: ICrudGetAction<IEmployee>;
  employee: IEmployee;
  match: any;
}

export class EmployeeDetail extends React.Component<IEmployeeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { employee } = this.props;
    return (
      <div className="row justify-content-center">
        <div className="col-8">
          <h2>
            Employee [<b>{employee.id}</b>]
          </h2>
          <dl className="row-md jh-entity-details">
            <dt>
              <span id="firstName">First Name</span>
              <UncontrolledTooltip target="firstName">The firstname attribute.</UncontrolledTooltip>
            </dt>
            <dd>{employee.firstName}</dd>
            <dt>
              <span id="lastName">Last Name</span>
            </dt>
            <dd>{employee.lastName}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{employee.email}</dd>
            <dt>
              <span id="phoneNumber">Phone Number</span>
            </dt>
            <dd>{employee.phoneNumber}</dd>
            <dt>
              <span id="hireDate">Hire Date</span>
            </dt>
            <dd>
              <TextFormat value={employee.hireDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="salary">Salary</span>
            </dt>
            <dd>{employee.salary}</dd>
            <dt>
              <span id="commissionPct">Commission Pct</span>
            </dt>
            <dd>{employee.commissionPct}</dd>
            <dt>Department</dt>
            <dd>{employee.departmentId ? employee.departmentId : ''}</dd>
            <dt>Manager</dt>
            <dd>{employee.managerId ? employee.managerId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/employee" replace color="info">
            <FaArrowLeft /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/employee/${employee.id}/edit`} replace color="primary">
            <FaPencil /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ employee }) => ({
  employee: employee.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);
