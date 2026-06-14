import { ZodError } from 'zod';

// Captura JSONs rotos antes de que Express explote
export const jsonRoto = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: "Error de sintaxis en el JSON",
      mensaje: "El JSON enviado está mal formado (ej. falta un valor, una coma o una llave)."
    });
  }
  next(err);
};

// Validador dinámico de Zod para el JSON
export const validarEsquema = (schema) => (req, res, next) => {
  const resultado = schema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      error: "Datos inválidos o incompletos",
      detalles: resultado.error.issues.map(err => ({
        campo: err.path.join('.'),
        mensaje: err.message
      }))
    });
  }

  req.body = resultado.data; 
  next();
};

// Middleware para capturar rutas inexistentes
export const notFound = (req, res, next) => {
    const error = new Error(`No se encontró la ruta: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Manejador global de errores (Debe tener los 4 parámetros)
export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        success: false,
        message: err.message
    });
};