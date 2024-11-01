# 🎉 ¡Bienvenidos al Increíble Juego de Whac-A-Mole! 🎉

¡Prepárate para la diversión más loca y emocionante que jamás hayas experimentado! ¡Es hora de golpear topos y ganar premios! 🥳🎁

## 🚀 ¿Qué es Whac-A-Mole?

Whac-A-Mole es un juego clásico de arcade donde los jugadores deben golpear topos que aparecen aleatoriamente en diferentes agujeros. ¡Pero espera! ¡Este no es un juego cualquiera! ¡Es el juego más divertido y adictivo que jamás hayas jugado! 🎮🎉

## 🛠️ Estructura del Proyecto

Nuestro proyecto está organizado de la siguiente manera:

```sh
🐾 Whac-A-Mole_JavaScript/
├── 🌐 Frontend/
│   ├── 🎨 assets/
│   │   ├── 🌈 css/
│   │   │   ├── auth.css
│   │   │   ├── keyFramesResponsive.css
│   │   │   └── pantallaCarga.css
│   │   │   └── profile.css
│   │   │   └── styles.css
│   │   ├── 🖼 images/
│   │   │   ├── gif/
│   │   │   ├── Moles/
│   │   │   └── utils/
│   │   │   │   └── splash/
│   │   │   └── Wallpaper_Charge/
│   │   └── 📜 js/
│   │   │   └── main.js/
│   ├── 🎮 controller/
│   │       ├── GameController.js
│   │       ├── LeaderBoardController.js
│   │       ├── MoleAnimationController.js
│   │       └── UserController.js
│   ├── 🛠 model/
│   │       ├── GameModel.js
│   │       └── UserModel.js
│   └── 👁️ view/
│   │        ├── GameView.js
│   │        ├── LeaderBoardView.js
│   │        └── UserView.js
│   ├── 📝 index.html

│
├── 🏙 Backend/
│   ├── 🔧 app/
│   │   └── server.js
│   ├── 🔌 api/
│   │   └── api.js
│   ├── 📝 index.js
│   ├── ⚙️ config/
│   │   ├── database.config.js
│   │   └── cors.config.js
│   ├── 📁 controllers/
│   │   └── users.controller.js
│   ├── 🔒 middleware/
│   │   ├── verifyJWT.js
│   │   └── errorHandler.js
│   ├── 📦 models/
│   │   └── users.model.js
│   └── 📑 routes/
│       └── user.routes.js
│
├── 📦 package.json
├── 🔒 .env
└── 🗑️ .gitignore


```
## Explicación de la Estructura

### Frontend 🌐
Todo lo relacionado con la parte del cliente.
- **assets** 🎨: Contiene CSS, imágenes y archivos JavaScript.
  - **css** 🌈: Estilos específicos, como `auth.css`.
  - **images** 🖼: Recursos gráficos para el juego.
  - **js** 📜: Scripts de JavaScript organizados en controladores, modelos y vistas.
    - **controller** 🎮: Controladores de la lógica del juego y la interacción del usuario.
    - **model** 🛠: Modelos de datos para el juego y los usuarios.
    - **view** 👁️: Vistas que manejan la presentación de datos.

### Backend 🏙
Todo lo relacionado con la parte del servidor.
- **app** 🔧: La aplicación principal de Express.
- **api** 🔌: Punto de entrada para las rutas de la API.
- **config** ⚙️: Configuraciones de la base de datos y otras variables.
- **controllers** 📁: Controladores para manejar la lógica relacionada con los usuarios.
- **middleware** 🔒: Funciones middleware como la verificación de JWT.
- **models** 📦: Modelos de datos que representan la estructura de usuarios.
- **routes** 📑: Definiciones de las rutas de la API.

### Archivos Raíz
- **package.json** 📦: Archivo de configuración de Node.js que contiene dependencias y scripts.
- **.env** 🔒: Variables de entorno para la configuración sensible.
- **.gitignore** 🗑️: Archivos y carpetas que no deberían ser rastreados por Git.


## 🎮 Cómo Jugar

1. **Inicia el Juego**: Haz clic en el botón "Start Game" para comenzar la diversión. ¡Prepárate para golpear esos topos! 🕹️
2. **Golpea los Topos**: Usa tu ratón para hacer clic en los topos que aparecen en los agujeros. ¡Sé rápido y preciso! 🐹🔨
3. **Gana Puntos**: Cada topo que golpees te dará puntos. ¡Acumula tantos puntos como puedas y conviértete en el campeón! 🏆
4. **Evita los Fallos**: Si no golpeas un topo a tiempo, perderás puntos. ¡Mantén tus reflejos afilados! ⚡

## 🎨 Decoración y Estilo

¡Nuestro juego no solo es divertido de jugar, sino también hermoso de ver! Hemos utilizado imágenes y estilos increíbles para hacer que tu experiencia sea inolvidable. 🌟

- **Imágenes**: Encontrarás imágenes geniales en la carpeta [`Frontend/assets/images/`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fjavie%2FDesktop%2FWhac-A-Mole_JavaScript%2FFrontend%2Fassets%2Fimages%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22c6473aa9-5840-4d99-b384-83beef409a42%22%5D "c:\Users\javie\Desktop\Whac-A-Mole_JavaScript\Frontend\assets\images\").
- **Estilos**: Los estilos están en [`Frontend/assets/css/auth.css`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fjavie%2FDesktop%2FWhac-A-Mole_JavaScript%2FFrontend%2Fassets%2Fcss%2Fauth.css%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22c6473aa9-5840-4d99-b384-83beef409a42%22%5D "c:\Users\javie\Desktop\Whac-A-Mole_JavaScript\Frontend\assets\css\auth.css").

## 🏗️ Tecnologías Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Base de Datos**: MongoDB

## 🤝 Contribuciones

¡Nos encantaría que te unieras a nosotros para hacer este juego aún más increíble! Si tienes ideas, sugerencias o mejoras, no dudes en hacer un fork y enviar un pull request. ¡La diversión nunca termina! 🎉

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. ¡Siéntete libre de usarlo y modificarlo a tu gusto!

---

¡Gracias por jugar y ser parte de esta aventura! ¡Que los topos estén siempre a tu favor! 🐹🔨🎉
