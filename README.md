# Frontend Promociones 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Estructura

![Structure][structure]

### MisPromociones
 
 La vista principal recibe un **Prop** el cual servirá para hacer la consulta a la API y traer las promociones del desarrollo para despues mostrarlos en una tabla:
```
development_code: {
   type: String,
   default: ""
}
```
En esta parte también se realizará la petición de las propiedades para construir el `<v-autocomplete>` del formulario. Dicha peticion se encuentra en esta parte porque de esta manera cuando se crea o modifica una promocion se hace un `$emmit` el cual hace de nuevo la peticion a la API para de esta manera tener los datos de las propiedades actualizados con las promociones que tiene aplicadas.

### CrearPromo
Este componente recibe 2 **Props**, *develop* es usados para construir un objeto promotion que se le pasara al componte `FormPromotion` y el segundo es el resultado de la consulta de las propiedades del desarrollo.
~~~
develop: {
   type: String,
   default: ""
},
properties: {
   type: Array,
   default: () => []
}
~~~

### EditPromo:
Recibe  2 **Props**, el data es el objeto el cual es pasado por la vista `MisPromociones` y debe tener los datos de la promoción que se quiere editar, el segundo es el resultado de la consulta de las propiedades del desarrollo.
```
data: {
   type: Object,
   default: () => {}
},
properties: {
   type: Array,
   default: () => []
}
```

### FormPromociones:
Es el componente el cual se encarga de recibir y modificar los datos del objeto que recibe a través del **Prop** `data` y también recibe otro **Prop** llamado `properties` que es un array que contiene los datos de las propiedades del desarrollo.

```
data: {
   type: Object,
   default: () => {}
},
properties: {
   type: Array,
   default: () => []
}
```
Cuando se presiona el botón de "Guardar" se activa un `$emmit` el cual es recibida por el componente padre y activa la función `save()`, el cual tiene una lógica dependiente del componente padre en el que se encuentre. De igual manera el botón "Cerrar" tiene un `$emmit` que activara una función `close()` del componente padre.

[structure]: /public/diagrama.jpg
