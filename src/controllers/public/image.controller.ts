import { Request, Response } from  "express";
import fs from "fs";
import mongoose from "mongoose";
import sharp from "sharp";

import Image from "../../models/image.model";
import { IImageVariant } from "../../models/image-variant.model";
import { CreateImageVariant } from "./image-variant.controller";

interface IImageVariantInput {
  width?: IImageVariant['width'],
  height?: IImageVariant['height'],
  fit?: IImageVariant['fit'],
  quality?: IImageVariant['quality'],
  format?: IImageVariant['format']
}

export async function GetImage(req: Request, res: Response) {
  const { id } = req.params;

  const image = await Image.findById(id).exec();

  console.log(image);

  if (!image) {
    res.send('Fail');
    return;
  }

  const { width, height, fit, quality, format }: IImageVariantInput = req.query;

  if (width || height || fit || quality || format) {
    console.log(width);

    const variant = image.variants.find((variant) => variant.height == height && variant.width == width);

    if (variant) {
      const img = fs.readFileSync(variant.path, 'binary');
      res.setHeader('Content-Type', image.mimeType);
      res.end(img, 'binary');
      return;
    } else {
      const options = {
        width: width ? parseInt(width, 10) : undefined,
        height: height ? parseInt(height, 10) : undefined
      };
      const img = fs.readFileSync(image.path);
  
      const newImg = await sharp(img)
        .resize({ ...options })
        .toBuffer();

      const _id = mongoose.Types.ObjectId();

      const path = `./static/generateds/${_id}`;

      await CreateImageVariant({ imageId: id, variantId: _id, path, width, height, fit, quality, format });

      fs.writeFileSync(path, newImg);
      res.setHeader('Content-Type', image.mimeType);
      res.end(newImg, 'binary');
      return;
    }
  }
  
  const img = fs.readFileSync(image.path);
  res.setHeader('Content-Type', image.mimeType);
  res.end(img, 'binary');
}