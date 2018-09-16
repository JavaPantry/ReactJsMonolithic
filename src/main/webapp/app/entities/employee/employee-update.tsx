import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO, FaArrowLeft } from 'react-icons/lib/fa';

import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';

export interface IEmployeeUpdateProps {
  getEntity: ICrudGetAction<IEmployee>;
  updateEntity: ICrudPutAction<IEmployee>;
  createEntity: ICrudPutAction<IEmployee>;
  getDepartments: ICrudGetAllAction<IDepartment>;
  departments: IDepartment[];
  getEmployees: ICrudGetAllAction<IEmployee>;
  employees: IEmployee[];
  employee: IEmployee;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IEmployeeUpdateState {
  isNew: boolean;
  departmentId: number;
  managerId: number;
}

export class EmployeeUpdate extends React.Component<IEmployeeUpdateProps, IEmployeeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      departmentId: 0,
      managerId: 0
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDepartments();
    this.props.getEmployees();
  }

  saveEntity = (event, errors, values) => {
    values.hireDate = new Date(values.hireDate);

    if (errors.length === 0) {
      const { employee } = this.props;
      const entity = {
        ...employee,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/employee');
  };

  departmentUpdate = element => {
    const id = element.target.value;
    for (const i in this.props.departments) {
      if (id.toString() === this.props.departments[i].id.toString()) {
        this.setState({
          departmentId: this.props.departments[i].id
        });
      }
    }
  };

  managerUpdate = element => {
    const id = element.target.value;
    for (const i in this.props.employees) {
      if (id.toString() === this.props.employees[i].id.toString()) {
        this.setState({
          managerId: this.props.employees[i].id
        });
      }
    }
  };

  render() {
    const isInvalid = false;
    const { employee, departments, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-employee-heading">Create or edit a Employee</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : employee} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="firstName">
                    First Name
                  </Label>
                  <AvField type="text" name="firstName" />
                  <UncontrolledTooltip target="firstNameLabel">The firstname attribute.</UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="lastName">
                    Last Name
                  </Label>
                  <AvField type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    Email
                  </Label>
                  <AvField type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="phoneNumber">
                    Phone Number
                  </Label>
                  <AvField type="text" name="phoneNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="hireDateLabel" for="hireDate">
                    Hire Date
                  </Label>
                  <AvInput
                    type="datetime-local"
                    className="form-control"
                    name="hireDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.employee.hireDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="salaryLabel" for="salary">
                    Salary
                  </Label>
                  <AvField type="number" className="form-control" name="salary" />
                </AvGroup>
                <AvGroup>
                  <Label id="commissionPctLabel" for="commissionPct">
                    Commission Pct
                  </Label>
                  <AvField type="number" className="form-control" name="commissionPct" />
                </AvGroup>
                <AvGroup>
                  <Label for="department.id">Department</Label>
                  <AvInput type="select" className="form-control" name="departmentId" onChange={this.departmentUpdate}>
                    <option value="" key="0" />
                    {departments
                      ? departments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="manager.id">Manager</Label>
                  <AvInput type="select" className="form-control" name="managerId" onChange={this.managerUpdate}>
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/employee" replace color="info">
                  <FaArrowLeft />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FaFloppyO />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  departments: storeState.department.entities,
  employees: storeState.employee.entities,
  employee: storeState.employee.entity,
  loading: storeState.employee.loading,
  updating: storeState.employee.updating
});

const mapDispatchToProps = {
  getDepartments,
  getEmployees,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeUpdate);
