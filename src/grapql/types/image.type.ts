import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql";
import ImageVariantType from "./image-variant.type";

const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    path: { type: GraphQLNonNull(GraphQLString) },
    mimeType: { type: GraphQLNonNull(GraphQLString) },
    variants: { type: new GraphQLList(ImageVariantType) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
  })
});

export default ImageType;