import { Request, Response } from 'express';
import { addStudent } from '../models/StudentModel';

function getStudent(req: Request, res: Response): void {
  res.json(addStudent());
}

export default { getStudent };
