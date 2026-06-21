import { z } from 'zod';
import { students } from '../models/students.model.js';

export const getStudents = async (req, res) => {
    res.send(students);
}

export const getStudent = async (req, res) => {
    const { id } = req.params;
    const rows = students.filter(student => student.id == id);

    if(rows.length === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });

    res.send(rows);
}

export const createStudent = async (req, res) => {
    const data = req.body;

    data.id = students.length + 1;

    const dataSorted = {
        id: data.id,
        ...data
    };

    students.push(dataSorted);

    res.status(201).json({ 
        mensaje: "Estudiante creado", 
        data: dataSorted
    });
}

export const updateStudent = async (req, res) => {
    const idParam = z.coerce.number({ mensaje: "El ID en la URL debe ser un número válido" }).safeParse(req.params.id);

    if (!idParam.success) {
        return res.status(400).json({
            error: "Parámetro inválido",
            mensaje: idParam.error.issues[0].message
        });
    }

    const id = idParam.data;
    const dataUpdate = req.body;

    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    if (dataUpdate.direccion) {
        dataUpdate.direccion = {
            ...students[studentIndex].direccion,
            ...dataUpdate.direccion
        };
    }

    students[studentIndex] = {
        ...students[studentIndex],
        ...dataUpdate
    };

    res.status(200).json({
        mensaje: "Estudiante actualizado con éxito",
        estudiante: students[studentIndex]
    });
}

export const deleteStudent = async (req, res) => {
    const idParam = z.coerce.number({ mensaje: "El ID en la URL debe ser un número válido" }).safeParse(req.params.id);

    if (!idParam.success) {
        return res.status(400).json({
            error: "Parámetro inválido",
            mensaje: idParam.error.issues[0].message
        });
    }

    const id = idParam.data;

    const indice = students.findIndex(student => student.id === id);

    if(indice === -1)
        return res.status(404).json({message: 'Estudiante no encontrado'});
    else {
        students.splice(indice, 1);
    }

    return res.status(201).json({ 
        mensaje: "Estudiante eliminado" 
    });
}