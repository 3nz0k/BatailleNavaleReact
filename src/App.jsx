import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [click, setClick] = useState([]);
  const [ships, setShips] = useState([
    { name: "Porte-avions", size: 5, cells: [], hits: [], broke: false },
    { name: "Croiseur", size: 4, cells: [], hits: [], broke: false },
    { name: "Contre-torpilleur", size: 3, cells: [], hits: [], broke: false },
    { name: "Sous-marin", size: 3, cells: [], hits: [], broke: false },
    { name: "Torpilleur", size: 2, cells: [], hits: [], broke: false },
  ]);

  // Vérifie si des cellules sont déjà occupées
  function isCellsFree(cells) {
    return !cells.some((cell) =>
      ships.some((ship) => ship.cells.includes(cell)),
    );
  }

  // Place un navire aléatoirement (horizontal uniquement)
  function placeShip(ship) {
    let dir = Math.floor(Math.random() * 2); // 0 = horizontal, 1 = vertical
    let valueV, valueH, start, newCells;
    do {
      if (dir === 0) {
        valueV = Math.floor(Math.random() * 10);
        valueH = Math.floor(Math.random() * (10 - ship.size));
        start = valueV * 10 + valueH;
        newCells = Array.from({ length: ship.size }, (_, i) => start + i);
      } else if (dir === 1) {
        valueV = Math.floor(Math.random() * (10 - ship.size));
        valueH = Math.floor(Math.random() * 10);
        start = valueV * 10 + valueH;
        newCells = Array.from({ length: ship.size }, (_, i) => start + i * 10);
      }
    } while (!isCellsFree(newCells));
    ship.cells = newCells;
  }

  // Initialisation des navires
  useEffect(() => {
    const newShips = [...ships];
    newShips.forEach((ship) => placeShip(ship));
    setShips(newShips);
  }, []);

  function isClicked(index) {
    return click.includes(index);
  }

  function isShip(index) {
    return ships.find((s) => s.cells.includes(index));
  }

  function allShootOnShip(index) {
    setShips((prevShips) => {
      const nextShips = prevShips.map((ship) => {
        if (!ship.cells.includes(index)) return ship;

        // évite les doublons si jamais
        const nextHits = ship.hits.includes(index)
          ? ship.hits
          : [...ship.hits, index];

        const isBroke = ship.cells.every((cell) => nextHits.includes(cell));

        if (!ship.broke && isBroke) {
          console.log(`${ship.name} coulé !`);
        }

        return {
          ...ship,
          hits: nextHits,
          broke: isBroke,
        };
      });

      // check victoire ici (avec le state à jour)
      const win = nextShips.every((s) => s.broke);
      if (win) alert("Vous avez gagné !");

      return nextShips;
    });
  }

  return (
    <div>
      <h1>Bataille Navale</h1>
      <div className="main">
        <div className="grid">
          {Array.from({ length: 100 }).map((_, index) => {
            const clicked = isClicked(index);
            const ship = isShip(index);
            const broke = ship ? ship.broke : false;
            return (
              <div
                key={index}
                className={`cell ${clicked ? "cell-clicked" : ""} ${clicked && ship ? "cell-shooted" : ""} ${clicked && ship && broke ? "cell-broke" : ""}`}
                onClick={() => {
                  if (!clicked) {
                    setClick((prev) => [...prev, index]);
                    allShootOnShip(index);
                  }
                }}
              >
                {index}
              </div>
            );
          })}
        </div>
        <div className="boats">
          {ships.map((ship) => (
            <p key={ship.name}>
              {ship.name} : <b>{ship.broke ? "Coulé" : "En vie"}</b>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
