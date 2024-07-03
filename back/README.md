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

        property: string; 

        value: any; 

        constraints?: { 

            [type: string]: string;

        };

        children?: ValidationError[]; 

    }

    ]

  ```
