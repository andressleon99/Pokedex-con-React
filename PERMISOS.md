# 🔐 Sistema de Permisos - Pokédex

## Resumen de Permisos por Tipo de Usuario

### 👤 Usuario Público (Registro Libre)
- ✅ Ver lista completa de Pokémon
- ✅ Buscar y filtrar Pokémon
- ✅ Ver detalles de Pokémon
- ✅ Ver estadísticas de Pokémon
- ❌ Agregar Pokémon personalizados
- ❌ Editar Pokémon
- ❌ Eliminar Pokémon

### 🔑 Usuario Admin (Único)
- ✅ Ver lista completa de Pokémon
- ✅ Buscar y filtrar Pokémon
- ✅ Ver detalles de Pokémon
- ✅ Ver estadísticas de Pokémon
- ✅ **Agregar Pokémon personalizados**
- ✅ **Editar Pokémon personalizados**
- ✅ **Eliminar Pokémon personalizados**
- ✅ Botón "Agregar Pokémon" visible en la barra superior

## 📋 Credenciales

**Admin:**
```
Email: admin@pokedex.com
Contraseña: admin123
```

## 🎨 Indicadores Visuales

### Para el Admin:
1. **Badge "ADMIN"** - Aparece al lado del nombre en la barra superior
2. **Botón "➕ Agregar Pokémon"** - Solo visible si eres admin
3. **Botones de edición** - "✏️ Editar" y "🗑️ Eliminar" solo para admin

### Para Usuarios Públicos:
1. **Sin badge ADMIN** - Solo ve su nombre de usuario
2. **Sin botón de agregar** - La barra de búsqueda ocupa más espacio
3. **Sin botones de edición** - Solo puede ver información

## 🔄 Flujo de Permisos

```
┌─────────────────────┐
│   Usuario Público   │
├─────────────────────┤
│  - Ver Pokémon     │
│  - Buscar          │
│  - Ver Detalles    │
│  - Ver Stats       │
└─────────────────────┘

┌─────────────────────┐
│   Usuario Admin      │
├─────────────────────┤
│  - Ver Pokémon      │
│  - Buscar           │
│  - Ver Detalles     │
│  - Ver Stats        │
│  - Agregar ⭐      │
│  - Editar ✏️       │
│  - Eliminar 🗑️     │
└─────────────────────┘
```

## 📝 Notas Técnicas

- Los permisos se comprueban en:
  - `App.jsx` - Visibilidad del formulario
  - `Header.jsx` - Visibilidad del botón "Agregar"
  - `PokemonList.jsx` - Visibilidad de botones de acción
  - `Modal.jsx` - Visibilidad de botones en modal

- El estado `isAdmin` se obtiene de `useAuth()` hook

- La verificación es **lado del cliente** (para producción usar verificación en servidor)
