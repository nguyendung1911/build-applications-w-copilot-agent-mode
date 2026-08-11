import { useEffect, useState } from 'react';
import { fetchCollection, getCollectionUrl } from '../lib/api';

function Leaderboard() {
  const [state, setState] = useState({
    loading: true,
    error: '',
    items: [],
    total: 0,
    pagination: null,
  });

  useEffect(() => {
    let active = true;

    fetchCollection('leaderboard')
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
      <h2>Leaderboard</h2>
      <p className="text-secondary">Endpoint: {getCollectionUrl('leaderboard')}</p>
      {state.loading && <p>Loading leaderboard...</p>}
      {state.error && <p className="text-danger">{state.error}</p>}
      {!state.loading && !state.error && (
        <>
          <p>Total records: {state.total}</p>
          <div className="accordion" id="leaderboard-accordion">
            {state.items.map((board, index) => (
              <div className="accordion-item" key={board._id || board.period || index}>
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#board-${index}`} aria-expanded="false" aria-controls={`board-${index}`}>
                    {board.period || `Board ${index + 1}`}
                  </button>
                </h2>
                <div id={`board-${index}`} className="accordion-collapse collapse" data-bs-parent="#leaderboard-accordion">
                  <div className="accordion-body">
                    <ol className="mb-0">
                      {(board.rankings || []).map((entry, rankIndex) => (
                        <li key={entry.user?._id || entry.user || rankIndex}>
                          {(entry.user && (entry.user.name || entry.user.email)) || 'Unknown user'} - {entry.score ?? 0} pts
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
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

export default Leaderboard;
