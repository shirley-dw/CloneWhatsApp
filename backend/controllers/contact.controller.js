import ENVIROMENT from "../src/config/enviroment.js";
import mongoose from 'mongoose';
import ResponseBuilder from "../src/helpers/builders/responseBuilder.js";
import User from "../src/models/user.model.js";
import Message from "../src/models/message.model.js";
import { verifyEmail, verifyMinLength, verifyString, verifyPhone } from "../src/helpers/validations.helpers.js";

// Crear un nuevo contacto usando User en vez de Contacto
export const createContactController = async (req, res) => {
    try {
        const { name, email, phone, lastMessage } = req.body;
        const contactConfig = {
            name: {
                value: name,
                errors: [],
                validation: [
                    (field_name, field_value) => verifyString(field_name, field_value),
                    (field_name, field_value) => verifyMinLength(field_name, field_value, 3)
                ]
            },
            email: {
                value: email,
                errors: [],
                validation: [
                    (field_name, field_value) => verifyEmail(field_name, field_value)
                ]
            },
            phone: {
                value: phone,
                errors: [],
                validation: [
                    (field_name, field_value) => verifyPhone(field_name, field_value)
                ]
            },
            lastMessage: {
                value: lastMessage,
                errors: [],
                validation: [
                    (field_name, field_value) => verifyString(field_name, field_value)
                ]
            },
            status: {
                value: true,
                errors: [],
                validation: []
            }
        };

        let hayErrores = false;
        for (let field_name in contactConfig) {
            for (let validation of contactConfig[field_name].validation) {
                let result = validation(field_name, contactConfig[field_name].value);
                if (result) {
                    hayErrores = true;
                    contactConfig[field_name].errors.push(result);
                }
            }
        }

        if (hayErrores) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setCode('VALIDATION_ERROR')
                .setData({ contactState: contactConfig })
                .build();
            return res.json(response);
        }

        const userCreated = new User({
            name: contactConfig.name.value,
            email: contactConfig.email.value,
            phone: contactConfig.phone.value,
            lastMessage: contactConfig.lastMessage.value,
            status: contactConfig.status.value
        });

        await userCreated.save();

        const response = new ResponseBuilder()
            .setCode('SUCCESS')
            .setOk(true)
            .setStatus(200)
            .setData({ contactResult: contactConfig })
            .build();
        return res.json(response);
    } catch (error) {
        if (error.code === 11000) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setCode(400)
                .setMessage('Email ya está registrado')
                .setData({ detail: 'El email ya está registrado' })
                .build();
            res.json(response);
        } else {
            const response = new ResponseBuilder()
                .setOk(false)
                .setCode(500)
                .setMessage('Error interno del servidor')
                .build();
            return res.json(response);
        }
    }
 };

// Obtener todos los contactos
export const getAllContactsController = async (req, res) => {
    try {
        // Obtengo todos los usuarios
        const users = await User.find();

        // Simulo que cada usuario tiene mensajes
        const contactsWithMessages = await Promise.all(users.map(async (user) => {
            // Obtengo los mensajes del usuario
            const mensajes = await Message.find({ author: user._id });
            
            return {
                ...user.toObject(),
                mensajes: mensajes.map(mensaje => ({
                    text: mensaje.text,
                    hour: mensaje.hour
                }))
            };
        }));

        const response = new ResponseBuilder()
            .setCode('SUCCESS')
            .setOk(true)
            .setStatus(200)
            .setData({ contacts: contactsWithMessages })
            .build();
        return res.json(response);
    } catch (error) {
        console.error(error);
        const response = new ResponseBuilder()
            .setOk(false)
            .setCode(500)
            .setMessage('Error al obtener los contactos')
            .build();
        return res.json(response);
    }
};


// Obtener un contacto por ID



export const getContactByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const contacto = await User.findById(id);

        if (!contacto) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }

        res.status(200).json(contacto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el contacto' });
    }
};

// Actualizar un contacto por ID
export const updateContactController = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name, email, phone, lastMessage } = req.body;

        const contact = await User.findById(_id);

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
        const { _id } = req.params;

        const contact = await User.findById(_id);

        if (!contact) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setCode(404)
                .setMessage('Contacto no encontrado')
                .build();
            return res.json(response);
        }

        await contact.remove();

        const response = new ResponseBuilder()
            .setCode('SUCCESS')
            .setOk(true)
            .setStatus(200)
            .setMessage('Contacto eliminado correctamente')
            .build();
        return res.json(response);
    } catch (error) {
        console.error(error);
        const response = new ResponseBuilder()
            .setOk(false)
            .setCode(500)
            .setMessage('Error al eliminar el contacto')
            .build();
        return res.json(response);
    }
};
