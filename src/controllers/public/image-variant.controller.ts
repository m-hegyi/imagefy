import ImageVariant, { IImageVariant } from '../../models/image-variant.model';
import Image from '../../models/image.model';
import mongoose from 'mongoose';

interface ICreateImageVariantInput {
  imageId: string,
  variantId: mongoose.Types.ObjectId,
  path: IImageVariant['path'],
  hash: IImageVariant['hash'],
  width?: IImageVariant['width'],
  height?: IImageVariant['height'],
  fit?: IImageVariant['fit'],
  quality?: IImageVariant['quality'],
  format?: IImageVariant['format']
}

export async function CreateImageVariant({ imageId, variantId, path, hash, width, height, fit, quality, format}: ICreateImageVariantInput): Promise<IImageVariant> {
  const image = await Image.findById(imageId).exec();

  if (!image) {
    throw new Error("No image found");
  }

  const variant = new ImageVariant({ id: variantId, path, hash, width, height, fit, quality, format });

  image.variants.push(variant);

  await image.save();

  return variant;
}
