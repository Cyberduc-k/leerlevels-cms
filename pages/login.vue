<template>
    <main>
        <section class="login-window">
            <img class="LeerLevels-image" src="@/assets/LeerLevels_Logo_Horizontal.svg"/>
            <h1>CMS Management portal login</h1>
                <section class="pure-form pure-form-stacked">
                    <fieldset>
                        <section class="pure-control-group">
                            <label for="stacked-email" class="labelText">Email Address</label>
                            <input type="email" id="stacked-email" placeholder="Email Address" required="" v-model="emailInput"/>
                        </section>
                        <section class="pure-control-group">
                            <label for="stacked-password" class="labelText">Password</label>
                            <input type="password" id="stacked-password" placeholder="Password" required="" v-model="passwordInput"/>
                        </section>
                        <section class="pure-controls">
                            <button class="pure-button pure-button-primary" @click="Login()">Login</button>
                        </section>
                    </fieldset>
                </section>
        </section>
    </main>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            emailInput: "",
            passwordInput: "",
            emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
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

                console.log("the email address could not be validated");
            }

        },
        checkEmail() {
            //this will return true if the input is not empty and matches the regular expression of a valid email address, otherwise it returns false
            return !!((this.emailInput === "") ? "" : !!(this.emailRegex.test(this.emailInput)));
        },
    }
}
</script>

<style scoped>

.body {
    background-color: gray;
}

main {
    max-width: none;
    padding: 0.25em 0.5em 22.4em 0.5em;
    background-color: gray;
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