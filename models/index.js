import Category from './category.js';
import Subcategory from './subcategory.js';
import Slider from './promoSlider.js';
import Product from './product.js';


// Category.hasMany(Subcategory, { foreignKey: 'category_id' });
// Subcategory.belongsTo(Category, { foreignKey: 'category_id' });

Category.hasMany(Subcategory, { foreignKey: 'parent_category' });
Subcategory.belongsTo(Category, { foreignKey: 'parent_category' });




Category.hasMany(Product, { foreignKey: 'product_category' });
Product.belongsTo(Category, { foreignKey: 'product_category' });

Subcategory.hasMany(Product, { foreignKey: 'product_subcategory' });
Product.belongsTo(Subcategory, { foreignKey: 'product_subcategory' });

export {
    Category,
    Subcategory,
    Slider,
    Product
};
