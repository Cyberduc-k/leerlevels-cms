<script lang="ts">
import { post } from "@/src/requests";
import { defineComponent } from "vue"

export default defineComponent( {
  data() {
    return { 
        Forum:{
        forumId: '',
        title: '',
        description: '',
        }      
    }
  },
  methods:{
    addForum() {
      const forumDto = {
         forumId: this.Forum.forumId,
         title : this.Forum.title,
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
 <input type="text" placeholder="title" v-model="Forum.title"/>
 <input type="text" placeholder="description" v-model="Forum.description"/>
 <button color="primary" @click="addForum"> add Forum </button>
</form>
</template>