<template>
    <main>
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
                <button @click="Login()" :disabled="!enableLogin">Login</button>
        </section>
    </main>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            enableLogin: true,
            emailInput: "",
            passwordInput: "",
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        }
    },
    methods: {
        async Login() {
            if (this.checkEmail()) {
                if (await this.$store.dispatch("login", { email: this.emailInput, password: this.passwordInput })) {
                    this.emailInput = "";
                    this.passwordInput = "";
                    
                    if (this.$route.query.next) {
                        this.$router.push(this.$route.query.next);
                    }
                }
            } else {
                // setting this to false would permanently disable the login button.
                // enableLogin = false;
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