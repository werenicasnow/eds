<template>
  <div class="container">
    <div class="header">Корпоративный удостоверяющий центр</div>

    <div class="sub-header">Заявки и ЭЦП</div>

    <div class="request-card eds">
      <div class="request-card__header">Электронные ключи</div>

      <div class="request-card__list">
        <q-list>
          <q-expansion-item
            switch-toggle-side
            expand-icon-toggle
            expand-separator1
            expand-icon="chevron_right"
            expanded-icon="expand_more"
          >
            <template v-slot:header>
              <q-item-section>
                ЭЦП КЛЮЧ 2
              </q-item-section>

              <q-item-section side class="green-color">
                Действующий сертификат
              </q-item-section>
            </template>

            <q-card>
              <q-card-section class="info">
                <div class="row">
                  <div class="col-6 col-md-6 col-sm-8">
                    <div class="row">
                      <div class="col">Владелец:</div>
                      <div class="col text-bold">Иванов Иван Иванович</div>
                    </div>
                    <div class="row">
                      <div class="col">Карточка доступа к МВС:</div>
                      <a href="#" class="col link">Ссылка</a>
                    </div>
                    <div class="row">
                      <div class="col">Серийный номер:</div>
                      <div class="col serial">tyuhgj546l755j88mg57789l</div>
                    </div>
                  </div>

                  <div class="col-6 col-md-6 col-sm-4 text-right">
                    <span>Действителен: </span>
                    <span class="text-bold">с 01.01.2022 по 01.01.2023</span>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            switch-toggle-side
            expand-icon-toggle
            expand-separator
            expand-icon="chevron_right"
            expanded-icon="expand_more"
          >
            <template v-slot:header>
              <q-item-section>
                ЭЦП КЛЮЧ 1
              </q-item-section>

              <q-item-section side class="red-color">
                Истек срок сертификата
              </q-item-section>
            </template>
            <q-card>
              <q-card>
                <q-card-section class="info">
                  <div class="row">
                    <div class="col-6 col-md-6 col-sm-8">
                      <div class="row">
                        <div class="col">Владелец:</div>
                        <div class="col text-bold">Иванов Иван Иванович</div>
                      </div>
                      <div class="row">
                        <div class="col">Карточка доступа к МВС:</div>
                        <a href="#" class="col link">Ссылка</a>
                      </div>
                      <div class="row">
                        <div class="col">Серийный номер:</div>
                        <div class="col serial">tyuhgj546l755j88mg57789l</div>
                      </div>
                    </div>

                    <div class="col-6 col-md-6 col-sm-4 text-right">
                      <span>Действителен: </span>
                      <span class="text-bold">с 01.01.2022 по 01.01.2023</span>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>

    <div class="request-card">
      <div class="request-card__header">
        Заявки на выдачу ЭЦП
        <q-btn class="btn new_request-btn" label="Заявка" icon="add" @click="showDialog"/>
      </div>

      <div class="request-card__list">
        <q-list>
          <q-expansion-item
            switch-toggle-side
            expand-icon-toggle
            expand-separator1
            expand-icon="chevron_right"
            expanded-icon="expand_more"
          >
            <template v-slot:header>
              <q-item-section>
                Заявка на выпуск сертификата
              </q-item-section>

              <q-item-section side class="green-color">
                <span class="status green-bgr">Сертификат выпущен</span>
              </q-item-section>
            </template>

            <q-card>
              <q-card-section class="info">
                ...
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            switch-toggle-side
            expand-icon-toggle
            expand-separator
            expand-icon="chevron_right"
            expanded-icon="expand_more"
          >
            <template v-slot:header>
              <q-item-section>
                Заявка на выпуск сертификата
              </q-item-section>

              <q-item-section side>
                <span class="status dark-red-bgr">Отклонена</span>
              </q-item-section>
            </template>
            <q-card>
              <q-card>
                <q-card-section class="info">
                  ...
                </q-card-section>
              </q-card>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </div>

  <RequestDialog v-model="isShowDialog" @submit="save"/>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import RequestDialog from 'components/requests/RequestDialog.vue';

  export default defineComponent({
    name: 'Requests',
    setup() {
      const isShowDialog = ref(false);


      return {
        isShowDialog,
        showDialog: () => isShowDialog.value = true,
        save: () => { console.log('save form') }
      }
    },
    components: { RequestDialog },
  });
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap')

@import "src/css/custom.variables"

.container
  background: #F8F8F9
  padding: 17px
  font-family: Roboto, sans-serif
  font-style: normal
  font-weight: normal
  font-size: 16px
  height: 100vh
  color: $base-text-color

.header
  /*height: 56px*/
  border: 1px solid rgba(0, 0, 0, 0.25)
  box-sizing: border-box
  border-radius: 12px
  display: flex
  align-items: center
  font-weight: 300
  font-size: 1.5rem
  color: rgba(0, 0, 0, 0.87)
  padding: 10px 21px
  margin-bottom: 40px

.sub-header
  font-size: 0.875rem
  font-weight: 400
  text-align: center
  letter-spacing: 0.25px
  color: $purple-color
  flex: none
  order: 0
  flex-grow: 0
  margin: 43px 0 39px 18px
  padding: 0 6px 10px 6px
  border-bottom: 2px solid $purple-color
  border-left: 6px
  border-right: 6px
  line-height: 20px
  width: fit-content

.request-card
  margin-bottom: 34px

  &__header
    font-weight: 500
    font-size: 1.125rem
    line-height: 20px
    letter-spacing: 0.25px
    margin-bottom: 24px
    text-align: left

    .new_request-btn
      background: $purple-color
      color: white
      margin-left: 22px
      border-radius: 4px
      font-weight: bold
      font-size: 0.875rem
      line-height: 16px
      letter-spacing: 1.25px
      text-transform: uppercase
      padding: 15px

  &__list
    .q-expansion-item
      background: #FFFFFF
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25)
      border-radius: 12px
      margin-bottom: 17px

    .q-item__section
      font-weight: 500
      font-size: 0.75rem
      line-height: 24px
      letter-spacing: 1.25px
      text-transform: uppercase

    .info
      line-height: 24px
      text-transform: capitalize

      .link
        color: #796DD4
        text-decoration: none

      .serial
        color: #707070

      .row
        margin-bottom: 16px

    .status
      color: white
      border-radius: 12px
      padding: 8px 10px

  .green-color
    color: $green-color

  .red-color
    color: #FF5F5F

  .green-bgr
    background: $green-color

  .dark-red-bgr
    background: #D62828

  .btn:hover
    opacity: 0.9

@media (max-width: 600px)
  .container
    font-size: 12px

  .request-card
    .q-item__section
      letter-spacing: 0

    .new_request-btn
      margin-top: 20px

    .request-card__list
      .status
        padding: 4px 5px
</style>
