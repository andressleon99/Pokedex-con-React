import React from "react";

function PokemonCard({ pokemon, onClick }) {
	const mainType = pokemon.types[0]?.type?.name || "normal";
	const art = pokemon.sprites?.other?.["official-artwork"]?.front_default;

	return (
		<div className={`pokemon ${mainType}`} onClick={onClick}>
			<div className="pokemon-imagen">
				<img src={art} alt={pokemon.name} />
			</div>

			<div className="pokemon-info">
				<span className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</span>
				<h3 className="pokemon-nombre">{pokemon.name}</h3>

				<div className="pokemon-tipos">
					{pokemon.types.map((t, i) => (
						<span key={i} className={`tipo ${t.type.name}`}>{t.type.name}</span>
					))}
				</div>

				<div className="pokemon-stats">
					<p className="stat">
						<span className="stat-label">Altura:</span> {pokemon.height / 10}m
					</p>
					<p className="stat">
						<span className="stat-label">Peso:</span> {pokemon.weight / 10}kg
					</p>
				</div>
			</div>
		</div>
	);
}

export default PokemonCard;
