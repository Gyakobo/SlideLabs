<template>
  <div class="wrapper">
    <div class="content">
        <form action="" class="RegAuthForm" @submit.prevent="submitHandler">
          <div :class="v$.email.$error ? 'is-invalid':'input_field'">
            <input  type="text"
                    class="validate"
                    placeholder="Email"
                    v-model="email">
          </div>
          <p v-for="error of v$.email.$errors" :key="error.$uid" class="invalid-feedback">
            {{error.$message}}
          </p>
          <div :class="v$.password.$error ? 'is-invalid':'input_field'">

            <input  type="password"
                    class="validate"
                    placeholder="Пароль"
                    v-model="password"
                    v-show="!showPass">
            <input  type="text"
                    class="validate"
                    placeholder="Пароль"
                    v-model="password"
                    v-show="showPass">


            <img src="../assets/img/eye/close.png" v-show="!showPass" @click="showPass=!showPass" >
            <img src="../assets/img/eye/open.png" v-show="showPass" @click="showPass=!showPass" >
          </div>
         <p v-for="error of v$.password.$errors" :key="error.$uid" class="invalid-feedback">
            {{error.$message}}
          </p>
          <button  class="SubmitBtn" type="submit">
            Войти
          </button>
        </form>
      <div class="Ref">
        <router-link class="link" to="/ForgotPass">Забыли пароль?</router-link>
        <p>Нет аккаунта?</p>
        <router-link class="link" to="/Registration">Зарегистрироваться</router-link>
      </div>

      </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email} from '@vuelidate/validators'

export default {
  name: "Login",
  data:()=>({
    password:'',
    email:'',
    showPass:false
  }),
  validations(){
    return{
      email:{
        required,
        email,
        $message:'Обязательное поле'
      },
      password:{
        required
      }
    }
  },
  setup: () => ({ v$: useVuelidate() }),
  methods:{
    submitHandler(){
      this.v$.$touch()
      if (!this.v$.$error)
      {
        alert('Successfull validation!!!')
      }
    }
  }
}
</script>

<style scoped>
.RegAuthForm{
  position: relative;
  width:60%;
  display: block;
  margin-right: auto;
  margin-left: auto;
  margin-top: 15%;
}
.input_field{
  border: 1px solid black;
  width: 100%;
  height: 8%;
  margin: 10px 0 10px 0;
  border-radius: 3px;
  justify-content: space-between;
  display: flex;
}
.input_field img{
  width:5%;
  height: auto;
  background-color: white;
  margin: 10px 10px 10px 0px;
}
.is-invalid img{
  width:5%;
  height: auto;
  background-color: white;
  margin: 10px 10px 10px 0px;
}
.is-invalid{
  border: 1px solid red;
  width: 100%;
  height: 8%;
  margin: 10px 0 10px 0;
  border-radius: 3px;
  justify-content: space-between;
  display: flex;
}
.invalid-feedback{
  color:red
}
.validate{
 height: 100%;
  width: 100%;
  font-size: calc(1vw + 1vh + 1vmin);
  padding: 10px 0 10px 10px;
  color:#8B8B8B;
}
.SubmitBtn{
  width: 100%;
  height: 8%;
  margin: 10px 0 10px 0;
  padding: 10px 0 10px 0;
  color:white;
  background-color: #43A397;
  font-weight: bold;
  font-size: calc(1vw + 1vh + 1vmin);
  border-radius: 3px;
}
.SubmitBtn:hover{
  background-color:#3F9A8F;
  cursor: pointer;
}
input{
  outline: none;
}
.Ref{
  display: block;
  width: 100%;
  margin: 10px 0 10px 0;
  text-align: center;
  font-size: 20px;
  color:#8B8B8B;
  border-bottom: 1px solid black;
  font-weight: bold;
  padding-bottom: 10px;
}
.Ref p{
  margin-top: 5%;
}
.link{
  color:#43A397;
}
</style>