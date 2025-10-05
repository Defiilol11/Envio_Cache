# Práctica 2 – Angular @latest (Standalone) · Paquetería

Aplicación web realizada en Angular 20 (standalone) para gestionar órdenes de envío: creación, actualización de estado y seguimiento por código. Incluye validaciones, control estricto del flujo de estados, notificaciones y diseño responsive con menú hamburguesa. Sin persistencia (datos en memoria).

## Stack del proyecto
- Angular 20 (standalone, Router, Reactive Forms sin tipado estricto: UntypedFormBuilder)
- TypeScript 5
- Tailwind CSS por CDN (sin build)
- Sin AngularJS, sin Angular Material, sin @angular/animations

## Requisitos
- Node.js 18+ (o 20+)
- npm 9+
- Navegador moderno

## Ejecutar en local
```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
# ó
ng serve -o
```
- Abrir: http://localhost:4200/crear (sin hash “#!”).

## Rutas
- /crear: formulario para registrar una orden.
- /actualizar: búsqueda por número de paquete y cambio de estado con comentario y responsable.
- /seguimiento: consulta por código de seguimiento (12 letras). Muestra la línea de tiempo en orden ascendente por fecha.

En móviles, la navegación aparece como menú hamburguesa; en escritorio, menú horizontal.

## Validaciones y reglas
- Remitente y Responsable: solo letras y espacios (sin números ni símbolos).
- Dirección: Calle/Avenida, Zona, Municipio y Departamento obligatorios.
- Correo: formato válido y dominio limitado a gmail.com u outlook.com.
- Descripción (creación): 40 a 120 caracteres.
- Comentario (actualización): 20 a 40 caracteres.
- Seguimiento: exactamente 12 letras (A–Z/a–z).

## Flujo de estados (transiciones permitidas)
- Creado → En preparación → En tránsito → Entregado
- En preparación → No entregado
- En tránsito → No entregado
- Estados finales: Entregado y No entregado
- Transiciones fuera de este flujo son rechazadas con mensaje al usuario.

## Generación de identificadores
- Número de paquete: incremental simple (1001, 1002, …).
- Código de seguimiento: 12 letras aleatorias (mayúsculas/minúsculas).

## Notificaciones
Toaster ligero propio (sin dependencias). Muestra mensajes de éxito/error tras acciones clave y se oculta automáticamente.

## Responsive
- Tailwind por CDN (clases utilitarias).
- Layout fluido con grid y espaciados.
- Menú hamburguesa en < md; cierra al navegar y al redimensionar a ≥ md.

## Estructura del proyecto (carpetas/archivos relevantes)
```
src/
  app/
    models/
      order.model.ts               # Tipos: Order, OrderStatus, etc.
    services/
      order.service.ts             # Lógica en memoria: CRUD y flujo de estados
      notification.service.ts      # Toaster simple (éxito/error)
    pages/
      create-order/
        create-order.component.ts
        create-order.component.html
      update-order/
        update-order.component.ts
        update-order.component.html
      track-order/
        track-order.component.ts
        track-order.component.html
    app.component.ts               # Header + router-outlet + menú responsive + toaster
    app.component.html
    app.routes.ts                  # Rutas: /crear, /actualizar, /seguimiento
    app.config.ts                  # provideRouter(routes)
  index.html                       # Tailwind CDN + fuente
  main.ts                          # bootstrapApplication(AppComponent, appConfig)
  styles.scss                      # (Opcional) CSS global simple; sin @tailwind/@apply
```

## Decisiones técnicas
- Reactive Forms “untyped”: evita errores de tipado en plantillas con acceso por índice (`controls['campo']`).
- Tailwind CDN: no requiere configuración ni build; ideal para la práctica (no producción).
- Sin dependencias UI adicionales: todo con HTML + Tailwind para mantener simple y claro.

## Limitaciones
- No hay persistencia (los datos se reinician al refrescar).
- El número de paquete es incremental en memoria (no es global ni único fuera de la sesión).

## Solución de problemas
- Pantalla vacía o rutas que no cargan:
  - Verifica navegar a /crear (sin `#!`).
  - Asegúrate de que `src/index.html` NO incluye scripts de AngularJS (1.x).
- Error de formularios en plantilla:
  - Los controles se acceden como `form.controls['campo']` (no `form.controls.campo`).
- Tailwind no aplica estilos:
  - Recarga dura (Ctrl+F5); confirma que el script CDN está en `index.html`.

## Licencia
Uso académico. Libre de reutilizar y adaptar para fines educativos.
