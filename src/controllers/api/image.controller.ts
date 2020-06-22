import { Request, Response } from "express";
import fs from "fs";
import mongoose from "mongoose";
import Image from '../../models/image.model';

const { promises: fsPromise } = fs;

export async function UploadImage(req: Request, res: Response) {
  if (!req.files) {
    console.log(req.files);
    res.send('No image!');
    return;
  }

  const { image: imageFile } = req.files;

  const _id = mongoose.Types.ObjectId();

  const path = `./static/originals/${_id}`;

  imageFile.mv(path);

  const img = new Image({ _id });

  img.name = imageFile.name;
  img.path = path;
  img.mimeType = imageFile.mimetype;

  img.save();

  res.send({
    status: true,
    data: {
      name: imageFile.name,
      mimetype: imageFile.mimetype,
      size: imageFile.size
    }
  })
};

export async function RemoveImage(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    res.send('No id!');
    return;
  }

  const img = await Image.findById(id);

  if (!img) {
    res.send('No img');
    return;
  }

  if (img.variants) {
    img.variants.forEach( async (variant) => {
      // variant.path;
      try {
        await fsPromise.unlink(variant.path);
      } catch (e) {
        console.log(e);
      }
    })
  }

  try {
    await fsPromise.unlink(img.path);
  } catch (e) {
    console.log(e);
  }

  img.remove();
  res.send('OK');

  console.log(img);
}