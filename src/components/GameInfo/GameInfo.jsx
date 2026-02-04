import styles from "./GameInfo.module.css"

function GameInfo({ships, maxHits}) {

    return (<div className={styles.boats}>
        {ships.map((ship) => (
            <p key={ship.name}>
                {ship.name} : <b>{ship.broke ? "Coulé" : "En vie"}</b>
            </p>
        ))}

        <p>Coups Restant : {maxHits}</p>
    </div>);
}

export default GameInfo;