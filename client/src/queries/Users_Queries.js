import gql from "graphql-tag";

export const USER_LOGIN=gql`
query ($email:String! $password:String!){
login(loginInput:{email:$email,password:$password}) 
{ user  {_id username email admin surname holiday telephone name work departement position avatar} token } 
}`;

export const USER_UPDATE_PASSWORD=gql`
mutation updateUserPassword($oldpassword:String! $newpassword:String!)
{
  updateUserPassword(UpdatePasswordInput:{oldPassword:$oldpassword,newPassword:$newpassword})
     {_id username email admin surname holiday telephone name work departement position avatar} 
}`;

export const USER_UPDATE=gql`
mutation updateUser($username:String! $surname:String! $avatar:String $email:String! $name:String! $telephone:String! $departement:String $work:String $position:String)
{
  updateUser(UpdateUserInput:{username:$username,surname:$surname,avatar:$avatar,,email:$email,name:$name,
                              telephone:$telephone,departement:$departement,work:$work,position:$position})
  {_id username email admin surname holiday telephone name work departement position avatar} 
}`;

export const USERS_LIST=gql`query
{ 
    getUsers
    {_id username email name surname avatar telephone work position departement holiday holidays { start end state type}  }
}`;

export const USER_UPDATE_BYID=gql`
mutation updateUserById($id:String! $username:String $name:String! $surname:String! $avatar:String
 $position:String! $departement:String! $work:String! $telephone:String! $email:String!) {
 updateUserById(UpdateUserInput:{
   id:$id,
   username:$username,
   name:$name,
   surname:$surname,
   avatar:$avatar,
   position:$position,
   departement:$departement,
   work:$work,
   telephone:$telephone,
   email:$email
})
{_id avatar username name telephone departement position work holiday holidays {_id start end state type }}
}`;

export const USER_REGISTER=gql`
mutation addUser($username:String! $password:String! $name:String! $surname:String! $avatar:String
  $position:String! $departement:String! $work:String! $telephone:String! $email:String! ){
    addUser(UserInput:{
    username:$username,
    password:$password,
    name:$name,
    surname:$surname,
    admin:false,
    holiday:false,
    position:$position,
    departement:$departement,
    work:$work,
    telephone:$telephone,
    email:$email,
    avatar:$avatar        
              })
  {_id avatar username name surname telephone departement position work holiday holidays {_id start end state type }}
}`;

export const USER_DELETE=gql` mutation deleteUser($userid:String!) { deleteUser(userid:$userid) {  _id}   }`;