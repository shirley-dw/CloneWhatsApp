import ENVIROMENT from "../src/config/enviroment.js";
import ResponseBuilder from "../src/helpers/builders/responseBuilder.js";
import Message from "../src/models/message.model.js";
import mongoose from "mongoose";
import User from "../src/models/user.model.js";
import Contacto from "../src/models/contact.model.js";

// Crear un nuevo mensaje

export const createMessageController = async (req, res) => {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { author, text, status, day, hour, destinatario } = req.body;

        // Validar que los campos necesarios están presentes y son válidos
        if (!author || !mongoose.Types.ObjectId.isValid(author)) {
            return res.status(400).json({ message: 'Author debe ser un ObjectId válido' });
        }

        if (!destinatario || !mongoose.Types.ObjectId.isValid(destinatario)) {
            return res.status(400).json({ message: 'Destinatario debe ser un ObjectId válido' });
        }

        // Verificar que el autor (user) existe
        const user = await User.findById(author);
        if (!user) {
            return res.status(400).json({ message: 'El autor no existe' });
        }

        // Verificar que el destinatario (contacto) existe
        const contacto = await Contacto.findById(destinatario);
        if (!contacto) {
            return res.status(400).json({ message: 'El destinatario no existe' });
        }

        // Crear el mensaje
        const newMessage = new Message({ author, text, status, day, hour, destinatario });
        const savedMessage = await newMessage.save();

        // Popular los datos del autor y destinatario
        const populatedMessage = await Message.findById(savedMessage._id)
            .populate('author', 'name')
            .populate('destinatario', 'name');

        // Respuesta exitosa
        return res.status(200).json(populatedMessage);
    } catch (error) {
        console.error('Error al crear el mensaje:', error);
        return res.status(500).json({ message: 'Error al crear el mensaje' });
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

        // Mensajes enviados por el contacto
        const mensajesEnviados = await Message.find({ author: id })
            .populate('author', 'name')
            .populate('destinatario', 'name');

        // Mensajes recibidos por el contacto
        const mensajesRecibidos = await Message.find({ destinatario: id })
            .populate('author', 'name')
            .populate('destinatario', 'name');

        // Combinar los mensajes enviados y recibidos
        const messages = [...mensajesEnviados, ...mensajesRecibidos];

        // Buscar información del contacto
        const contact = await Contacto.findById(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }

        res.status(200).json({
            contacto: contact,
            messages
        });
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
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

// Obtener mensajes por author o destinatario
export const getMessagesByUserOrContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.params;
        const messages = await Message.find({ [type]: id }).populate('author', 'name');
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los mensajes' });
    }
};