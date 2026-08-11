import { useEffect, useState } from 'react';
import { fetchFromEndpoint, getCollectionUrl } from '../lib/api';

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : getCollectionUrl('users');

function Users() {
  const [state, setState] = useState({
    loading: true,
    error: '',
    items: [],
    total: 0,
    pagination: null,
  });

  useEffect(() => {
    let active = true;

    fetchFromEndpoint(usersEndpoint)
      .then((result) => {
        if (!active) {
          return;
        }

        setState({ loading: false, error: '', ...result });
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setState((current) => ({
          ...current,
          loading: false,
          error: error.message,
        }));
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section>
      <h2>Users</h2>
      <p className="text-secondary">Endpoint: {usersEndpoint}</p>
      {state.loading && <p>Loading users...</p>}
      {state.error && <p className="text-danger">{state.error}</p>}
      {!state.loading && !state.error && (
        <>
          <p>Total: {state.total}</p>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Fitness Level</th>
                </tr>
              </thead>
              <tbody>
                {state.items.map((user) => (
                  <tr key={user._id || user.email}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age ?? '-'}</td>
                    <td>{user.fitnessLevel ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {state.pagination && (
            <pre className="small bg-light p-2 border rounded">{JSON.stringify(state.pagination, null, 2)}</pre>
          )}
        </>
      )}
    </section>
  );
}

export default Users;
