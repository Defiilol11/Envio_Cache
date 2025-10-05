# Práctica 2 – Angular @latest (Standalone): Paquetería

Aplicación Angular moderna (standalone) que permite:
- Crear órdenes de envío
- Actualizar el estado siguiendo un flujo predefinido
- Consultar seguimiento por código

Sin almacenamiento persistente (datos en memoria durante la sesión del navegador).

## Tecnologías
- Angular @latest (standalone, Router, Reactive Forms)
- Angular Material (UI y SnackBars)
- SCSS

## Requerimientos cubiertos
- Páginas: creación, actualización y seguimiento
- Validaciones:
  - Nombres (remitente y responsable): solo letras y espacios
  - Dirección: calle/avenida, zona, municipio y departamento (todos obligatorios)
  - Email válido y solo dominios gmail.com y outlook.com
  - Descripción: 40 a 120 caracteres
  - Comentario de actualización: 20 a 40 caracteres
- Generación:
  - Número de paquete incremental
  - Código de seguimiento de 12 letras (A–Z / a–z)
- Flujo de estados:
  - Creado → En preparación → En tránsito → Entregado
  - Desde “En preparación” o “En tránsito” → “No entregado”
  - “Entregado” y “No entregado” son finales
- Notificaciones: snackbars tras cada acción
- Responsive: grid + estilos (dos tamaños principales)

## Inicio rápido
```bash
npx @angular/cli@latest new paqueteria --routing --style=scss --standalone
cd paqueteria
ng add @angular/material
ng serve -o
```

## Estructura
```
src/
  app/
    models/
      order.model.ts
    services/
      notification.service.ts
      order.service.ts
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
    app.component.ts
    app.component.html
    app.component.scss
    app.routes.ts
  main.ts
  styles.scss
```

## Notas
- Los datos se pierden al refrescar (no hay backend ni storage).
- Si deseas estilos de tu universidad, puedes ajustarlos en `styles.scss` o agregar un tema Angular Material.