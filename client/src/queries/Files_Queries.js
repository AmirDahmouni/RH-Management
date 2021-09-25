
import gql from "graphql-tag";

export const UPLOAD_IMG=gql `mutation ($file:Upload!) { uploadImage(file: $file) {path error} }`;

export  const AVATAR_DELETE=gql`mutation removeAvatar($path:String!){ removeAvatar(path:$path) }`