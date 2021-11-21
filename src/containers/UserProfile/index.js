import React, { memo, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Card from '../../components/Card';
import { REJECTED, SHORTLISTED } from '../../constants/StatusConstant';
import UsersContext from '../../contexts/Users';

function UserProfile({ handleCandidateStatus }) {
  const { id } = useParams();
  const { usersData } = useContext(UsersContext);
  const [candidate, setCandidate] = useState({});

  useEffect(() => {
    for (let i = 0; i < usersData.candidates.length; i++) {
      if (usersData.candidates[i].id === id) {
        setCandidate(usersData.candidates[i]);
        break;
      }
    }
  }, [usersData]);

  return (
    <div className="UserProfile__Root Users_Card">
      {candidate.id ? (
        <Card name={candidate.name} source={candidate.Image}>
          {usersData.toReview.filter((user) => user.id === id).length !== 0 && (
            <div>
              <button
                className="Card__Button Button-Danger"
                onClick={() => handleCandidateStatus(candidate.id, REJECTED)}
              >
                Reject
              </button>
              <button
                className="Card__Button Button-Success"
                onClick={() => handleCandidateStatus(candidate.id, SHORTLISTED)}
              >
                Shortlist
              </button>
            </div>
          )}
        </Card>
      ) : (
        <h3>No User Found</h3>
      )}
    </div>
  );
}

export default memo(UserProfile);
