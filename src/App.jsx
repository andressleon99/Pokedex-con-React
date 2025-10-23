import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/header.jsx";
import PokemonList from "./components/PokemonList.jsx";
import Modal from "./components/Modal.jsx";
import PokemonForm from "./components/PokemonForm.jsx";

function App() {
	const [pokemonList, setPokemonList] = useState([]);
	const [customPokemons, setCustomPokemons] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedType, setSelectedType] = useState("all");
	const [loading, setLoading] = useState(true);
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [editingPokemon, setEditingPokemon] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [error, setError] = useState("");

	// Cargar Pokémon personalizados desde localStorage
	useEffect(() => {
		const saved = localStorage.getItem("customPokemons");
		if (saved) {
			try {
				setCustomPokemons(JSON.parse(saved));
			} catch (e) {
				console.error("Error al cargar Pokémon personalizados:", e);
			}
		}
	}, []);

	// Guardar Pokémon personalizados en localStorage
	useEffect(() => {
		localStorage.setItem("customPokemons", JSON.stringify(customPokemons));
	}, [customPokemons]);

	// Cargar los primeros 151 Pokémon de la API
	useEffect(() => {
		let cancelled = false;

		async function load() {
			setLoading(true);
			setError("");
			try {
				const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
				const data = await res.json();

				const detailed = await Promise.all(
					data.results.map(async (p) => {
						const r = await fetch(p.url);
						return await r.json();
					})
				);

				if (!cancelled) {
					setPokemonList(detailed);
					setLoading(false);
				}
			} catch (e) {
				if (!cancelled) {
					setError("No se pudo cargar la Pokédex. Intenta nuevamente.");
					setLoading(false);
				}
			}
		}

		load();
		return () => { cancelled = true; };
	}, []);

	// Combinar Pokémon de la API y personalizados
	const allPokemons = useMemo(() => {
		return [...customPokemons, ...pokemonList];
	}, [customPokemons, pokemonList]);

	// Filtro combinado por búsqueda + tipo
	const filteredPokemons = useMemo(() => {
		const byName = (p) =>
			p.name.toLowerCase().includes(searchTerm.trim().toLowerCase());

		const byType = (p) =>
			selectedType === "all" || p.types.some(t => t.type.name === selectedType);

		return allPokemons.filter((p) => byName(p) && byType(p));
	}, [allPokemons, searchTerm, selectedType]);

	// CREAR o ACTUALIZAR Pokémon
	const handleSavePokemon = (pokemon) => {
		if (editingPokemon) {
			// Actualizar existente
			setCustomPokemons(prev =>
				prev.map(p => p.id === pokemon.id ? pokemon : p)
			);
		} else {
			// Crear nuevo
			setCustomPokemons(prev => [...prev, pokemon]);
		}
		setShowForm(false);
		setEditingPokemon(null);
	};

	// ELIMINAR Pokémon
	const handleDeletePokemon = (pokemonId) => {
		if (window.confirm("¿Estás seguro de eliminar este Pokémon?")) {
			setCustomPokemons(prev => prev.filter(p => p.id !== pokemonId));
			if (selectedPokemon?.id === pokemonId) {
				setSelectedPokemon(null);
			}
		}
	};

	// EDITAR Pokémon
	const handleEditPokemon = (pokemon) => {
		setEditingPokemon(pokemon);
		setShowForm(true);
		setSelectedPokemon(null);
	};

	return (
		<div>
			<Header
				selectedType={selectedType}
				setSelectedType={setSelectedType}
				search={searchTerm}
				setSearch={setSearchTerm}
				onAddClick={() => {
					setEditingPokemon(null);
					setShowForm(true);
				}}
			/>

			<main>
				{loading && (
					<div className="loading">
						<div className="pokeball-loader"></div>
						<p>Cargando Pokémon...</p>
					</div>
				)}

				{!loading && error && (
					<div className="no-results">
						<p>{error}</p>
					</div>
				)}

				{!loading && !error && (
					<PokemonList
						pokemons={filteredPokemons}
						onSelect={(p) => setSelectedPokemon(p)}
						onEdit={handleEditPokemon}
						onDelete={handleDeletePokemon}
					/>
				)}
			</main>

			{/* Modal para ver detalles */}
			{selectedPokemon && (
				<Modal
					pokemon={selectedPokemon}
					onClose={() => setSelectedPokemon(null)}
					onEdit={handleEditPokemon}
					onDelete={handleDeletePokemon}
				/>
			)}

			{/* Formulario para crear/editar */}
			{showForm && (
				<PokemonForm
					pokemon={editingPokemon}
					onSave={handleSavePokemon}
					onCancel={() => {
						setShowForm(false);
						setEditingPokemon(null);
					}}
				/>
			)}
		</div>
	);
}

export default App;