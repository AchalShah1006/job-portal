import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Switch, useHistory } from 'react-router-dom';
import Homepage from '../Homepage';
import DisplayUser from '../../components/DisplayUser';
import UserProfile from '../UserProfile';
import ErrorPage from '../ErrorPage';
import UsersContext from '../../contexts/Users';
import { REJECTED, SHORTLISTED } from '../../constants/StatusConstant';
import './app.css';

function App() {
  const history = useHistory();
  const [usersData, setUsersData] = useState({
    candidates: [],
    toReview: [],
    shortlisted: [],
    rejected: [],
  });
  const [loading, setLoading] = useState(true);

  //   Fetch Users Data
  useEffect(() => {
    axios
      .get(
        'https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json'
      )
      .then((res) =>
        setUsersData((prev) => ({
          ...prev,
          candidates: res.data,
          toReview: res.data,
        }))
      )
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  //   Handle Candidate status
  const handleCandidateStatus = useCallback(
    (id, newStatus) => {
      if (newStatus === SHORTLISTED) {
        setUsersData((prev) => ({
          ...prev,
          shortlisted: [
            ...prev.shortlisted,
            ...usersData.candidates.filter((user) => user.id === id),
          ],
          toReview: [...usersData.toReview.filter((user) => user.id !== id)],
        }));
      } else if (newStatus === REJECTED) {
        setUsersData((prev) => ({
          ...prev,
          rejected: [
            ...prev.rejected,
            ...usersData.candidates.filter((user) => user.id === id),
          ],
          toReview: [...usersData.toReview.filter((user) => user.id !== id)],
        }));
      }

      history.push('/');
    },
    [usersData]
  );

  return loading ? (
    'Loading...!!'
  ) : (
    <div className="App">
      <UsersContext.Provider value={{ usersData }}>
        <Switch>
          <Route exact path="/">
            <Homepage handleCandidateStatus={handleCandidateStatus} />
          </Route>
          <Route exact path="/user/:id">
            <UserProfile handleCandidateStatus={handleCandidateStatus} />
          </Route>
          <Route path="/shortlisted">
            <DisplayUser users={usersData.shortlisted} />
          </Route>
          <Route path="/rejected">
            <DisplayUser users={usersData.rejected} />
          </Route>
          <Route path="*">
            <ErrorPage statusCode={404} message="Page Does not Exist" />
          </Route>
        </Switch>
      </UsersContext.Provider>
    </div>
  );
}

export default App;
