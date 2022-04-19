import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import { I_SearchDocument } from '../models/search.model';
import * as searchServices from '../services/search.service';
import { editSearchKeyWords } from '../utils/puppeteer.util';

export async function addOne(req: Request, res: Response) {
  try {
    const result = await searchServices.add(req.body);
    res.status(200).send('Search word is inserted to DB successfully');
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const searchWords = await searchServices.all();
    return res.status(200).send(searchWords);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}

export async function deleteOne(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await searchServices.deleteById({ _id: id });
    if (result) {
      res.status(200).send('Deleted successfully');
    } else {
      res.status(404).send('Search word is not found');
    }
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}
