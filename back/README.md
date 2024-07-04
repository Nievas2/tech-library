## Rutas de la api de Autenticación

### Registrar un nuevo usuario

**Descripción:** Este endpoint guarda un nuevo usuario y devuelve un token, la clave del usuario es encriptada por el algoritmo bcrypt.

```http

  POST /api/register

```

#### Cuerpo de la solicitud

```json

{

    "username" : "string",

    "password" : "string",

    "email" : "string",

}

```

- **Encabezados de solicitud aceptados:** `Accept=application/json`
- **Respuesta exitosa:**

  - Código de estado: 201 Created
  - Cuerpo de respuesta:

  ```json

    {

        "accesToken" : "string",

        "username": "string", 

        "email" : "string",

        "id" : "number",

        "role" : "RoleType"

    }

  ```
- **Respuesta fallida en caso de usuario/email existente:**

  - Código de estado: 400 Conflict
  - Cuerpo de respuesta:

  ```json

  [

    {

        "statusMessage": "string",

        "status": Integer

    }

  ]

  ```
- **Respuesta fallida en caso datos invalidos:**

  - Código de estado: 400 Bad Request
  - Cuerpo de respuesta:

  ```json

    [

      {

        property: string; 

        value: any; 

        constraints?: { 

            [type: string]: string;

        };

        children?: ValidationError[]; 

    }

    ]

  ```

### Logearse como usuario

**Descripción:** Este endpoint permite obtener un token de acceso a travez de credenciales de usuario.

```http

  POST /api/login

```

#### Cuerpo de la solicitud

```json

{

    "username" : "string",

    "password" : "string",

}

```

- **Encabezados de solicitud aceptados:** `Accept=application/json`
- **Respuesta exitosa:**

  - Código de estado: 200 Ok
  - Cuerpo de respuesta:

  ```json

    {

        "accesToken" : "string",

        "username": "string", 

        "email" : "string",

        "id" : "number",

        "role" : "RoleType"

    }

  ```
- **Respuesta fallida en caso de usuario/email incorrecto:**

  - Código de estado: 401 Unauthorized
- **Respuesta fallida en caso datos invalidos:**

  - Código de estado: 400 Bad Request
  - Cuerpo de respuesta:

  ```json


    [
      	{

       "property": "string",

        "value": any,

        "constraints": { 

            [type: "string"]: "string"

        }

        "children": ValidationError[],

    	}
    ]

  ```

## Rutas de la api de Tags

### Registrar una tag

**Descripción:** Este endpoint guarda una tag la cual sera utilizada para crear o buscar librerias

```http

  POST /api/tag/create

```

#### Cuerpo de la solicitud

```json

{

    "name" : "string",

    "color" : "string",

}

```

| Atributo | Descripcion                            | Valores admitidos                                                  |
| -------- | -------------------------------------- | ------------------------------------------------------------------ |
| name     | Nombre del tag                         | No debe estar vacio                                                |
| color    | Color del tag utilizado en el frontend | Debe contener 7 caracteres y comenzar con #<br />ejemplo : #123456 |

### Obtener una tag

**Descripción:** Este endpoint devuelve la tag al id proporcionado (siempre que la misma tenga el estado active en true)

```http

  GET /api/tag/:id

```

#### Parametros de ruta

| Parametro de ruta | Descripcion                 |
| ----------------- | --------------------------- |
| :id               | id unico de la tag a buscar |

- **Encabezados de solicitud aceptados:** `Accept=application/json`
- **Respuesta exitosa:**

  - Código de estado: 200 OK
  - Cuerpo de respuesta:

  ```json
   {
      "status": number,
      "statusMessage": "string",
      "data": {
          "name": "string",
          "color": "string",
          "isActive": boolean,
          "id": "string",
          "createdAt": Date,
          "updatedAt": Date
      }
  }
  ```
- **Respuesta fallida:**

  - Código de estado: 400 Bad Request
  - Cuerpo de respuesta:

  ```json
   {
      "status": number,
      "statusMessage": "string",
  }
  ```

### Obtener todas las tags

**Descripción:** Este endpoint devuelve todas las tags registradas en base de datos (siempre que la misma tenga el estado active en true)

```http

  GET /api/tag/all

```

- **Encabezados de solicitud aceptados:** `Accept=application/json`

  - **Respuesta exitosa:**

    - Código de estado: 200 OK
    - Cuerpo de respuesta:

    ```json
     {
        "status": number,
        "statusMessage": "string",
        "data": [
    	{
            "name": "string",
            "color": "string",
            "isActive": boolean,
            "id": "string",
            "createdAt": Date,
            "updatedAt": Date
        	}
    	]
    }
    ```
- **Respuesta fallida:**

  - Código de estado: 400 Bad Request
  - Cuerpo de respuesta:

  ```json
   {
      "status": number,
      "statusMessage": "string",
  }
  ```

### Editar una tag

**Descripción:** Este endpoint edita una tag registrada en base de datos, el endpoint requiere un token con usuario administrador

```http

  PUT /tag/update/:id
```

#### Cuerpo de la solicitud

```json

{

    "name" : "string",

    "color" : "string",

}

```

| Atributo | Descripcion                            | Valores admitidos                                                  | Opcional |
| -------- | -------------------------------------- | ------------------------------------------------------------------ | -------- |
| name     | Nombre del tag                         | No debe estar vacio                                                | Si       |
| color    | Color del tag utilizado en el frontend | Debe contener 7 caracteres y comenzar con #<br />ejemplo : #123456 | Si       |

### Eliminar una tag

**Descripción:** Este endpoint edita una tag registrada en base de datos, el endpoint requiere un token con usuario administrador

```http

  DELETE /tag/delete/:id
```


#### Parametros de ruta

| Parametro de ruta | Descripcion                 |
| ----------------- | --------------------------- |
| :id               | id unico de la tag a buscar |

- **Encabezados de solicitud aceptados:** `Accept=application/json`
- **Respuesta exitosa:**

  - Código de estado: 200 OK
  - **Respuesta fallida:
  - **Código de estado: 400 Bad Request
  - Cuerpo de respuesta:
- ```json
   {
      "status": number,
      "statusMessage": "string",
  }
  ```
