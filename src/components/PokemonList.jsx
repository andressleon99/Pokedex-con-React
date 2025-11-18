import React from "react";

function PokemonList({ pokemons, onSelect, onEdit, onDelete, isAdmin }) {
	if (!pokemons || pokemons.length === 0) {
		return (
			<div className="no-results">
				<p>No se encontraron Pokémon con esos filtros.</p>
			</div>
		);
	}

	return (
		<div className="pokemon-todos">
			{pokemons.map((pokemon) => {
				const types = pokemon.types.map(t => t.type.name);
				const primaryType = types[0];
				const imgUrl =
					pokemon.sprites?.other?.["official-artwork"]?.front_default ||
					pokemon.sprites?.front_default ||
					"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

				return (
					<div
						key={pokemon.id}
						className={`pokemon-card ${primaryType}`}
					>
						{/* Badge personalizado si es custom */}
						{pokemon.isCustom && (
							<span className="custom-badge">⭐ Personalizado</span>
						)}

						{/* Imagen del Pokémon */}
						<div className="pokemon-imagen" onClick={() => onSelect(pokemon)}>
							<img src={imgUrl} alt={pokemon.name} />
						</div>

						{/* Número */}
						<p className="pokemon-id">
							#{pokemon.id?.toString().padStart(3, "0") || "???"}
						</p>

						{/* Nombre */}
						<div className="nombre-contenedor" onClick={() => onSelect(pokemon)}>
							<h2 className="pokemon-nombre">{pokemon.name}</h2>
						</div>

						{/* Tipos */}
						<div className="pokemon-tipos">
							{types.map((type) => (
								<span key={type} className={`tipo ${type}`}>
									{type}
								</span>
							))}
						</div>

						{/* Stats principales */}
						<div className="pokemon-stats">
							<p className="stat">
								<span className="stat-valor">{pokemon.height / 10}m</span> altura
							</p>
							<p className="stat">
								<span className="stat-valor">{pokemon.weight / 10}kg</span> peso
							</p>
						</div>

						{/* Botones de acción (solo para admin en Pokémon personalizados) */}
						{pokemon.isCustom && isAdmin && (
							<div className="pokemon-actions">
								<button
									className="btn btn-edit"
									onClick={(e) => {
										e.stopPropagation();
										onEdit(pokemon);
									}}
									title="Editar"
								>
									✏️ Editar
								</button>
								<button
									className="btn btn-delete"
									onClick={(e) => {
										e.stopPropagation();
										onDelete(pokemon.id);
									}}
									title="Eliminar"
								>
									🗑️ Eliminar
								</button>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default PokemonList;