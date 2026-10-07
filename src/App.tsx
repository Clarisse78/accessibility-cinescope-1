import { useMemo, useState } from "react";
import posterAube from "./assets/aube.svg";
import posterMemoire from "./assets/memoire.svg";
import posterOrbite from "./assets/orbite.svg";

const films = [
  { id: 1, title: "Après l’aube", genre: "Drame", date: "2026-10-12", day: "Lundi 12 octobre", time: "18 h 10", dateTime: "18:10", seats: 42, poster: posterAube, alt: "Affiche d’Après l’aube : un soleil couchant au-dessus de collines sombres, sous un ciel violet et orange" },
  { id: 2, title: "La mémoire des murs", genre: "Documentaire", date: "2026-10-13", day: "Mardi 13 octobre", time: "19 h 30", dateTime: "19:30", seats: 0, poster: posterMemoire, alt: "Affiche de La mémoire des murs : trois piliers de pierre devant un mur brun" },
  { id: 3, title: "Orbite 9", genre: "Science-fiction", date: "2026-10-14", day: "Mercredi 14 octobre", time: "21 h 00", dateTime: "21:00", seats: 1, poster: posterOrbite, alt: "Affiche d’Orbite 9 : une planète bleue entourée d’un anneau orange, dans un ciel étoilé" },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const filteredFilms = useMemo(
    () => films.filter((film) => film.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const toggleFavorite = (id: number) => {
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>

      <header className="topbar">
        <a className="brand" href="/">CinéScope</a>
        <nav aria-label="Navigation principale">
          <ul className="menu">
            <li><a href="#programme">Programme</a></li>
            <li><a href="#infos">Informations</a></li>
          </ul>
        </nav>
      </header>

      <main id="contenu" className="page">
        <section aria-labelledby="infos">
          <h1 id="infos">Informations</h1>
          <p>TODO</p>
        </section>

        <section aria-labelledby="programme">
          <h1 id="programme">Programme</h1>
          <p className="intro">Découvrez la programmation de cette semaine.</p>

          <form role="search" onSubmit={(event) => event.preventDefault()}>
            <label className="visually-hidden" htmlFor="search">Rechercher un film</label>
            <input
              id="search"
              type="search"
              className="search"
              placeholder="Rechercher un film"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>

          <p className="visually-hidden" role="status">
            {filteredFilms.length === 0
              ? "Aucun film ne correspond à votre recherche."
              : `${filteredFilms.length} film${filteredFilms.length > 1 ? "s" : ""} affiché${filteredFilms.length > 1 ? "s" : ""}.`}
          </p>

          <ul className="film-grid">
            {filteredFilms.map((film) => {
              const isFavorite = favorites.includes(film.id);
              return (
                <li className="film-card" key={film.id}>
                  <img src={film.poster} alt={film.alt} />
                  <div className="film-content">
                    <div className="film-heading">
                      <h2>
                        <button type="button" className="film-select" onClick={() => setSelected(film.title)}>
                          {film.title}
                        </button>
                      </h2>
                      <button
                        type="button"
                        className="favorite"
                        aria-pressed={isFavorite}
                        onClick={() => toggleFavorite(film.id)}
                      >
                        <span aria-hidden="true">{isFavorite ? "★" : "☆"}</span>
                        <span className="visually-hidden">Favori : {film.title}</span>
                        <span className="tooltip" aria-hidden="true">{isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}</span>
                      </button>
                    </div>
                    <p>
                      {film.genre} · <time dateTime={`${film.date}T${film.dateTime}`}>{film.day} à {film.time}</time>
                    </p>
                    <p className={film.seats > 0 ? "seats seats-available" : "seats seats-unavailable"}>
                      {film.seats > 0
                        ? `${film.seats} place${film.seats > 1 ? "s" : ""} disponible${film.seats > 1 ? "s" : ""}`
                        : "Complet"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <div role="status">
          {selected && <p className="selection">Film sélectionné : {selected}</p>}
        </div>
      </main>
    </>
  );
}
