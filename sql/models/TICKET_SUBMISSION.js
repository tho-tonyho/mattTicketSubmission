import { DataTypes } from "sequelize"
export default function(sequelize) {
    const TICKET_SUBMISSION = sequelize.define('TICKET_SUBMISSION', {
        NUMBER: {type: DataTypes.TEXT},
        SYS_ID: {type: DataTypes.TEXT},
        LINK: {type: DataTypes.TEXT},
        USER: {type: DataTypes.TEXT},
        SHORT_DES: {type: DataTypes.TEXT},
      }, {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      });
      
      return TICKET_SUBMISSION
}


