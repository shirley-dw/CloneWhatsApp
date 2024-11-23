import ENVIROMENT from "../src/config/enviroment.js";
import ResponseBuilder from "../src/helpers/builders/responseBuilder.js";
import Message from "../src/models/message.model.js";
import mongoose from "mongoose";
import { verifyString } from "../src/helpers/validations.helpers.js";
import Contacto from "../src/models/contact.model.js";

// Crear un nuevo mensaje

export const createMessageController = async (req, res) => {
    try {
        const { author, text, status, day, hour, destinatario } = req.body;

        console.log('Datos recibidos:', { author, text, status, day, hour, destinatario });

        if (!author || !destinatario) {
            throw new Error("Author y destinatario son requeridos");
        }

        const newMessage = new Message({ author, text, status, day, hour, destinatario });
        const savedMessage = await newMessage.save();

        await Contacto.findByIdAndUpdate(author, {
            text: text,
            lastMessageTime: new Date(),
            fecha_actualizacion: new Date()
        });

        // Populamos el mensaje guardado para incluir detalles del autor y destinatario
        const populatedMessage = await Message.findById(savedMessage._id)
            .populate('author', 'name')
            .populate('destinatario', 'name');

        const response = new ResponseBuilder()
            .setCode('SUCCESS')
            .setOk(true)
            .setStatus(200)
            .setData({ message: populatedMessage })
            .build();

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error al crear el mensaje:', error);
        const response = new ResponseBuilder()
            .setOk(false)
            .setCode(500)
            .setMessage('Error al crear el mensaje')
            .build();

        return res.status(500).json(response);
    }
};

export const getAllMessagesController = async (req, res) => {
    try {
        const messages = await Message.find().populate('author', 'name');
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los mensajes' });
    }
};

export const getMessageByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const messages = await Message.find({ author: id }).populate('author', 'name');
        const contact = await Contacto.findById(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }

        res.status(200).json({
            contacto: contact,
            messages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los mensajes' });
    }
};



export const updateMessageController = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, status, day, hour } = req.body;

        const message = await Message.findById(id);

        if (!message) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setCode(404)
                .setMessage('Mensaje no encontrado')
                .build();
            return res.status(404).json(response);
        }

        message.text = text || message.text;
        message.status = status || message.status;
        message.day = day || message.day;
        message.hour = hour || message.hour;

        await message.save();

        const response = new ResponseBuilder()
            .setCode('SUCCESS')
            .setOk(true)
            .setStatus(200)
            .setData({ message })
            .build();
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error al actualizar el mensaje:', error);
        const response = new ResponseBuilder()
            .setOk(false)
            .setCode(500)
            .setMessage('Error al actualizar el mensaje')
            .build();
        return res.status(500).json(response);
    }
};

// Eliminar un mensaje por ID
export const deleteMessageController = async (req, res) => {
    try {
        const { id } = req.params;

        const message = await Message.findById(id);

        if (!message) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setCode(404)
                .setMessage('Mensaje no encontrado')
                .build();
            return res.json(response);
        }

        await Message.findByIdAndDelete(id);

        const response = new ResponseBuilder()
            .setCode('SUCCESS')
            .setOk(true)
            .setStatus(200)
            .setMessage('Mensaje eliminado correctamente')
            .build();
        return res.json(response);
    } catch (error) {
        console.error(error);
        const response = new ResponseBuilder()
            .setOk(false)
            .setCode(500)
            .setMessage('Error al eliminar el mensaje')
            .build();
        return res.json(response);
    }
};
