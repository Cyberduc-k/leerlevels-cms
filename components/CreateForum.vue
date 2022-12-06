<script lang="ts">
import { post } from "@/src/requests";
import { defineComponent } from "vue"

export default defineComponent( {
  data() {
    return { 
        Forum:{
        forumId: '',
        forumTitle: '',
        description: '',
        }      
    }
  },
  methods:{
    addForum() {
      const forumDto = {
         forumId: this.Forum.forumId,
         forumTitle : this.Forum.forumTitle,
         description : this.Forum.description
      };     
       const response =post("/CreateForum", forumDto)
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
<form  class="addForum">
 <input type="text" placeholder="forumId" v-model="Forum.forumId"/>
 <input type="text" placeholder="title" v-model="Forum.forumTitle"/>
 <input type="text" placeholder="description" v-model="Forum.description"/>
 <button color="primary" @click="addForum"> add Forum </button>
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
  padding: 15px 32px;

}

</style>
