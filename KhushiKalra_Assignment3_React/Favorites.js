import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

function Favorites() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    const fetchedBooks = [];
    for (let id of favoriteIds) {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const data = await res.json();
      fetchedBooks.push(data);
    }
    setFavoriteBooks(fetchedBooks);
  };

  return (
    <div className="container">
      <h2>⭐ My Favorites</h2>
      {favoriteBooks.length === 0 ? (
        <p style={{ textAlign: "center" }}>No favorites yet.</p>
      ) : (
        <div className="book-grid">
          {favoriteBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;