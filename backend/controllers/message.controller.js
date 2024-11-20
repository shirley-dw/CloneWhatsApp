import ENVIROMENT from "../src/config/enviroment.js";
import ResponseBuilder from "../src/helpers/builders/responseBuilder.js";
import Message from "../src/models/message.model.js";
import User from "../src/models/user.model.js";
import { verifyString } from "../src/helpers/validations.helpers.js";

// Crear un nuevo mensaje


export const createMessageController = async (req, res) => {
  try {
    const { authorId, text, day, hour } = req.body;

    // Validar el campo text
    const textErrors = verifyString('text', text);
    if (textErrors.length > 0) {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setCode('VALIDATION_ERROR')
        .setData({ textErrors })
        .build();
      return res.status(400).json(response);
    }

    // Verificar si el usuario existe
    const user = await User.findById(authorId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear el mensaje
    const messageCreated = new Message({
      author: authorId,
      text,
      day,
      hour
    });

    await messageCreated.save();

    const response = new ResponseBuilder()
      .setCode('SUCCESS')
      .setOk(true)
      .setStatus(201)
      .setData({ message: messageCreated })
      .build();
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const response = new ResponseBuilder()
      .setOk(false)
      .setCode(500)
      .setMessage('Error interno del servidor')
      .build();
    return res.status(500).json(response);
  }
};

export const getAllMessagesController = async (req, res) => {
  try {

    const messages = await Message.find().populate('author', 'name')
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los mensajes' });
  }
};

export const getMessageByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const messages = await Message.find({ author: id }).populate('author', 'name');
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({
      contacto: user,
      messages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los mensajes' });
  }
};


// Actualizar un mensaje por ID
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
            return res.json(response);
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
        return res.json(response);
    } catch (error) {
        console.error(error);
        const response = new ResponseBuilder()
            .setOk(false)
            .setCode(500)
            .setMessage('Error al actualizar el mensaje')
            .build();
        return res.json(response);
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

        await message.remove();

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
