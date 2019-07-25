import * as CryptoJS from 'crypto-js';
export class Encrypt {
  constructor() { }
 
  //The set method is use for encrypt the value.
  public static set(keys, value){
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), keys,
    {
        keySize: 128 / 8,
        iv: keys,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  public static get(keys, value){
    var decrypted = CryptoJS.AES.decrypt(value, keys, {
        keySize: 128 / 8,
        iv: keys,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}