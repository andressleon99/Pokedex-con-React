import React from "react";

function Header({ selectedType, setSelectedType, search, setSearch, onAddClick }) {
	const types = [
		"all", "normal", "fire", "water", "grass", "electric", "ice",
		"fighting", "poison", "ground", "flying", "psychic",
		"bug", "rock", "ghost", "dark", "dragon", "steel", "fairy",
	];

	return (
		<header className="header">
			<nav className="nav">
				<img 
					src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" 
					alt="Logo Pokémon" 
					className="logo" 
				/>

				<ul className="nav-list">
					{types.map((type) => (
						<li key={type} className="nav-item">
							<button
								className={`btn btn-header ${type !== "all" ? type : ""} ${selectedType === type ? "active" : ""}`}
								onClick={() => setSelectedType(type)}
							>
								{type === "all" ? "Ver Todos" : type}
							</button>
						</li>
					))}
				</ul>
			</nav>

			<div className="contenedor-buscador">
				<input
					type="text"
					placeholder="Buscar Pokémon por nombre…"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button className="btn btn-agregar" onClick={onAddClick}>
					➕ Agregar Pokémon
				</button>
			</div>
		</header>
	);
}

export default Header;