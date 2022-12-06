<script lang="ts">
import { post } from "@/src/requests";
import { defineComponent } from "vue"
//import { UserRole } from "@/src/User";

export default defineComponent( {
  data() {
    return {  
        User:{
            email:'',
            password:'',
            FirstName:'',
            LastName:'',
            UserName:'',
            UserRole: 0,  
        },    
    }
  },
  methods:{
    addUser() {
      const UserDto = {
        email: this.User.email,
        password: this.User.password,
        FirstName: this.User.FirstName,
        LastName: this.User.LastName,
        UserName: this.User.UserName,
        UserRole: this.User.UserRole
      };     
     const response = post("/CreateUser", UserDto)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => console.log(error.response.request._response));
    },
  }
}
)
</script>



<template>
<form  class="AddUser">
 <input type="email" placeholder="Email address" v-model="User.email"/>
 <input type="password" placeholder="password" v-model="User.password"/>
 <input type="text" placeholder="FirstName" v-model="User.FirstName"/>
 <input type="text" placeholder="LastName" v-model="User.LastName"/>
 <input type="text" placeholder="UserName" v-model="User.UserName"/>
 <input type="number" placeholder="UserRole" v-model="User.UserRole"/>
 <button color="primary" @click="addUser"> Add User </button>
</form>
</template>

<style>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 4px;
}
button{
  background-color: rgb(38, 131, 193);
  color: white;
  border: none;
  padding: 15px 32px;
}

</style>
