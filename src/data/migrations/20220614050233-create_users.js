'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
	 await queryInterface.createTable('le_users', {
			id:{
				type: Sequelize.DataTypes.UUID,
				unique: true,
				allowNull: false,
				primaryKey:true,
			},
		  firstname:{
     type:Sequelize.DataTypes.String,
		 allowNull: true,
		},
		lastname:{
				type: Sequelize.DataTypes.String,
				allowNull: true,
		},
		email:{
				type: Sequelize.DataTypes.String,
				allowNull: true,
			 
		},
		image:{
				type: Sequelize.DataTypes.String,
				allowNull: true,
		},
		address:{
				type:Sequelize.DataTypes.String,
				allowNull: true,
		},
		device_id:{
				type:Sequelize.DataTypes.Number,
				allowNull: true,
		},
		mobilenumber:{
				type:Sequelize.DataTypes.String,
				allowNull: true,
		},
		auth_token:{
				type:Sequelize.DataTypes.String,
				allowNull: true,
		},
		otp:{
				type:Sequelize.DataTypes.Number,
				allowNull: true,
		},
		is_registered:{
				type:Sequelize.DataTypes.Number,
				allowNull: true,
		},
	 status:{
				type: Sequelize.DataTypes.Number, // 0=inactive,1=active
				allowNull: true,
			
		},
			createdAt:{
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt:{
				allowNull: false,
				type: Sequelize.DATE
			},
		
	});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
	await queryInterface.dropTable('le_users');
  }
};
