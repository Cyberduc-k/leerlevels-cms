<template>
    <main>
        <section class="login-window">
            <img class="LeerLevels-image" src="@/assets/LeerLevels_Logo_Horizontal.svg"/>
            <h1>CMS Management portal login</h1>
                <section class="pure-form pure-form-stacked">
                    <fieldset>
                        <section class="pure-control-group">
                            <label for="stacked-email" class="labelText">Email Address</label>
                            <input type="email" id="stacked-email" placeholder="Email Address" required v-model="emailInput" @input="validate"/>
                        </section>
                        <section class="pure-control-group">
                            <label for="stacked-password" class="labelText">Password</label>
                            <input type="password" id="stacked-password" placeholder="Password" required v-model="passwordInput" @input="validate" @keypress.prevent.enter="login"/>
                        </section>
                        <section class="pure-controls">
                            <button class="pure-button pure-button-primary" :disabled="!isValid" @click="login">Login</button>
                        </section>
                    </fieldset>
                </section>
        </section>
    </main>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    data() {
        return {
            isValid: false,
            emailInput: "",
            passwordInput: "",
            emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        }
    },
    beforeCreate(){
        //check if the user is still logged in and redirect to home page
        if (this.$store.state.authToken !== "") {
            this.$router.push('/');
        }
    },
    methods: {
        validate() {
            this.isValid = this.checkEmail() && this.passwordInput !== "";
        },
        async login() {
            if (this.checkEmail()) {
                if (await this.$store.dispatch("login", { email: this.emailInput, password: this.passwordInput })) {
                    this.emailInput = "";
                    this.passwordInput = "";
                    
                    if (this.$route.query.next) {
                        this.$router.push(this.$route.query.next);
                    } else {
                        this.$router.push("/");
                    }
                }
            } else {
                console.log("the email address could not be validated");
            }
        },
        checkEmail() {
            //this will return true if the input is not empty and matches the regular expression of a valid email address, otherwise it returns false
            return !!((this.emailInput === "") ? "" : !!(this.emailRegex.test(this.emailInput)));
        },
    }
});
</script>

<style scoped>

main {
    min-height: calc(100vh - 0.5em);
    max-width: none;
    padding: 0.25em 0.5em 0.25em 0.5em;
    background-color: #b9b8b8;
}

.login-window {
    margin: 40px auto;
    width: 700px;
    padding: 3em;
    background-color: white;
    border-radius: 25px;
}

.LeerLevels-image {
    width: 455px;
}

h1 {
    font-size: 2em;
    margin: 0.5em 0;
    font-family: revert;
}

.pure-form, .pure-control-group, .pure-controls {
    margin: 1em 0;
}

.labelText {
    margin-bottom: 0.85em;
}

#stacked-email, #stacked-password {
    width: 57%;
}
</style>