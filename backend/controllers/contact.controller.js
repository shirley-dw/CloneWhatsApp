import Contacto from '../src/models/contact.model.js';

import { verifyString, verifyMinLength, verifyEmail, verifyPhone } from '../src/helpers/validations.helpers.js';
import ResponseBuilder from '../src/helpers/builders/responseBuilder.js';
import ENVIROMENT from '../src/config/enviroment.js';
import mongoose from 'mongoose';


export const createContactController = async (req, res) => {
    try {
        const { name, email, phone, text } = req.body;

        const errors = {};

        const validateField = (field, value, validators) => {
            const fieldErrors = validators.map(validate => validate(field, value)).filter(Boolean);
            if (fieldErrors.length) errors[field] = fieldErrors;
        };

        validateField('name', name, [verifyString, field => verifyMinLength(field, name, 5)]);
        validateField('email', email, [verifyEmail]);
        validateField('phone', phone, [verifyPhone]);

        if (Object.keys(errors).length) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setCode('VALIDATION_ERROR')
                .setMessage('Validaciones fallidas')
                .setData({ errors })
                .build();
            return res.status(400).json(response);
        }

        const contactCreated = new Contacto({ name, email, phone, text });
        await contactCreated.save();

        const response = new ResponseBuilder()
            .setCode('SUCCESS')
            .setOk(true)
            .setStatus(200)
            .setData({ contactResult: contactCreated })
            .build();
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error al crear el contacto:', error);

        if (error.code === 11000) { // Error de duplicado en MongoDB
            const response = new ResponseBuilder()
                .setOk(false)
                .setCode(400)
                .setMessage('Email ya está registrado')
                .setData({ detail: 'El email ya está registrado' })
                .build();
            return res.status(400).json(response);
        } else {
            const response = new ResponseBuilder()
                .setOk(false)
                .setCode(500)
                .setMessage('Error interno del servidor')
                .build();
            return res.status(500).json(response);
        }
    }
};

// Obtener todos los contactos

export const getAllContactsController = async (req, res) => {
    try {
        // Obtengo todos los contactos
        const contactos = await Contacto.find();
        // Construyo la respuesta con los contactos obtenidos
        const response = new ResponseBuilder()
            .setCode('SUCCESS')
            .setOk(true)
            .setStatus(200)
            .setData(contactos)
            .build();
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error al obtener los contactos:', error);
        const response = new ResponseBuilder()
            .setOk(false)
            .setCode(500)
            .setMessage('Error al obtener los contactos')
            .build();
        return res.status(500).json(response);
    }
};


// Obtener un contacto por ID

export const getContactByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const contacto = await Contacto.findById(id);

        if (!contacto) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }

        res.status(200).json(contacto);
    } catch (error) {
        console.error('Error al obtener el contacto:', error);
        res.status(500).json({ message: 'Error al obtener el contacto' });
    }
};





// Actualizar un contacto por ID
export const updateContactController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, lastMessage } = req.body;

        const contact = await Contacto.findById(id);

        if (!contact) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setCode(404)
                .setMessage('Contacto no encontrado')
                .build();
            return res.json(response);
        }

        contact.name = name || contact.name;
        contact.email = email || contact.email;
        contact.phone = phone || contact.phone;
        contact.lastMessage = lastMessage || contact.lastMessage;

        await contact.save();

        const response = new ResponseBuilder()
            .setCode('SUCCESS')
            .setOk(true)
            .setStatus(200)
            .setData({ contact })
            .build();
        return res.json(response);
    } catch (error) {
        console.error(error);
        const response = new ResponseBuilder()
            .setOk(false)
            .setCode(500)
            .setMessage('Error al actualizar el contacto')
            .build();
        return res.json(response);
    }
};

// Eliminar un contacto por ID
export const deleteContactController = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contacto.findById(id);

        if (!contact) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setCode(404)
                .setMessage('Contacto no encontrado')
                .build();
            return res.status(404).json(response);
        }

        await Contacto.findByIdAndDelete(id);

        const response = new ResponseBuilder()
            .setCode('SUCCESS')
            .setOk(true)
            .setStatus(200)
            .setMessage('Contacto eliminado correctamente')
            .build();
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error al eliminar el contacto:', error);
        const response = new ResponseBuilder()
            .setOk(false)
            .setCode(500)
            .setMessage('Error al eliminar el contacto')
            .build();
        return res.status(500).json(response);
    }
};
