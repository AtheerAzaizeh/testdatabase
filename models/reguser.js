const bcrypt = require('bcrypt');
const db = require('../config/db');

const reguserModel = {
    async registerUser(user) {
      try {

        if (!user.FullName || !user.PasswordHash || !user.EmailAddress || !user.UserType) {
          throw new Error('Missing required user data');
        }
  
        const hashedPassword = await bcrypt.hash(user.PasswordHash, 10);
        
        const query = 'INSERT INTO users (FullName, PasswordHash, EmailAddress, UserType) VALUES (?, ?, ?, ?)';
        const values = [
          user.FullName,
          hashedPassword,
          user.EmailAddress,
          user.UserType
        ];
        
        const [result] = await db.execute(query, values);
        const userId = result.insertId;
        const role = user.UserType.toLowerCase();
        if (role == 'worker') {
            await db.query('INSERT INTO workers (UserID) VALUES (?)', [userId]);
            }

        else if (role == 'manager') {
            await db.query('INSERT INTO managers (UserID) VALUES (?)', [userId]);
            }

      } catch (error) {
        console.error('Error registering user:', error.message);
         throw new Error(error.message);
      }
    }
  };
  
  module.exports = reguserModel;