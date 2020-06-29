import { IImageVariant } from "../models/image-variant.model";

import Image, { IImage } from "../models/image.model";

interface IImageVariantInput {
  width?: IImageVariant['width'],
  height?: IImageVariant['height'],
  fit?: IImageVariant['fit'],
  quality?: IImageVariant['quality'],
  format?: IImageVariant['format']
}

export class ImageService {

  public async getOrGenerateImage(id: string, params: Partial<IImageVariantInput>) {
    const image = await this.findImage(id);


    if (Object.keys(params).length > 0) {
      // get variant
    }
  }

  private async findImage(id: string): Promise<IImage> {
      const image = await Image.findById(id).exec();

      if (!image) {
        throw new Error("Not found");
      }
      
      return image;
  }

  private async findVariant(hash: string) {

  }

  private async generateVariant() {

  }

}