import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FaArrowLeft, FaPencil } from 'react-icons/lib/fa';

import { getEntity } from './department.reducer';
import { IDepartment } from 'app/shared/model/department.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDepartmentDetailProps {
  getEntity: ICrudGetAction<IDepartment>;
  department: IDepartment;
  match: any;
}

export class DepartmentDetail extends React.Component<IDepartmentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { department } = this.props;
    return (
      <div className="row justify-content-center">
        <div className="col-8">
          <h2>
            Department [<b>{department.id}</b>]
          </h2>
          <dl className="row-md jh-entity-details">
            <dt>
              <span id="departmentName">Department Name</span>
            </dt>
            <dd>{department.departmentName}</dd>
            <dt>Location</dt>
            <dd>{department.locationId ? department.locationId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/department" replace color="info">
            <FaArrowLeft /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/department/${department.id}/edit`} replace color="primary">
            <FaPencil /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ department }) => ({
  department: department.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentDetail);
