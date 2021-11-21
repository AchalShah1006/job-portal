import React, { memo } from 'react';
import Card from '../Card';
// import { REJECTED, SHORTLISTED } from '../../constants/StatusConstant';

function DisplayUser({ users }) {
  return (
    <div className="Display-User__Root Users_Card">
      {users.length === 0 ? (
        <h3>No User Found</h3>
      ) : (
        users.map((user) => (
          <Card
            key={user.id}
            id={user.id}
            name={user.name}
            source={user.Image}
          />
        ))
      )}
    </div>
  );
}

export default memo(DisplayUser);
