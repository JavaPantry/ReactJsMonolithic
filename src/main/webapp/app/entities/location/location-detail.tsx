import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FaArrowLeft, FaPencil } from 'react-icons/lib/fa';

import { getEntity } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationDetailProps {
  getEntity: ICrudGetAction<ILocation>;
  location: ILocation;
  match: any;
}

export class LocationDetail extends React.Component<ILocationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { location } = this.props;
    return (
      <div className="row justify-content-center">
        <div className="col-8">
          <h2>
            Location [<b>{location.id}</b>]
          </h2>
          <dl className="row-md jh-entity-details">
            <dt>
              <span id="streetAddress">Street Address</span>
            </dt>
            <dd>{location.streetAddress}</dd>
            <dt>
              <span id="postalCode">Postal Code</span>
            </dt>
            <dd>{location.postalCode}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{location.city}</dd>
            <dt>
              <span id="stateProvince">State Province</span>
            </dt>
            <dd>{location.stateProvince}</dd>
            <dt>
              <span id="regionName">Region Name</span>
            </dt>
            <dd>{location.regionName}</dd>
            <dt>
              <span id="countryName">Country Name</span>
            </dt>
            <dd>{location.countryName}</dd>
          </dl>
          <Button tag={Link} to="/entity/location" replace color="info">
            <FaArrowLeft /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/location/${location.id}/edit`} replace color="primary">
            <FaPencil /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ location }) => ({
  location: location.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail);
