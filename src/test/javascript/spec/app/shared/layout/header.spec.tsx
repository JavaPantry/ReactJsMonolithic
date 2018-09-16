import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';

import Header from 'app/shared/layout/header/header';

describe('Header', () => {
  let mountedWrapper;

  const wrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<Header isAuthenticated isAdmin />);
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    mountedWrapper = undefined;
  });

  // All tests will go here
  it('Renders a component with LoadingBar, Navbar and Nav', () => {
    const navbar = wrapper().find(Navbar);
    expect(navbar.length).to.equal(1);
    expect(navbar.find(NavbarBrand).find('.brand-logo').length).to.equal(1);
    const nav = wrapper().find(Nav);
    expect(nav.length).to.equal(1);
    expect(nav.find(NavItem).length).to.equal(1);
  });
});