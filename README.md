# Red Social con Next.js + TypeScript + Redis

Este proyecto es una red social de escritorio, como muestra de un desarrollo personal. El objetivo principal es explorar el uso de Next.js en integración con otras tecnologías, como Redis para la gestión de sesiones y un backend modularizado. Integra autenticación de usuarios, manejo de sesiones, protección de rutas mediante middleware y una estructura que separa la lógica de negocio, las llamadas HTTP y el control de accesos.
<br>
<br>

## 📦 ¿Qué incluye el proyecto?

- Registro y login de usuarios con persistencia de sesión
- Generación de tokens y almacenamiento en Redis
- Middleware en Next.js que protege rutas sensibles
- Comunicación segura entre backend y frontend mediante token de autorización simulado
- Cookies de sesión para mantener al usuario autenticado
- Lógica desacoplada: separación clara entre API, servicios y controladores
- Validación de sesiones a través de Redis local
- Logs y manejo de errores definidos
- Estructura modular y escalable
<br>
<br>

## ⚙️ Tecnologías utilizadas

- **Next.js**
- **TypeScript**
- **Node.js**
- **Docker**
- **Redis (para sesiones)**
- **PostgreSQL (como db principal)**
- **Tailwind CSS**
- **YUP**
<br>
<br>

## 🚀 ¿Cómo levantar el proyecto?

### 1. Clonar el repositorio

```bash
git clone https://github.com/YCastEmm/Social_app_Next.js_Redis
cd Social_app_Next.js_Redis
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

En la raíz del proyecto, crear un archivo `.env` con la siguiente variable:

```
REDIS_API_TOKEN=unTokenCualquieraParaSimular
```

Este token no es real ni se conecta a servicios externos. Simplemente se simula el flujo de autorización. El valor puede ser cualquier string.

### 4. Levantar los contenedores de Docker

Para poder levantar los servicios necesarios (como Redis), este proyecto utiliza Docker. Si no tenés Docker instalado, descargalo desde https://www.docker.com y asegurate también de tener Docker Compose habilitado.  
  
Después ejecutá en la consola:

```bash
docker-compose up --build
```  

### 5. Ejecutar la app

```bash
npm run dev
```

### 6. Iniciar sesión en la plataforma

Podés usar uno de los siguientes usuarios de prueba para ingresar:

- Usuario: `yoda`  
- Usuario: `anakin`  
- Usuario: `solo`  
- Contraseña (para todos): `Test123` 
<br>
<br>

## 🔐 ¿Cómo funciona la autenticación?

1. El usuario se registra o inicia sesión desde el frontend.
2. El backend valida las credenciales y genera un `accessToken`.
3. Ese token se guarda en Redis, usando como clave un `sessionId` generado con UUID.
4. El `sessionId` se guarda como cookie en el navegador.
5. Al acceder a rutas protegidas como `/profile`, el middleware recupera el `sessionId` de la cookie y lo usa para consultar Redis.
6. Si la sesión está activa, deja pasar y agrega el token como header (`x-social-access-token`).
7. Si no está, redirige automáticamente al login.
<br>
<br>

### 💻 Autor  
Desarrollado por **Yair Castagnola**
