import React, { useCallback, useState, useEffect, useContext } from 'react';
import Card from '../../components/Card';
import { REJECTED, SHORTLISTED } from '../../constants/StatusConstant';
import UsersContext from '../../contexts/Users';
import './homepage.css';

function Homepage({ handleCandidateStatus }) {
  const { usersData } = useContext(UsersContext);
  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState('');

  // Users based on search field
  useEffect(() => {
    if (searchField === '') {
      setUsers(usersData.toReview);
    } else {
      const searchUser = usersData.toReview.filter(
        (user) => user.name.toLowerCase().includes(searchField.toLowerCase()) //  Filter out user having sub string as of search field
      );
      setUsers(searchUser);
    }
  }, [searchField, usersData]);

  // handle searchField update
  const handleSearchField = useCallback((newValue) => {
    setSearchField(newValue);
  }, []);

  return (
    <div>
      <div className="Homepage__SearchField">
        <label>Search Candidates</label>
        <input
          type="text"
          name="users"
          value={searchField}
          onChange={(event) => handleSearchField(event.target.value)}
        />
      </div>
      <div className="Users_Card">
        {users.length !== 0 ? (
          users.map((user) => (
            <Card
              key={user.id}
              name={user.name}
              source={user.Image}
              id={user.id}
            >
              <div>
                <button
                  className="Card__Button Button-Danger"
                  onClick={() => handleCandidateStatus(user.id, REJECTED)}
                >
                  Reject
                </button>
                <button
                  className="Card__Button Button-Success"
                  onClick={() => handleCandidateStatus(user.id, SHORTLISTED)}
                >
                  Shortlist
                </button>
              </div>
            </Card>
          ))
        ) : usersData.candidates.length !== 0 ? (
          <h3>All users are reviewed</h3>
        ) : (
          <h3>No candidate applied</h3>
        )}
      </div>
    </div>
  );
}

export default Homepage;
