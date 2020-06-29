import { Request, Response } from "express";

export async function GetImageFile(req: Request, res: Response) {
  const { id } = req.params;

  // route check

  // service? get the correct image file

  const mimeType = 'image/png';

  res.setHeader('Content-Type', mimeType);
  res.end('', 'binary');
}