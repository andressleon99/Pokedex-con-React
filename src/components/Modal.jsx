import React from "react";

function Modal({ pokemon, onClose, onEdit, onDelete, isAdmin }) {
	if (!pokemon) return null;

	const types = pokemon.types.map(t => t.type.name);
	const primaryType = types[0];
	const imgUrl =
		pokemon.sprites?.other?.["official-artwork"]?.front_default ||
		pokemon.sprites?.front_default ||
		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div
				className={`modal-content ${primaryType}`}
				onClick={(e) => e.stopPropagation()}
			>
				<button className="btn-cerrar" onClick={onClose}>
					✕
				</button>

				{/* Badge personalizado */}
				{pokemon.isCustom && (
					<span className="custom-badge-large">⭐ Pokémon Personalizado</span>
				)}

				<div className="modal-header">
					<h2 className="pokemon-nombre-modal">{pokemon.name}</h2>
					<p className="pokemon-id-modal">
						#{pokemon.id?.toString().padStart(3, "0") || "???"}
					</p>
				</div>

				<div className="modal-body">
					<div className="pokemon-imagen-modal">
						<img src={imgUrl} alt={pokemon.name} />
					</div>

					<div className="pokemon-tipos-modal">
						{types.map((type) => (
							<span key={type} className={`tipo ${type}`}>
								{type}
							</span>
						))}
					</div>

					<div className="pokemon-info">
						<div className="info-group">
							<span className="info-label">Altura</span>
							<span className="info-value">{pokemon.height / 10} m</span>
						</div>
						<div className="info-group">
							<span className="info-label">Peso</span>
							<span className="info-value">{pokemon.weight / 10} kg</span>
						</div>
					</div>

					<div className="pokemon-stats-modal">
						<h3>Estadísticas</h3>
						{pokemon.stats?.map((stat) => (
							<div key={stat.stat.name} className="stat-bar">
								<div className="stat-info">
									<span className="stat-name">{stat.stat.name}</span>
									<span className="stat-number">{stat.base_stat}</span>
								</div>
								<div className="progress-bar">
									<div
										className="progress-fill"
										style={{ width: `${(stat.base_stat / 255) * 100}%` }}
									></div>
								</div>
							</div>
						))}
					</div>

					{/* Botones de acción para Pokémon personalizados (solo admin) */}
					{pokemon.isCustom && isAdmin && (
						<div className="modal-actions">
							<button
								className="btn btn-edit-modal"
								onClick={() => {
									onEdit(pokemon);
									onClose();
								}}
							>
								✏️ Editar Pokémon
							</button>
							<button
								className="btn btn-delete-modal"
								onClick={() => {
									onDelete(pokemon.id);
									onClose();
								}}
							>
								🗑️ Eliminar Pokémon
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Modal;