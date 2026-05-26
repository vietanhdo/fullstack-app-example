import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [beers, setBeers]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [search, setSearch]       = useState('');
  const [query, setQuery]         = useState('');
  const [page, setPage]           = useState(1);
  const [selected, setSelected]   = useState(null);

  // ── Fetch danh sách bia từ BFF ─────────────────────────────────────────────
  const fetchBeers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = query
        ? `${BASE_URL}/api/beers/search?q=${encodeURIComponent(query)}`
        : `${BASE_URL}/api/beers?page=${page}&per_page=12`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Backend connection failed');

      const data = await res.json();
      setBeers(data.beers ?? []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Không thể tải danh sách bia. Backend đang ngủ? 🥵');
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => { fetchBeers(); }, [fetchBeers]);

  // ── Fetch chi tiết bia khi click vào card ─────────────────────────────────
  const openDetail = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/beers/${id}`);
      if (!res.ok) throw new Error();
      setSelected(await res.json());
    } catch {
      setSelected(beers.find(b => b.id === id) || null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setQuery(search.trim());
  };

  return (
    <div className="App">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand-row">
            <span className="badge green">HEINEKEN</span>
            <span className="sep">×</span>
            <span className="badge outline">TIGER TRIBE</span>
          </div>
          <h1>Beer Explorer</h1>
          <p className="subtitle">
            <span className="live-dot"></span>
            Data from Punk API · Proxied via Tiger Tribe BFF
          </p>

          {/* ── Search bar ─────────────────────────────────────────────── */}
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search beers… e.g. lager, stout, IPA"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">Search</button>
            {query && (
              <button type="button" className="clear-btn"
                onClick={() => { setSearch(''); setQuery(''); setPage(1); }}>
                ✕ Clear
              </button>
            )}
          </form>
        </div>
      </header>

      {/* ── API Info Bar ─────────────────────────────────────────────────── */}
      <div className="api-bar">
        <span className="api-pill">
          <span className="pill-dot"></span>
          GET {query
            ? `/api/beers/search?q=${query}`
            : `/api/beers?page=${page}&per_page=12`}
        </span>
        <span className="api-src">Source: api.punkapi.com/v2/beers</span>
      </div>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main className="app-main">
        {loading && (
          <div className="state-box">
            <div className="spinner"></div>
            <p>Đang ướp lạnh bia từ Punk API... 🧊</p>
          </div>
        )}

        {error && (
          <div className="state-box error-box">
            <p>{error}</p>
            <button className="retry-btn" onClick={fetchBeers}>Thử lại</button>
          </div>
        )}

        {!loading && !error && beers.length === 0 && (
          <div className="state-box">
            <p>Không tìm thấy bia nào cho <strong>"{query}"</strong> 🤔</p>
          </div>
        )}

        {!loading && !error && beers.length > 0 && (
          <div className="beer-grid">
            {beers.map(beer => (
              <div
                key={beer.id}
                className="beer-card"
                onClick={() => openDetail(beer.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && openDetail(beer.id)}
              >
                <div className="card-img">
                  <img
                    src={beer.image}
                    alt={beer.name}
                    // [Reliability] Fallback linh động với placehold.co
                    onError={e => {
                      e.target.onerror = null; 
                      e.target.src = `https://placehold.co/400x600/0a2410/52c97a/png?text=${encodeURIComponent(beer.name)}`;
                    }}
                  />
                </div>
                <div className="card-body">
                  <h3>{beer.name}</h3>
                  <p className="tagline">{beer.tagline}</p>
                  <div className="card-meta">
                    <span className="abv">{beer.abv?.toFixed(1)}% ABV</span>
                    {beer.ibu && <span className="ibu">{beer.ibu} IBU</span>}
                  </div>
                  <p className="first-brewed">Est. {beer.firstBrewed}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Pagination (chỉ hiện khi không search) ──────────────────── */}
        {!loading && !error && !query && beers.length > 0 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >← Prev</button>
            <span className="page-info">Page {page}</span>
            <button
              className="page-btn"
              disabled={beers.length < 12}
              onClick={() => setPage(p => p + 1)}
            >Next →</button>
          </div>
        )}
      </main>

      {/* ── Detail Modal ─────────────────────────────────────────────────── */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <div className="modal-inner">
              <div className="modal-img">
                <img
                  src={selected.image}
                  alt={selected.name}
                  // [Reliability] Fallback linh động cho Modal
                  onError={e => {
                    e.target.onerror = null; 
                    e.target.src = `https://placehold.co/400x600/0a2410/52c97a/png?text=${encodeURIComponent(selected.name)}`;
                  }}
                />
              </div>
              <div className="modal-info">
                <h2>{selected.name}</h2>
                <p className="modal-tagline">{selected.tagline}</p>
                <div className="modal-badges">
                  <span className="badge green">{selected.abv?.toFixed(1)}% ABV</span>
                  {selected.ibu && <span className="badge outline">{selected.ibu} IBU</span>}
                  <span className="badge outline">Est. {selected.firstBrewed}</span>
                </div>
                <p className="modal-desc">{selected.description}</p>
                {selected.foodPairing?.length > 0 && (
                  <div className="food-pairing">
                    <h4>Food Pairing</h4>
                    <ul>
                      {selected.foodPairing.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>
          Built by <strong>Tiger Tribe</strong> — HEINEKEN's Global Tech Hub · HCMC
          &nbsp;·&nbsp; BFF Pattern: Express → Punk API → React
        </p>
      </footer>
    </div>
  );
}

export default App;