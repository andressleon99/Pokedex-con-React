import React, { useState, useEffect } from "react";

function PokemonForm({ pokemon, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    types: [],
    height: "",
    weight: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  const allTypes = [
    "normal", "fire", "water", "grass", "electric", "ice",
    "fighting", "poison", "ground", "flying", "psychic",
    "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy"
  ];

  useEffect(() => {
    if (pokemon) {
      const imgUrl = pokemon.sprites?.other?.["official-artwork"]?.front_default || "";
      setFormData({
        name: pokemon.name || "",
        types: pokemon.types?.map(t => t.type.name) || [],
        height: pokemon.height || "",
        weight: pokemon.weight || "",
        hp: pokemon.stats?.[0]?.base_stat || "",
        attack: pokemon.stats?.[1]?.base_stat || "",
        defense: pokemon.stats?.[2]?.base_stat || "",
        speed: pokemon.stats?.[5]?.base_stat || "",
        imageUrl: imgUrl,
      });
      setImagePreview(imgUrl);
    }
  }, [pokemon]);

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, imageUrl: url });
    setImagePreview(url);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({ ...formData, imageUrl: base64String });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    if (formData.types.length === 0) {
      alert("Selecciona al menos un tipo");
      return;
    }

    const newPokemon = {
      id: pokemon?.id || `custom-${Date.now()}`,
      name: formData.name.toLowerCase().trim(),
      types: formData.types.map(t => ({ type: { name: t } })),
      height: Number(formData.height) || 10,
      weight: Number(formData.weight) || 100,
      stats: [
        { base_stat: Number(formData.hp) || 50, stat: { name: "hp" } },
        { base_stat: Number(formData.attack) || 50, stat: { name: "attack" } },
        { base_stat: Number(formData.defense) || 50, stat: { name: "defense" } },
        { base_stat: 50, stat: { name: "special-attack" } },
        { base_stat: 50, stat: { name: "special-defense" } },
        { base_stat: Number(formData.speed) || 50, stat: { name: "speed" } },
      ],
      sprites: {
        other: {
          "official-artwork": {
            front_default: formData.imageUrl || 
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/0.png"
          }
        }
      },
      isCustom: true,
    };

    onSave(newPokemon);
  };

  const toggleType = (type) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content pokemon-form" onClick={(e) => e.stopPropagation()}>
        <button className="btn-cerrar" onClick={onCancel}>✕</button>
        
        <h2>{pokemon ? "Editar Pokémon" : "Agregar Pokémon"}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Pikachu"
              required
            />
          </div>

          {/* NUEVA SECCIÓN: IMAGEN */}
          <div className="form-group">
            <label>Imagen del Pokémon</label>
            
            {/* Vista previa de la imagen */}
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}

            {/* Opción 1: URL de imagen */}
            <input
              type="text"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Pega la URL de una imagen..."
              className="image-url-input"
            />

            {/* Opción 2: Subir archivo */}
            <div className="file-upload-wrapper">
              <label htmlFor="file-upload" className="file-upload-label">
                📁 O sube una imagen desde tu PC
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-upload-input"
              />
            </div>
            
            <p className="form-hint">
              💡 Puedes buscar imágenes en Google y copiar la URL, o subir una desde tu computadora
            </p>
          </div>

          <div className="form-group">
            <label>Tipos * (selecciona uno o más)</label>
            <div className="type-selector">
              {allTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  className={`btn btn-type ${type} ${formData.types.includes(type) ? 'selected' : ''}`}
                  onClick={() => toggleType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Altura (dm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="10"
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Peso (hg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="100"
                min="1"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>HP</label>
              <input
                type="number"
                value={formData.hp}
                onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                placeholder="50"
                min="1"
                max="255"
              />
            </div>

            <div className="form-group">
              <label>Ataque</label>
              <input
                type="number"
                value={formData.attack}
                onChange={(e) => setFormData({ ...formData, attack: e.target.value })}
                placeholder="50"
                min="1"
                max="255"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Defensa</label>
              <input
                type="number"
                value={formData.defense}
                onChange={(e) => setFormData({ ...formData, defense: e.target.value })}
                placeholder="50"
                min="1"
                max="255"
              />
            </div>

            <div className="form-group">
              <label>Velocidad</label>
              <input
                type="number"
                value={formData.speed}
                onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                placeholder="50"
                min="1"
                max="255"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-cancelar" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-guardar">
              {pokemon ? "Actualizar" : "Crear"} Pokémon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PokemonForm;