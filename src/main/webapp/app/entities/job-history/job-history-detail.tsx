import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft, FaPencil } from 'react-icons/lib/fa';

import { getEntity } from './job-history.reducer';
import { IJobHistory } from 'app/shared/model/job-history.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJobHistoryDetailProps {
  getEntity: ICrudGetAction<IJobHistory>;
  jobHistory: IJobHistory;
  match: any;
}

export class JobHistoryDetail extends React.Component<IJobHistoryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { jobHistory } = this.props;
    return (
      <div className="row justify-content-center">
        <div className="col-8">
          <h2>
            JobHistory [<b>{jobHistory.id}</b>]
          </h2>
          <dl className="row-md jh-entity-details">
            <dt>
              <span id="startDate">Start Date</span>
            </dt>
            <dd>
              <TextFormat value={jobHistory.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">End Date</span>
            </dt>
            <dd>
              <TextFormat value={jobHistory.endDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="language">Language</span>
            </dt>
            <dd>{jobHistory.language}</dd>
            <dt>Job</dt>
            <dd>{jobHistory.jobId ? jobHistory.jobId : ''}</dd>
            <dt>Department</dt>
            <dd>{jobHistory.departmentId ? jobHistory.departmentId : ''}</dd>
            <dt>Employee</dt>
            <dd>{jobHistory.employeeId ? jobHistory.employeeId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/job-history" replace color="info">
            <FaArrowLeft /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/job-history/${jobHistory.id}/edit`} replace color="primary">
            <FaPencil /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ jobHistory }) => ({
  jobHistory: jobHistory.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(JobHistoryDetail);
