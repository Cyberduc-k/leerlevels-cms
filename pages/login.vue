<template>
    <main v-show="!isLoggedIn">
        <section class="loginWindow">
            <h1>LeerLevels CMS<br>management portal login</h1>
                <section class="loginRow">
                    <label class="textlabels">email address</label>
                    <section class="inputSection">
                        <input class="loginInput" type="text" v-model="emailInput"/>
                    </section>
                </section>

                <section class="loginRow">
                    <label class="textlabels">password</label>
                    <section class="inputSection">
                        <input class="loginInput" type="password" v-model="passwordInput"/>
                    </section>
                </section>
                <button @click="Login()">Login</button>
        </section>
    </main>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            isLoggedIn: false,
            emailInput: "",
            passwordInput: "",
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        }
    },
    methods: {
        Login(){
            if(this.checkEmail()) {
                this.$store.dispatch("login", { email: this.emailInput, password: this.passwordInput });
                this.emailInput = "";
                this.passwordInput = "";
            } else {
                console.log("the email address could not be validated");
            }

        },
        checkEmail() {
            //this will return true if the input is not empty and matches the regular expression of a valid email address, otherwise it returns false
            return !!((this.emailInput === "") ? "" : !!(this.regex.test(this.emailInput)));
        },
    }
}
</script>

<style scoped>
.loginWindow {
    margin: 40px 400px;
}
.loginRow{
    margin: 20px 0;
}
.inputSection {
    margin: 10px 0;
}
.loginInput{
    height: 1.6em;
}

.textlabels{
    font-size: 1.5em;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: left;
}
</style>