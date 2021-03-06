import './header.css';

import * as React from 'react';

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {
  FaHome,
  FaThList,
  FaUserPlus,
  FaUser,
  FaHeart,
  FaList,
  FaTasks,
  FaDashboard,
  FaBook,
  FaWrench,
  FaSignIn,
  FaSignOut,
  FaClockO,
  FaHddO,
  FaCloud,
  // tslint:disable-next-line
  FaRoad,
  // tslint:disable-next-line
  FaEye,
  // tslint:disable-next-line
  FaAsterisk,
  // tslint:disable-next-line
  FaBell
} from 'react-icons/lib/fa';
import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import appConfig from 'app/config/constants';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface IHeaderState {
  menuOpen: boolean;
}

const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="static/images/logo-jhipster-react.svg" alt="Logo" />
  </div>
);
export class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  renderDevRibbon = () =>
    process.env.NODE_ENV === 'development' ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { isAuthenticated, isAdmin } = this.props;
    const entityMenuItems = [
      <DropdownItem tag={Link} key="location" to="/entity/location">
        <FaAsterisk />&nbsp; Location
      </DropdownItem>,
      <DropdownItem tag={Link} key="department" to="/entity/department">
        <FaAsterisk />&nbsp; Department
      </DropdownItem>,
      <DropdownItem tag={Link} key="task" to="/entity/task">
        <FaAsterisk />&nbsp; Task
      </DropdownItem>,
      <DropdownItem tag={Link} key="employee" to="/entity/employee">
        <FaAsterisk />&nbsp; Employee
      </DropdownItem>,
      <DropdownItem tag={Link} key="job" to="/entity/job">
        <FaAsterisk />&nbsp; Job
      </DropdownItem>,
      <DropdownItem tag={Link} key="job-history" to="/entity/job-history">
        <FaAsterisk />&nbsp; Job History
      </DropdownItem>,
      /* jhipster-needle-add-entity-to-menu - - JHipster will add entities to the menu here */
      <span key="dummy-placeholder" /> /* workaround to avoid error when there are no entities */
    ];
    /* jhipster-needle-add-element-to-menu - JHipster will add entities to the menu here */
    const adminMenuItems = [
      <DropdownItem tag={Link} key="user-management" to="/admin/user-management">
        <FaUser /> User Management
      </DropdownItem>,
      <DropdownItem tag={Link} key="metrics" to="/admin/metrics">
        <FaDashboard /> Metrics
      </DropdownItem>,
      <DropdownItem tag={Link} key="health" to="/admin/health">
        <FaHeart /> Health
      </DropdownItem>,
      <DropdownItem tag={Link} key="configuration" to="/admin/configuration">
        <FaList /> Configuration
      </DropdownItem>,
      <DropdownItem tag={Link} key="audits" to="/admin/audits">
        <FaBell /> Audits
      </DropdownItem>,
      <DropdownItem tag={Link} key="logs" to="/admin/logs">
        <FaTasks /> Logs
      </DropdownItem>,
      /* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */
      <DropdownItem tag={Link} key="docs" to="/admin/docs">
        <FaBook /> API Docs
      </DropdownItem>,
      <DropdownItem tag="a" key="h2-console" href="./h2-console" target="_tab">
        <FaHddO /> Database
      </DropdownItem>
    ];
    const accountMenuItems = [];
    if (isAuthenticated) {
      accountMenuItems.push(
        <DropdownItem tag={Link} key="settings" to="/account/settings">
          <FaWrench /> Settings
        </DropdownItem>,
        <DropdownItem tag={Link} key="password" to="/account/password">
          <FaClockO /> Password
        </DropdownItem>,
        <DropdownItem tag={Link} key="sessions" to="/account/sessions">
          <FaCloud /> Sessions
        </DropdownItem>,
        <DropdownItem tag={Link} key="logout" to="/logout">
          <FaSignOut /> Logout
        </DropdownItem>
      );
    } else {
      accountMenuItems.push(
        <DropdownItem tag={Link} key="login" to="/login">
          <FaSignIn /> Login
        </DropdownItem>,
        <DropdownItem tag={Link} key="register" to="/register">
          <FaSignIn /> Register
        </DropdownItem>
      );
    }

    const entitiesMenu = (
      <UncontrolledDropdown nav inNavbar key="entities">
        <DropdownToggle nav caret className="d-flex align-items-center">
          <FaThList />
          <span>Entities</span>
        </DropdownToggle>
        <DropdownMenu right>{entityMenuItems}</DropdownMenu>
      </UncontrolledDropdown>
    );
    const adminMenu = (
      <UncontrolledDropdown nav inNavbar key="admin">
        <DropdownToggle nav caret className="d-flex align-items-center">
          <FaUserPlus />
          <span>Administration</span>
        </DropdownToggle>
        <DropdownMenu right style={{ width: '130%' }}>
          {adminMenuItems}
        </DropdownMenu>
      </UncontrolledDropdown>
    );

    return (
      <div id="app-header">
        {this.renderDevRibbon()}
        <LoadingBar className="loading-bar" />
        <Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <NavbarBrand tag={Link} to="/" className="brand-logo">
            <BrandIcon />
            <span className="brand-title">Monolithic</span>
            <span className="navbar-version">{appConfig.VERSION}</span>
          </NavbarBrand>
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/" className="d-flex align-items-center">
                  <FaHome />
                  <span>Home</span>
                </NavLink>
              </NavItem>
              {isAuthenticated ? (isAdmin ? [entitiesMenu, adminMenu] : entitiesMenu) : null}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="d-flex align-items-center">
                  <FaUser />
                  <span>Account</span>
                </DropdownToggle>
                <DropdownMenu right>{accountMenuItems}</DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
