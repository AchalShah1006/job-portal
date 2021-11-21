import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  const ListItem = ({ text, src }) => (
    <li>
      <Link className="Nav-Link" to={src}>
        <span>{text}</span>
      </Link>
    </li>
  );

  return (
    <div className="Header__Root">
      <div className="Header__Context">
        <div className="brandName">Job Portal</div>
        <div className="Header__Navigation">
          <nav>
            <ul>
              <ListItem text="Home" src="/" />
              <ListItem text="Shortlisted" src="/shortlisted" />
              <ListItem text="Rejected" src="/rejected" />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
