const crypto = require('crypto');
const secretKey = 'MyEasy32CharacterKey1234567890ab';

function encrypt(data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
  const currentTime = new Date().toISOString(); 
  const dataToEncrypt = `${data}+${currentTime}`;

  let encrypted = cipher.update(dataToEncrypt, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return { encryptedData: encrypted, iv: iv.toString('hex') };
}


// const data = "Sensitive information";
// const encrypted = encrypt(data);

// console.log('Encrypted Data:', encrypted.encryptedData);
// console.log('IV for Decryption:', encrypted.iv);

function decrypt(encryptedData, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, Buffer.from(iv, 'hex'));
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;  
  }
//   const decrypted = decrypt(encrypted.encryptedData, encrypted.iv);
//   console.log('Decrypted Data:', decrypted);

  module.exports = {encrypt, decrypt};