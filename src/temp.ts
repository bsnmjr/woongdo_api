import { cryptoHandle } from './cryptoHandle';
import dotenv from 'dotenv';

dotenv.config();

const userPW = '1234'

console.log( 'process.env.ENCRYPT_KEY', process.env.ENCRYPT_KEY );
console.log( userPW, cryptoHandle.SHA256(userPW) ) ;
