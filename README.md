# Sistema de Control de Accesos - Polígono

Este es un **sistema de control de accesos** diseñado para un polígono, desarrollado con **HTML**, **CSS**, **JavaScript**, **jQuery**, **PHP**, **MySQL** y **SweetAlert** (Swal). El sistema permite gestionar eventos de acceso, facilitando el registro de personas, la creación de nuevos eventos, y brindando acceso a la administración de datos de usuarios, incluyendo sus contactos de emergencia.

El sistema está en constante desarrollo y escalabilidad para agregar más funcionalidades y optimizar la experiencia del usuario.

## 🚀 Características

- **Creación de nuevos eventos**: Los administradores pueden crear eventos donde las personas se registran para participar.
- **Formulario de registro**: Las personas pueden registrarse para eventos mediante un formulario que incluye campos como nombre, contacto de emergencia, etc.
- **Administración de docentes**: El administrador puede agregar nuevos docentes al evento para gestionar las actividades.
- **Consulta de registros**: Los administradores pueden ver cuántas personas se registraron en un evento y quiénes son, con acceso a sus detalles, incluyendo los contactos de emergencia proporcionados.
- **Cierre de evento**: El administrador tiene la opción de cerrar un evento una vez finalizado, para evitar más registros.
- **Interfaz responsiva**: Diseñada para ser accesible en dispositivos móviles y de escritorio.
- **Notificaciones visuales**: A través de **SweetAlert** (Swal) para confirmar acciones importantes o notificar al usuario de eventos.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML, CSS, JavaScript, jQuery
- **Backend**: PHP
- **Base de Datos**: MySQL
- **Alertas**: SweetAlert (Swal)

## 🚀 Uso

1. Clona este repositorio en tu máquina local.
2. Configura el servidor web (por ejemplo, **XAMPP** o **MAMP**) y asegúrate de que el servidor de **PHP** y la base de datos **MySQL** estén activos.
4. Ejecuta el sistema en tu navegador accediendo a `localhost/[nombre_del_proyecto]`.
5. Los administradores pueden iniciar sesión y empezar a gestionar los eventos, usuarios y docentes.

## 🧑‍💻 Funcionalidades para el Administrador

- **Ver registros**: El administrador puede ver la lista de personas registradas para cada evento y acceder a sus datos personales y contactos de emergencia.
- **Añadir docentes**: Se pueden añadir nuevos docentes a cada evento para apoyar la gestión.
- **Cerrar eventos**: Una vez un evento haya terminado, el administrador puede cerrarlo para evitar más registros.
- **Envío de correos**: A través de **PHPMailer**, el sistema puede enviar correos electrónicos de confirmación a los usuarios después de su registro.

## 🔧 Requisitos

- Servidor web con soporte para **PHP**.
- **MySQL** para gestionar la base de datos.

## 📬 Contacto

Para consultas, sugerencias o soporte técnico, puedes escribirme a [cristianfrubio01@gmail.com](mailto:cristianfrubio01@gmail.com).

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
