import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('ASC');
  const [results, setResults] = useState([]);

  const searchPhrases = async () => {
    const response = await fetch(
      `/api/phrase/search?query=${query}&sortBy=${sortBy}&sortDir=${sortDir}&status=${status}`
    );
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <h1>Phrase Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your text here"
      />
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="spam">Spam</option>
        <option value="deleted">Deleted</option>
      </select>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="createdAt">Created At</option>
        <option value="phrase">Phrase</option>
      </select>
      <select onChange={(e) => setSortDir(e.target.value)}>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
      <button onClick={searchPhrases}>Search</button>
      <ul>
        {results.map((phrase) => (
          <li key={phrase.id}>
            {phrase.phrase} - {phrase.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
