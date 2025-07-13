// // types/express/index.d.ts
// import { Request } from 'express';

// declare module 'express-serve-static-core' {
//   interface Request {
//     userId?: string | number;
//   }
// }

declare namespace Express {
  interface Request {
    stringId?: string;
  }
}