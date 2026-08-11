import { useEffect, useState } from 'react';
import { fetchCollection, getCollectionUrl } from '../lib/api';

function Teams() {
  const [state, setState] = useState({
    loading: true,
    error: '',
    items: [],
    total: 0,
    pagination: null,
  });

  useEffect(() => {
    let active = true;

    fetchCollection('teams')
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
      <h2>Teams</h2>
      <p className="text-secondary">Endpoint: {getCollectionUrl('teams')}</p>
      {state.loading && <p>Loading teams...</p>}
      {state.error && <p className="text-danger">{state.error}</p>}
      {!state.loading && !state.error && (
        <>
          <p>Total: {state.total}</p>
          <ul className="list-group">
            {state.items.map((team) => (
              <li key={team._id || team.name} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>{team.name}</strong>
                  {team.description ? ` - ${team.description}` : ''}
                </span>
                <span className="badge text-bg-secondary rounded-pill">{Array.isArray(team.members) ? team.members.length : 0} members</span>
              </li>
            ))}
          </ul>
          {state.pagination && (
            <pre className="small bg-light p-2 border rounded mt-3">{JSON.stringify(state.pagination, null, 2)}</pre>
          )}
        </>
      )}
    </section>
  );
}

export default Teams;
