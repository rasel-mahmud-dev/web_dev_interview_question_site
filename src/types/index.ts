import {Request} from "express";

export interface RequestWithSession extends Request{
  session: {
    user_id: string,
    role: string
  } | null
}