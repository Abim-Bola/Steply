import { Document } from "mongoose"
import { Types } from 'mongoose';

export interface ICategory {
    name: string
    user: Types.ObjectId
}