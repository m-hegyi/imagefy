import { IImageVariant } from '../models/image-variant.model';

interface IVariantHash {
  version: string;
  width?: IImageVariant['width'];
  height?: IImageVariant['height'];
  fit?: IImageVariant['fit'];
  quality?: IImageVariant['quality'];
  format?: IImageVariant['format'];
  mimeType?: IImageVariant['mimeType'];
};

export interface IVariantHashV1 extends IVariantHash {
};


export const generate = <T extends IVariantHash>(variantOptions: T): string => {
  let hash = '';

  const { version, width, height, fit, quality, format, ...rest } = variantOptions;

  // hash -> version | width | height | fit | quailty | format | others
  hash += parseInt(version, 10).toString(36).padStart(2, '0');
  hash += width ? parseInt(width, 10).toString(36).padStart(8, '0') : '00000000';
  hash += height ? parseInt(height, 10).toString(36).padStart(8, '0') : '0000000';
  hash += fit ? parseInt(fit, 10).toString(36).padStart(2, '0') : '00';
  hash += format ? parseInt(format, 10).toString(36).padStart(2, '0') : '00';

  return hash;
};


// const tmp: IVariantHashV1 = {
//   version: '1',
//   center: 'asd',
//   width: '120',
//   height: '123',
//   fit: 'contain',
//   quality: '90',
// };