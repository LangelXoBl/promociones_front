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

[structure]: https://lh3.googleusercontent.com/pw/AL9nZEWzhtOCzIP1VxKeWXuznnLgZ3p-b9SAc-TZ8Be7j6eJAgKq4bt8LEzeFTLC6Mt4urj0_AP8RkVNOY-GPHG5EbIKwJqCAKctXiWQCTRoKPSipHTTRcb3o3U7nZHmCy1F-mRa-xk67jO2Rd1cvTgNQk1SwLozXFZVi6t2l0_AQxOZ4RvCElbMoop5pSVWXwzfkSHITT3szV0aORpL5aM-2gejqtUdg-kF0NmAmpaJBCRBeoD2Gc7NwKu-jnXj6LyVoNU61iijKFyML8H6QqAzBrEJzSwWXgj6_4-8jgpiD29UtoDN4crsV_2ioTFhaQ_BAQyxe8Whr_KRzAi2FniJWPuYvGwmYqcBl2b7tIQAnv78CunUky0Te4qxMVupejrm4wae9RQyf9w8R35pVdt6SVkkb2bMYYI7_auVrU5g2IDNFaFcVlKIl-w7N5J59q8ePZQVN3My-qt5EEs-OdKOOAAP3wXo61B_fE91WS-Uez2Jit2-r8dYpAyExfaGLusMo5wieoWDbzIcxnO2irotttBqDPdrVZ6TPuwjv0OX2H0y7c7LItn5yNTsy8Uy2L4GsB8AGqbg_bo2MTsTq_m6a-RyYV4WBy_gW9q4I-r8nXOi4vjMYCiazXNrDNrvHKyR9T1vEd9Ut3F8G8-k19VBvZsER3chHKMzDnlgRoVC-rszzh2_lqDE2KU6W-9bfXMJB5yXBawRr13pHo9KpAnZPOdjN9hK32ZdW80XAulI0C6O_6ehfDr5uyNK90HqitalrE4XrLI9eiWdKdJJ4LBPbGpV4EUNt0z4C-c9AXD3pxXV0lPlOmgVMe9B5LPOPhxcbA51GOd7yrz-wc87QLpmlTdpXJtW943nrsXbr2Ego_bh1Yl-4EL1oETLbivQKJQ2DhWWcvKh3qHOSdxf7rwjabU_DA=w587-h698-no?authuser=0
