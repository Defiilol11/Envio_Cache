# Practica No. 2 - Aplicación de Envíos

## Universidad Mesoamericana - Ingeniería en Sistemas

### Programación Web - AngularJS

### Objetivo General

Complementar los conocimientos teóricos sobre web frameworks por medio de una interacción con AngularJS, permitiendo crear nuevos conocimientos a través de la práctica.

### Descripción

Esta aplicación web permite registrar paquetes de envío, actualizar su estado y dar seguimiento a cada paquete mostrando el historial de actualizaciones.

### Funcionalidades

#### Creación de orden

* Registrar información del remitente y destinatario.
* Validación de campos:

  * Nombre completo (solo letras y espacios).
  * Dirección obligatoria.
  * Correo con dominio Gmail u Outlook.
  * Descripción entre 40 y 120 caracteres.
* Genera un ID único y un número de paquete.
* Estado inicial: "Creado".

#### Actualización de orden

* Buscar por número de paquete.
* Actualizar estado siguiendo la secuencia: Creado → En proceso → Recogido de bodega → En camino → Entregado.
* Agregar comentario (20-40 caracteres) y responsable (solo letras y espacios).
* Confirmar cambios mediante modal.

#### Seguimiento de paquete

* Visualización de estado actual y historial.
* Indicadores de progreso para cada estado.
* Animación del paquete mostrando su avance hasta la entrega.

### Tecnologías Utilizadas

* Angular 15+ (Standalone Components)
* TypeScript
* TailwindCSS (opcional para estilos)

### Cómo usar la aplicación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Defiilol11/practica2_envios.git
   ```
2. Instalar dependencias:

   ```bash
   cd practica2-envios
   npm install
   ```
3. Ejecutar aplicación:

   ```bash
   ng serve -o
   ```
4. Abrir en el navegador: `http://localhost:4200/`

### Consideraciones

* La aplicación no utiliza almacenamiento persistente externo; todo se guarda en memoria o localStorage.
* Se informa al usuario mediante modales después de cada acción.
* Diseño responsive con al menos dos tamaños de visualización.

### Entrega

* Repositorio en GitHub: [https://github.com/Defiilol11/practica2_envios](https://github.com/Defiilol11/practica2_envios)
* Documentación en el README.
* Código fuente excluyendo `node_modules`.
