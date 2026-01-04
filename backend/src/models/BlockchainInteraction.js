import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const BlockchainInteraction = sequelize.define('BlockchainInteraction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  transactionHash: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contractAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false
  },
  network: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ethereum'
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'failed'),
    defaultValue: 'pending'
  },
  gasUsed: {
    type: DataTypes.STRING,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true
  }
}, {
  timestamps: true
});

export default BlockchainInteraction;
