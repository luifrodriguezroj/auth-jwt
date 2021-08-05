# Autenticación con JWT
Ejercicio: En un ambiente dockerizado desarrolla un API que implemente el flujo completo de autenticación de usuarios por medio de JWT (json web tokens) del lado del backend. Realiza los módulos, validaciones y prácticas que creas pertinentes para el ejercicio.


## Configuración

### Instalar Docker

Sigue las [instrucciones de instalación](https://docs.docker.com/engine/install/) para tu distribución.

### Clonar el repositorio
```bash
git clone https://github.com/luifrodriguezroj/auth-jwt.git
```
## Uso
Ejecutar el siguiente comando:
```bash
docker-compose up
```
# API
### Registro
Si el registro es exitoso retorna los datos del usuario y un token (en la cabecera) asignado a las credenciales del usuario.
```http
POST - SIGN UP
http://localhost:3000/auth/signup
```
body
```http
{
	"username": "test",
	"email": "test@test.com",
	"password": "test123"
}
```
### Inicio de Sesión
Si el inicio de sesión es exitoso retorna los datos del usuario y un token (en la cabecera) asignado a las credenciales del usuario.
```http
POST - SIGN IN
http://localhost:3000/auth/signin
```
body
```http
{
	"username": "test",
	"password": "test123"
}
```
### Perfil
Si el token es válido retorna la información correspondiente al usuario.
```http
GET - PROFILE
http://localhost:3000/auth/profile
Authorization Bearer Token
Token <token>
```