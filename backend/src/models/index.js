import sequelize from '../config/database.js';
import User from './User.js';
import BlockchainInteraction from './BlockchainInteraction.js';

// Define associations
User.hasMany(BlockchainInteraction, { foreignKey: 'userId', as: 'interactions' });
BlockchainInteraction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { sequelize, User, BlockchainInteraction };
