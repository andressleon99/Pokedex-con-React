# 🔐 Sistema de Autenticación - Pokédex

## Descripción

Se ha implementado un sistema completo de autenticación con dos tipos de usuarios:

### 📌 Tipos de Usuario

1. **Admin (Único)**
   - Email: `admin@pokedex.com`
   - Contraseña: `admin123`
   - Acceso completo a la aplicación
   - Indicador visual "ADMIN" en la barra superior

2. **Usuarios Públicos**
   - Se registran libremente
   - Pueden acceder a la Pokédex
   - Necesitan credenciales válidas para iniciar sesión

## 🚀 Cómo Usar

### Login
1. Ingresa tu correo y contraseña
2. Haz clic en "Iniciar Sesión"
3. Si eres nuevo, puedes registrarte desde el enlace

### Registro
1. Haz clic en "Regístrate aquí"
2. Completa todos los campos (nombre de usuario, email, contraseña)
3. Confirma la contraseña
4. Haz clic en "Registrarse"
5. Serás redirigido al login automáticamente

### Logout
- Haz clic en el botón "Salir" en la esquina superior derecha

## 📂 Estructura de Archivos

```
src/
├── context/
│   └── AuthContext.jsx          # Contexto de autenticación
├── components/
│   ├── Login.jsx                # Componente de login
│   ├── Register.jsx             # Componente de registro
│   ├── Header.jsx               # Header actualizado con menú de usuario
│   └── ...otros componentes
├── styles/
│   └── Auth.css                 # Estilos para login/registro
├── App.jsx                      # App actualizado con protección
└── main.jsx                     # Entry point con AuthProvider
```

## 🔐 Características de Seguridad

- ✅ Almacenamiento en localStorage (no productor)
- ✅ Validación de campos
- ✅ Contraseñas mínimo 6 caracteres
- ✅ Confirmación de contraseña
- ✅ Prevención de cuentas duplicadas
- ✅ Sesión persistente

## 📝 Notas Importantes

> **⚠️ En producción:**
> - Las contraseñas deben estar hasheadas con bcrypt o similar
> - Usar una base de datos real en lugar de localStorage
> - Implementar JWT para autenticación segura
> - Usar HTTPS

## 🧪 Pruebas

Para probar el sistema:

1. **Inicia sesión como Admin:**
   - Email: `admin@pokedex.com`
   - Contraseña: `admin123`

2. **Registra un nuevo usuario:**
   - Usa cualquier email y contraseña válida
   - Luego inicia sesión con esas credenciales

3. **Cierra sesión y prueba de nuevo**
