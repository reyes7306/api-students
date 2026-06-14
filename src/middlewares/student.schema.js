import { z } from 'zod';

// El esquema exacto del JSON de estudiante
export const studentSchema = z.object({
    id: z.number({ required_error: 'El ID es obligatorio' }),
    nombres: z.string({ required_error: 'Los nombres son obligatorios' }).trim().min(1, { message: "El nombre no puede estar vacío o contener solo espacios" }),
    apellidos: z.string({ required_error: 'Los apellidos son obligatorios' }).trim().min(1, { message: "El apellido no puede estar vacío o contener solo espacios" }),
    edad: z.number({ required_error: 'La edad es obligatorio' }).max(18, 'La edad debe ser <= 18'),
    email: z.string().email('El formato del correo es inválido').trim().min(1, { message: "El correo electrónico no puede estar vacío o contener solo espacios" }),
    telefono: z.string({ required_error: 'El número de telefono es obligatorio' }).trim().min(1, { message: "El telefono no puede estar vacío o contener solo espacios" }),
    direccion: z.object({
        ciudad: z.string({ required_error: 'La ciudad es obligatorio' }).trim().min(1, { message: "La ciudad no puede estar vacía o contener solo espacios" }),
        pais: z.string({ required_error: 'El país es obligatorio' }).trim().min(1, { message: "El país no puede estar vacío o contener solo espacios" })
    }),
    estaActivo: z.boolean({ required_error: 'El estado de actividad es obligatorio' }),
    cursos: z.array(z.string())
});

// Esquema de actualización parcial
export const studentUpdateSchema = studentSchema.partial().extend({
    direccion: studentSchema.shape.direccion.partial().optional()
});