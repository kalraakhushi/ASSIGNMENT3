import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchBook();
    checkFavorite();
  }, [id]);

  const fetchBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const data = await res.json();
      setBook(data);
    } catch (err) {
      setError("Failed to fetch book details.");
    }
    setLoading(false);
  };

  const checkFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(id));
  };

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
    } else {
      favorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!book) return null;

  const { volumeInfo } = book;

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h2>{volumeInfo.title}</h2>
      {volumeInfo.imageLinks && (
        <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} />
      )}
      <p><b>Authors:</b> {volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown"}</p>
      <p><b>Description:</b> {volumeInfo.description || "No description available."}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
      </button>
    </div>
  );
}

export default BookDetail;