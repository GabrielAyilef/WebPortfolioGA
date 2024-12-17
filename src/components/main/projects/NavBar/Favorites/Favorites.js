import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./favorites.css";
import next from "../../../../../assets/next.png";
import nextdark from "../../../../../assets/nextdark.png";
import cat from "../../../../../assets/challengePic.jpg";
import { MdDelete } from "react-icons/md";
import { useDarkMode } from "../../Context/DarkMode";
import { useLayout } from "../../Context/Layout";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [sequences, setSequences] = useState([]);
  const { darkProject } = useDarkMode();
  const { desktop } = useLayout();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoritos")) || [];

    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    const storedSequences = JSON.parse(localStorage.getItem("sequences"));
    if (storedSequences) {
      setSequences(storedSequences);
    } else {
      console.error("No sequences found in localStorage.");
    }
  }, []);

  const favoriteSequences = sequences.filter((sequence) =>
    favorites.includes(sequence.dia)
  );

  const removeFavorite = useCallback(
    (day) => {
      const updatedFavorites = favorites.filter((favorite) => favorite !== day);
      setFavorites(updatedFavorites);
      localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
    },
    [favorites]
  );

  return (
    <div
      className={`favorites-container ${darkProject ? "dark" : ""} ${
        desktop ? "desktop" : ""
      }`}
    >
      <div className="favorites-header">
        <h1>Favorite Challenge Days</h1>
        <img className="favorites-img" src={cat} alt="cat lying on mat" />
        <p>Enjoy your selection</p>
      </div>
      {favorites.length === 0 ? (
        <div className="no-favorites-container">
          <h2 className="no-favorites">
            You haven't chosen favorites yet.
            <br /> You can do it on{" "}
          </h2>
          <Link to="/layout/challengeGallery" className="link-button">
            30 Days Yoga Challenge
          </Link>
        </div>
      ) : (
        <div className="favorites-sequence-list">
          {favoriteSequences.map((sequence, index) => (
            <div className="favorites-sequence-card" key={index}>
              <div className="favorites-check-go">
                <h2 className="favorites-day-number">Day {sequence.dia}</h2>
                <MdDelete
                  className="favorites-delete"
                  onClick={() => removeFavorite(sequence.dia)}
                />
              </div>

              <Link
                className="favorites-sequence-link"
                to={`/layout/challengeGallery/${sequence.dia}`}
                state={sequence}
              >
                <img
                  src={darkProject ? nextdark : next}
                  alt="Next icon"
                  className="favorites-next-icon"
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
