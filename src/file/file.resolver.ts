import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FileUpload } from "graphql-upload";
import {GraphQLUpload} from "apollo-server-express"
import { createWriteStream,unlinkSync } from 'fs';
import {FileType} from "./file.type"
@Resolver()
export class FileResolver {
  @Mutation(() => FileType)
  async uploadImage(@Args({name: 'file', type: () => GraphQLUpload }) file: FileUpload )
  {
     const { createReadStream, filename } = await file 
      const filepath=`./uploads/avatars/${Math.floor(Math.random() * 1000)}-${filename}`
      return new Promise(async (resolve, reject) => 
      createReadStream(filename)
          .pipe(createWriteStream(filepath,"utf-8"))
          .on('finish', () => resolve({path:filepath}))
          .on('error', () => reject({error:"error uploading file!"}))
        );
  }

  @Mutation(() => FileType)
  async uploadFile(@Args({name: 'file', type: () => GraphQLUpload }) file: FileUpload )
  {
     const { createReadStream, filename } = await file 
      const filepath=`./uploads/justifications/${Math.floor(Math.random() * 1000)}-${filename}`
      return new Promise(async (resolve, reject) => 
      createReadStream(filename)
          .pipe(createWriteStream(filepath,"utf-8"))
          .on('finish', () => resolve({path:filepath}))
          .on('error', () => reject({error:"error uploading file!"}))
        );
  }

  @Mutation(()=>String)
  async removeAvatar(@Args({name:"path" , type: () => String}) path)
  {
     try
     {
      unlinkSync(`.${path}`)
      return "file removed"
     }
     catch(err)
     {
      return "error removing file"
     }
  }

}