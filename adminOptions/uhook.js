import fs from 'fs';
import path from 'path';

// Хук до создания записи
export const before = async (request, context) => {
    const currentAdmin = context.currentAdmin;
    console.log('Before Hook:', context);

    // Проверка метода POST для обработки загрузки
    if (request.method === 'post') {
        request.payload = {
            ownerId: currentAdmin._id,  // Привязка владельца
            ...request.payload
        };

        const { uploadImage, ...otherParams } = request.payload;
        context.uploadImage = uploadImage;  // Сохраняем изображение в контексте

        return {
            ...request,
            payload: otherParams  // Передаем другие параметры без изображения
        };
    }

    return request;  // Возвращаем запрос без изменений
};

// Хук после создания записи
export const after = async (req, res, context) => {
    const { record, uploadImage } = context;

    // Проверка на корректность записи и наличие изображения
    if (record.isValid() && uploadImage) {
        try {
            // Формируем путь для сохранения изображения
            const uploadDir = path.join(__dirname, 'public', 'images');  // Используем абсолютный путь
            const filePath = path.join(uploadDir, uploadImage.name);

            console.log('Uploading image to:', filePath);

            // Создаем директорию, если она еще не существует
            await fs.promises.mkdir(uploadDir, { recursive: true });

            // Перемещаем изображение в нужное место
            await fs.promises.rename(uploadImage.path, filePath);

            // Обновляем запись в базе данных с путем к изображению
            await record.update({ picture: `images/${uploadImage.name}` });

            console.log('Image uploaded successfully:', filePath);

        } catch (error) {
            console.error('Error during file upload:', error);
            throw new Error('Failed to upload image');
        }
    }

    return req;  // Возвращаем запрос без изменений
};

// export { before, after };
