import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt } from "graphql";

const ImageVariantType = new GraphQLObjectType({
  name: 'ImageVariant',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    path: { type: GraphQLNonNull(GraphQLString) },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    resize: { type: GraphQLString },
    quality: { type: GraphQLInt },
    format: { type: GraphQLString },
  })
});

export default ImageVariantType;
