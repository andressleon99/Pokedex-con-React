import React from "react";
import { useAuth } from "../context/AuthContext";

function Header({ selectedType, setSelectedType, search, setSearch, onAddClick, isAdmin: isAdminProp }) {
	const { user, logout } = useAuth();
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
				{isAdminProp && (
					<button className="btn btn-agregar" onClick={onAddClick}>
						➕ Agregar Pokémon
					</button>
				)}
				<div className="user-menu">
					<span className="user-info">
						{isAdminProp && <span className="badge-admin">ADMIN</span>}
						{user?.username}
					</span>
					<button className="btn btn-logout" onClick={logout}>
						Salir
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;