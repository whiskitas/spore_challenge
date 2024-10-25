# SPORE Challenge

## 📋 Comenzando

### Requisitos Previos
* Node.js
* MySQL
* npm

### 📁 Configuración de la Base de Datos
1. Crea tu base de datos MySQL
2. Importa la estructura de la base de datos (linux):
   ```bash
   mysql -u USUARIO -p BASE_DE_DATOS < migration.sql
   ```

### ⚙️ Configuración del Entorno

#### Configuración del Backend
Crea un archivo `.env` en tu directorio backend:
```env
DATABASE_URL=mysql://USUARIO:CONTRASEÑA@HOST:PUERTO/BASE_DE_DATOS
PORT=NUMERO_DE_PUERTO
```

#### Configuración del Frontend
Crea un archivo `.env` en tu directorio frontend:
```env
VUE_APP_API_URL=URL_DE_TU_BACKEND
```

### 💻 Ejecutar la Aplicación

#### Iniciar el Servidor Backend
```bash
cd [camino a proyecto]/backend
npm run start
```

#### Iniciar el Servidor de Desarrollo Frontend
```bash
cd [camino a proyecto]/frontend
npm run serve
```

## 📝 Notas
* Asegúrate de ejecutar el archivo de migración MySQL antes de iniciar la aplicación
* Verifica que todas las variables de entorno estén configuradas correctamente
* Comprueba que los servidores frontend y backend estén ejecutándose en puertos diferentes
