import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CategoriesSwitch } from 'components/';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="global-header">
        <div className="inner">
          <div className="header-title">
            <Link to="/">Readable</Link>
          </div>
          <div className="header-categories">
            <CategoriesSwitch />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
