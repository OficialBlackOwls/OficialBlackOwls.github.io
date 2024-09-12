document.addEventListener("DOMContentLoaded", function() {
    const mainImage = document.getElementById('main-product-img');
    const previewImages = document.querySelectorAll('.card-img img');

    previewImages.forEach((image) => {
        image.addEventListener('click', function () {
            mainImage.src = this.src;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('btn-request');

    if (button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Previene el comportamiento por defecto del botón
            sendDiscordMessages();
        });
    }
});

function sendDiscordMessages() {
    const nombre = document.getElementById('Nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const discord = document.getElementById('discord').value.trim();
    const talla = document.getElementById('select').value;

    // Verifica que todos los campos requeridos estén completos
    if (!nombre || !correo || !talla) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos requeridos.'
        });
        return;
    }

    const rolID = '1234906286970114100'; // Reemplaza con el ID del rol que deseas mencionar

    // Mensaje de texto que menciona el rol
    const textMessage = `<@&${rolID}>`;

    // Embed con la información del pedido, una imagen y botones
    const embed = {
        title: 'Nuevo Pedido',
        description: `**Nombre:** ${nombre}\n**Correo:** ${correo}\n**Discord:** ${discord || 'No proporcionado'}\n**Talla:** ${talla}`,
        color: 3066993, // Color del borde del embed en formato hexadecimal decimal
        thumbnail: {
            url: 'https://i.postimg.cc/T1b35cZZ/frontal.png' // Reemplaza con la URL de tu imagen
        }
    };

    const webhookURL = 'https://discord.com/api/webhooks/1283555176422047847/PcjQWjN6CxO7oAy2-OSD9fOuRV-o_6EcS3IES2rG-ZtARmw8iohZOoHDK6Nq8pmgSmwd';

    // Enviar mensaje de texto
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            embeds: [embed],
            content: textMessage
        }),
    })
    .then(response => {
        if (response.status === 204) {
            console.log('Mensaje embebido enviado a Discord exitosamente.');
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Pedido solicitado con éxito. Nos pondremos en contacto contigo lo más rápido posible para finalizar el proceso.'
            }).then(() => {
                // Redirige a otra página después de que el alert de Swal se haya cerrado
                window.location.href = 'http://127.0.0.1:3000/index.html'; // Reemplaza con la URL a la que deseas redirigir
            });
        } else {
            return response.text().then(text => { throw new Error(`Error ${response.status}: ${text}`); });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Ocurrió un error al enviar el mensaje: ${error.message}`
        });
    });
}
