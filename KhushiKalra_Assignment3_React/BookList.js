import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

function BookList() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("harry potter");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      setError("Failed to fetch books.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>📚 Book List</h2>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
        />
        <button onClick={fetchBooks}>Search</button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default BookList;