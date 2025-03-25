import { Request, Response } from 'express';
import { Usuario } from './database';

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface RegisterRequest extends Request {
  body: {
    nome: string;
    email: string;
    password: string;
  };
}

export interface AuthResponse extends Response {
  json: (body: {
    id?: number;
    nome?: string;
    email?: string;
    role?: string;
    token?: string;
    message?: string;
    error?: string;
  }) => this;
}