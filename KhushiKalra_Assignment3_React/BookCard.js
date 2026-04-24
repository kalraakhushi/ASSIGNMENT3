import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  const { id, volumeInfo } = book;
  return (
    <div className="book-card">
      {volumeInfo.imageLinks && (
        <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} />
      )}
      <h3>{volumeInfo.title}</h3>
      <p>{volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown Author"}</p>
      <Link to={`/books/${id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default BookCard;