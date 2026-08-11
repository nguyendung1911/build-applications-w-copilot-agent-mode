import { useEffect, useState } from 'react';
import { fetchFromEndpoint, getCollectionUrl } from '../lib/api';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : getCollectionUrl('activities');

function Activities() {
  const [state, setState] = useState({
    loading: true,
    error: '',
    items: [],
    total: 0,
    pagination: null,
  });

  useEffect(() => {
    let active = true;

    fetchFromEndpoint(activitiesEndpoint)
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
      <h2>Activities</h2>
      <p className="text-secondary">Endpoint: {activitiesEndpoint}</p>
      {state.loading && <p>Loading activities...</p>}
      {state.error && <p className="text-danger">{state.error}</p>}
      {!state.loading && !state.error && (
        <>
          <p>Total: {state.total}</p>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Type</th>
                  <th>Duration (min)</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {state.items.map((activity) => (
                  <tr key={activity._id || `${activity.activityType}-${activity.loggedAt}`}>
                    <td>{activity.user?.name || activity.user?.email || 'Unknown'}</td>
                    <td>{activity.activityType}</td>
                    <td>{activity.durationMinutes}</td>
                    <td>{activity.caloriesBurned}</td>
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

export default Activities;
