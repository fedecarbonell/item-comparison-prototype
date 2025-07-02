## Pasos para la Ejecución

Sigue los pasos a continuación para levantar el backend y el frontend.

### 1. Iniciar el Backend (API .NET)

1.  Abre tu terminal o línea de comandos.
2.  Navega a la carpeta del proyecto backend:
    ```bash
    cd your-project-folder/backend/ProductComparisonApi
    ```
3.  Ejecuta la API:
    ```bash
    dotnet run
    ```
    * La API se iniciará y te mostrará la URL en la que está corriendo (por ejemplo, `https://localhost:7198` o `http://localhost:5xxx`). Anota esta URL.
    * Los datos de los productos se leen desde el archivo `Data/products.json` dentro de este proyecto.
    * La API estará accesible en un endpoint como `https://localhost:7198/products` (reemplaza el puerto si es diferente).

### 2. Iniciar el Frontend (Aplicación React)

1.  Abre **una nueva terminal** o línea de comandos (mantén la terminal del backend abierta).
2.  Navega a la carpeta del proyecto frontend:
    ```bash
    cd your-project-folder/frontend
    ```
3.  Instala las dependencias de Node.js (solo la primera vez o si las dependencias cambian):
    ```bash
    npm install
    ```
4.  Inicia la aplicación React:
    ```bash
    npm start
    ```
    * Esto iniciará la aplicación de desarrollo de React, que se abrirá automáticamente en tu navegador predeterminado en `http://localhost:3000` (o un puerto similar).
    * **Importante:** El frontend está configurado para consumir la API del backend. Asegúrate de que la URL de la API en `frontend/src/App.js` sea la correcta (`https://localhost:XXXX/products`). Si tu backend corre en un puerto diferente al que está configurado por defecto, deberás actualizarlo ahí.

### 3. Visualizar la Aplicación

Una vez que ambos, el backend y el frontend, estén corriendo, podrás acceder a la página de comparación de productos en tu navegador.

* **URL del Frontend:** `http://localhost:3000` (o el puerto que te indique `npm start`).
