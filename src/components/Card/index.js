import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './card.css';

function Card({ name, source, id, children }) {
  const location = useLocation();

  const RedirectUser = location.pathname.includes('user') ? (
    <span>{name}</span>
  ) : (
    <Link to={`/user/${id}`}>{name}</Link>
  );

  return (
    <div className="Card__Root">
      <div className="Card__Body">
        <div className="Card__Image">
          <img src={source} width={128} height={128} />
        </div>
        <div className="Card__Text">{RedirectUser}</div>
      </div>
      <div className="Card__Footer">{children}</div>
    </div>
  );
}

export default memo(Card);
