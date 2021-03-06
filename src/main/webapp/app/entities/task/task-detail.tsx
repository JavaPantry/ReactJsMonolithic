import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FaArrowLeft, FaPencil } from 'react-icons/lib/fa';

import { getEntity } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskDetailProps {
  getEntity: ICrudGetAction<ITask>;
  task: ITask;
  match: any;
}

export class TaskDetail extends React.Component<ITaskDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { task } = this.props;
    return (
      <div className="row justify-content-center">
        <div className="col-8">
          <h2>
            Task [<b>{task.id}</b>]
          </h2>
          <dl className="row-md jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{task.title}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{task.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/task" replace color="info">
            <FaArrowLeft /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/task/${task.id}/edit`} replace color="primary">
            <FaPencil /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ task }) => ({
  task: task.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
