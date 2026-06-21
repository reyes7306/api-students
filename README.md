## **🏠 API REST STUDENTS**
Esta API gestiona una lista de estudiantes de objetos almacenada en un array de JavaScript (datos quemados, sin base de datos). El servidor responde correctamente a las peticiones GET, POST, PATCH y DELETE; devolviendo un JSON con el código de estado HTTP apropiado.

**🚩 ENDPOINTS**
|Método|Endpoint  | Descripción|
|--|--|--|
| **GET** | `https://api-students-production-f734.up.railway.app/api/students` | Devuelve toda la lista de estudiantes |
| **GET** | `https://api-students-production-f734.up.railway.app/api/students/:id` | Devuelve los datos del estudiante según su ID |
| **POST** | `https://api-students-production-f734.up.railway.app/api/students/:id` | Crea un nuevo registro con los datos del estudiante |
| **PATCH** | `https://api-students-production-f734.up.railway.app/api/students/:id` | Actualiza los datos de un estudiante según su ID |
| **DELETE** | `https://api-students-production-f734.up.railway.app/api/students/:id` | Elimina de la lista un estudiante según su ID |

**👀 MODO DE USO DE LA API**
Puede utilizar los ejemplos a continuación para comprobar cómo funciona.

***Método GET***

    https://api-students-production-f734.up.railway.app/api/students
Resultado:

    [
    	{
    		"id": 1,
    		"nombres": "Juan",
    		"apellidos": "Pérez",
    		"edad": 17,
    		"email": "juan.perez@email.com",
    		"telefono": "+503 70000000",
    		"direccion": {
    			"ciudad": "San Salvador",
    			"pais": "El Salvador"
    		},
    		"estaActivo": true,
    		"cursos": [
    			"Analisis de datos",
    			"Programación",
    			"Base de datos"
    		]
    	}
    ]

***Método GET (Enviando como parámetro el ID del estudiante)***

    https://api-students-production-f734.up.railway.app/api/students/1
Resultado:

    [
    	{
    		"id": 1,
    		"nombres": "Juan",
    		"apellidos": "Pérez",
    		"edad": 17,
    		"email": "juan.perez@email.com",
    		"telefono": "+503 70000000",
    		"direccion": {
    			"ciudad": "San Salvador",
    			"pais": "El Salvador"
    		},
    		"estaActivo": true,
    		"cursos": [
    			"Analisis de datos",
    			"Programación",
    			"Base de datos"
    		]
    	}
    ]

***Método POST***

    https://api-students-production-f734.up.railway.app/api/students
Antes de ejecutar la URL por el método POST debe preparar en el ***body*** el JSON con los datos a crear:

    {
    	"nombres": "Edwin Eliseo",
    	"apellidos": "Reyes Galán",
    	"edad": 18,
    	"email": "edwin.reyes@email.com",
    	"telefono": "+503 76000000",
    	"direccion": {
    		"ciudad": "San Marcos",
    		"pais": "El Salvador"
    	},
    	"estaActivo": false,
    	"cursos": [
    		"Learning Machine",
    		"Programación",
    		"Base de datos"
    	]
    }
Una vez haya preparado el objeto JSON como el ejemplo anterior, envie los datos a la URL, obtendra la siguiente respuesta:

    {
    	"mensaje": "Estudiante creado",
    	"data": {
    		"id": 2,
    		"nombres": "Edwin Eliseo",
    		"apellidos": "Reyes Galán",
    		"edad": 18,
    		"email": "edwin.reyes@email.com",
    		"telefono": "+503 76000000",
    		"direccion": {
    			"ciudad": "San Marcos",
    			"pais": "El Salvador"
    		},
    		"estaActivo": false,
    		"cursos": [
    			"Learning Machine",
    			"Programación",
    			"Base de datos"
    		]
    	}
    }
Se utilizo el Middleware ***zod*** para validar el objeto JSON, si al momento de preparar el objeto en el body le falta alguna «clave:valor» se mostrará un mensaje de error. Por ejemplo, suponiendo que no colocamos el email con su información:

    {
    	"error": "Datos inválidos o incompletos",
    	"detalles": [
    		{
    			"campo": "email",
    			"mensaje": "Invalid input: expected string, received undefined"
    		}
    	]
    }

***Método PATCH***

    https://api-students-production-f734.up.railway.app/api/students/2
Antes de ejecutar la URL por el método PATCH, debe preparar el objeto JSON en el ***body*** con los datos que necesita modificar (puede colocar toda la información según la estructura del objeto JSON o solamente los datos que necesite actualizar)

    {
    	"nombres": "Carlos Humberto",
    	"apellidos": "García Navarro",
    	"estaActivo": true,
    	"cursos": [
    		"Tecnología",
    		"Programación",
    		"Base de datos"
    	]
    }
Una vez establecido el objeto JSON en el ***body*** con los datos a actualizar, ejecute la petición, observará la siguiente respuesta:

    {
    	"mensaje": "Estudiante actualizado con éxito",
    	"estudiante": {
    		"id": 2,
    		"nombres": "Carlos Humberto",
    		"apellidos": "García Navarro",
    		"edad": 18,
    		"email": "edwin.reyes@email.com",
    		"telefono": "+503 76000000",
    		"direccion": {
    			"ciudad": "San Marcos",
    			"pais": "El Salvador"
    		},
    		"estaActivo": true,
    		"cursos": [
    			"Tecnología",
    			"Programación",
    			"Base de datos"
    		]
    	}
    }
Si el ID del estudiante no existe, se mostrará el siguiente mensaje de error:

    {
    	"mensaje": "Estudiante no encontrado"
    }
Método DELETE
Para eliminar un estudiantes de la lista de objetos, utilice el siguiente ENDPOINT enviando como parámetro el ID del estudiante:

    https://api-students-production-f734.up.railway.app/api/students/1
Resultado:

    {
    	"mensaje": "Estudiante eliminado"
    }
Si coloca el ID de un estudiante que no existe, se mostrará el siguiente mensaje de error:

    {
    	"message": "Estudiante no encontrado"
    }


## 🤔 OBSERVACIONES

 1. No se utilizo el método PUT, pues con el método PATCH tenemos más control de los datos a actualizar.
 2. Si por error se colocará una URL que no existe, se utilizo un Middleware para gestionar las rutas inexistentes. Si por ejemplo, se colocara: `https://api-students-production-f734.up.railway.app/estudiantes`, se mostrará el siguiente mensaje de error:

    `{
    	"success": false,
    	"message": "No se encontró la ruta: /estudiantes"
    }`
