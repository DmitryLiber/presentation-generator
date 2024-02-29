<script>
import { API } from '../utils'

export default {
  methods: {
    async authentication(e) {
      e.preventDefault()

      const ft = new FormData(e.target)
      const data = [...ft].map(([name, value]) => `${name}=${value}`).join('&')
      const response = await API.get('&' + data)

      if (response) {
        if (response.status === 401) {
          alert(response.msg)
          return
        }

        if (response.status === 201) {
          sessionStorage.setItem('access_token', response.msg)
          window.location = '/'
        }
      } else {
        alert('Ошибка: ' + response.status)
      }
    }
  }
}
</script>

<template>
  <main class="container">
    <form class="form" @submit="(e) => authentication(e)">
      <legend class="form__title">Авторизация</legend>
      <div class="form-field">
        <label class="form-field__label" for="login">Логин</label>
        <input class="form-field__input" type="login" id="login" name="login" />
      </div>
      <div class="form-field">
        <label class="form-field__label" for="password">Пароль</label>
        <input class="form-field__input" type="password" id="password" name="password" />
      </div>
      <button type="submit" class="btn btn--gap btn--centered">Авторизоваться</button>
    </form>
  </main>
</template>

<style lang="scss">
.form {
  background-color: #f1f1f1;
  border-radius: 20px;
  padding: 50px;
  max-width: 500px;
  margin: 0 auto;

  &__title {
    text-align: center;
    font-weight: 600;
    margin-bottom: 20px;
    font-size: 22px;
  }
}

.form-field {
  &:not(:last-child) {
    margin-bottom: 15px;
  }

  &__label {
    margin-bottom: 10px;
    display: block;
    font-weight: 500;
    font-style: 18px;
  }

  &__input {
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #222;
    padding: 10px 20px;
    font-size: 18px;
    line-height: 1;
  }
}
</style>
