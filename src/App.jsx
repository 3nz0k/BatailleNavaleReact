import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [click, setClick] = useState([]);
  const [porteAvionsCells, setPorteAvionsCells] = useState([]);
  const [croiseurCells, setcroiseurCells] = useState([]);
  const [contreTorpilleurCells, setcontreTorpilleurCells] = useState([]);
  const [sousMarinCells, setsousMarinCells] = useState([]);
  const [torpilleurCells, settorpilleurCells] = useState([]);

  const [pAisBroke, setPAisBroke] = useState(false);
  const [cisBroke, setcisBroke] = useState(false);
  const [cTisBroke, setcTisBroke] = useState(false);
  const [sMisBroke, setsMisBroke] = useState(false);
  const [tisBroke, settisBroke] = useState(false);

  const ships = [
    {
      name: "Porte-avions",
      size: 5,
      cells: [3, 4, 5, 6, 7],
      broke: false,
    },
    {
      name: "Croiseur",
      size: 4,
      cells: [84, 85, 86, 87],
      broke: false,
    },
    {
      name: "Contre-torpilleur",
      size: 3,
      cells: [44, 45, 46],
      broke: false,
    },
    {
      name: "Sous-marin",
      size: 3,
      cells: [61, 62, 63],
      broke: false,
    },
    {
      name: "Torpilleur",
      size: 2,
      cells: [28, 29],
      broke: false,
    },
  ];

  function isClicked(index) {
    return click.includes(index);
  }

  function isShip(index) {
    let ship = ships.find((s) => s.cells.includes(index));
    return ship;
  }

  function getShipName(index) {
    const ship = ships.find((s) => s.cells.includes(index));
    return ship ? ship.name : null;
  }

  function getShipSize(index) {
    const ship = ships.find((s) => s.cells.includes(index));
    return ship ? ship.size : null;
  }

  function getShipIsBroke(name) {
    if (name === "Porte-avions") {
      return pAisBroke;
    }

    if (name === "Croiseur") {
      return cisBroke;
    }

    if (name === "Contre-torpilleur") {
      return cTisBroke;
    }

    if (name === "Sous-marin") {
      return sMisBroke;
    }

    if (name === "Torpilleur") {
      return tisBroke;
    }
  }

  function allShipDead() {
    if (
      pAisBroke == true &&
      cisBroke == true &&
      cTisBroke == true &&
      sMisBroke == true &&
      tisBroke == true
    ) {
      alert("Vous avez gagné !");
    }
  }

  function allShootOnShip(name, index) {
    if (name === "Porte-avions") {
      const ship = ships.find((ship) => ship.name === "Porte-avions");

      setPorteAvionsCells((prevCell) => {
        const next = [...prevCell, index].sort();
        if (ship.cells.every((cell) => next.includes(cell))) {
          console.log("Porte-avions coulé !");
          setPAisBroke(true);
        }
        return next;
      });
    }

    if (name === "Croiseur") {
      const ship = ships.find((ship) => ship.name === "Croiseur");

      setcroiseurCells((prevCell) => {
        const next = [...prevCell, index].sort();
        if (ship.cells.every((cell) => next.includes(cell))) {
          console.log("Croiseur coulé !");
          setcisBroke(true);
        }
        return next;
      });
    }

    if (name === "Contre-torpilleur") {
      const ship = ships.find((ship) => ship.name === "Contre-torpilleur");

      setcontreTorpilleurCells((prevCell) => {
        const next = [...prevCell, index].sort();
        if (ship.cells.every((cell) => next.includes(cell))) {
          console.log("Contre-torpilleur coulé !");
          setcTisBroke(true);
        }
        return next;
      });
    }

    if (name === "Sous-marin") {
      const ship = ships.find((ship) => ship.name === "Sous-marin");

      setsousMarinCells((prevCell) => {
        const next = [...prevCell, index].sort();
        if (ship.cells.every((cell) => next.includes(cell))) {
          console.log("Sous-marin coulé !");
          setsMisBroke(true);
        }
        return next;
      });
    }

    if (name === "Torpilleur") {
      const ship = ships.find((ship) => ship.name === "Torpilleur");

      settorpilleurCells((prevCell) => {
        const next = [...prevCell, index].sort();
        if (ship.cells.every((cell) => next.includes(cell))) {
          console.log("Torpilleur coulé !");
          settisBroke(true);
        }
        return next;
      });
    }
  }

  return (
    <div>
      <h1>Bataille Navale</h1>
      <div className="grid">
        {Array.from({ length: 100 }).map((_, index) => {
          const clicked = isClicked(index);
          const ship = isShip(index);
          const broke = getShipIsBroke(getShipName(index));
          return (
            <div
              key={index}
              className={`cell ${clicked ? "cell-clicked" : ""} ${clicked && ship ? "cell-shooted" : ""} ${clicked && ship && broke ? "cell-broke" : ""}`}
              onClick={() => {
                if (!clicked) {
                  setClick([...click, index]);
                  allShootOnShip(getShipName(index), index);
                  allShipDead();
                }
              }}
            >
              {index}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
