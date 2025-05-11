import { ComponentLoader } from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

// Регистрируем только наши кастомные компоненты
const Components = {
    Dashboard: componentLoader.add('Dashboard', path.join(__dirname, 'components/imageAdd.jsx')),
    // ImageShow: componentLoader.add('ImageShow', path.join(__dirname, 'components/ImageShow.jsx')),
    // ImageList: componentLoader.add('ImageList', path.join(__dirname, 'components/ImageList.jsx')),
    // Не регистрируем компоненты upload здесь - они будут добавлены автоматически
};

export { componentLoader, Components };