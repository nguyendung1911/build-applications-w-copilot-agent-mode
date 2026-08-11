import { useEffect, useState } from 'react';
import { fetchFromEndpoint, getCollectionUrl } from '../lib/api';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : getCollectionUrl('workouts');

function Workouts() {
  const [state, setState] = useState({
    loading: true,
    error: '',
    items: [],
    total: 0,
    pagination: null,
  });

  useEffect(() => {
    let active = true;

    fetchFromEndpoint(workoutsEndpoint)
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
      <h2>Workouts</h2>
      <p className="text-secondary">Endpoint: {workoutsEndpoint}</p>
      {state.loading && <p>Loading workouts...</p>}
      {state.error && <p className="text-danger">{state.error}</p>}
      {!state.loading && !state.error && (
        <>
          <p>Total: {state.total}</p>
          <div className="row g-3">
            {state.items.map((workout) => (
              <div className="col-12 col-md-6 col-xl-4" key={workout._id || workout.title}>
                <article className="card h-100">
                  <div className="card-body">
                    <h3 className="h5 card-title">{workout.title}</h3>
                    <p className="card-text mb-2">Goal: {workout.goal}</p>
                    <p className="card-text mb-2">Difficulty: {workout.difficulty}</p>
                    <p className="card-text mb-0">Duration: {workout.durationMinutes} minutes</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
          {state.pagination && (
            <pre className="small bg-light p-2 border rounded mt-3">{JSON.stringify(state.pagination, null, 2)}</pre>
          )}
        </>
      )}
    </section>
  );
}

export default Workouts;
