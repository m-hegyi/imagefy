import express from 'express';
import connect from './connect';
import expressGraphQL from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLID } from 'graphql';
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import userModels from './models/user.models';
import userController from './controllers/user.controller';
import petModels from './models/pet.models';
import petController from './controllers/pet.controller';
import { GetImage } from './controllers/public/image.controller';
import { UploadImage, RemoveImage } from './controllers/api/image.controller';
import ImageType from './grapql/types/image.type';
import imageModel from './models/image.model';

const app = express();

const PORT = process.env.PORT || 5000;

const db = 'mongodb://localhost/imgs';

connect({db});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    images: {
      type: new GraphQLList(ImageType),
      description: 'List of images',
      resolve: () => imageModel.find()
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(fileUpload({
  createParentPath: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.get('/images/:id', GetImage);

app.post('/api/upload-image', UploadImage);

app.delete('/api/images/:id', RemoveImage);


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
