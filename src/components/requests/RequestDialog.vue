<template>
  <q-dialog ref="dialogRef" :full-width="$q.screen.lt.md" class="request-dialog">
    <q-card class="q-dialog-plugin request-dialog-card">
      <div class="request-dialog-card__header">Заявка на выпуск ЭЦП</div>

      <q-form class="request-dialog-card__form">
        <q-card-section>
          <div class="row-form">
            <q-input outlined v-model="requestData.inn" label="ИНН" />
          </div>
          <div class="row-form base-docs">
            <div class="block base-docs__col">
              <q-file outlined v-model="requestData.passport" label="Паспорт" @update:model-value="updatePassportFile">
                <template v-slot:append>
                  <q-avatar>
                    <img src="../../../public/icons/akar-icons_link-chain.svg">
                  </q-avatar>
                </template>
              </q-file>
              <div v-if="passportUrl" class="row-form__preview">
                <img :src="passportUrl">
              </div>
            </div>
            <div class="block base-docs__col">
              <q-file outlined v-model="requestData.snils" label="СНИЛС" @update:model-value="updateSnilsFile">
                <template v-slot:append>
                  <q-avatar>
                    <img src="../../../public/icons/akar-icons_link-chain.svg">
                  </q-avatar>
                </template>
              </q-file>
              <div v-if="snilsUrl" class="row-form__preview">
                <img :src="snilsUrl">
              </div>
            </div>
            <div class="block base-docs__col">
              <q-file outlined v-model="requestData.powerOfAttorneyMvm" label="Доверенность" @update:model-value="updatePowerOfAttorneyMvmFile">
                <template v-slot:append>
                  <q-avatar>
                    <img src="../../../public/icons/akar-icons_link-chain.svg">
                  </q-avatar>
                </template>
              </q-file>
              <div v-if="powerOfAttorneyMvmUrl" class="row-form__preview">
                <img :src="powerOfAttorneyMvmUrl">
              </div>
            </div>
          </div>
          <div class="row-form">
            <q-file outlined multiple v-model="requestData.otherDocs" label="Прочие документы">
              <template v-slot:append>
                <q-avatar>
                  <img src="../../../public/icons/akar-icons_link-chain.svg">
                </q-avatar>
              </template>
            </q-file>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Отмена" class="btn btn-default" @click="onCancelClick" />
          <q-btn label="Отправить" class="btn btn-primary" @click="onOKClick" :disable="!requestData.inn || !requestData.passport"/>
        </q-card-actions>
      </q-form>
      </q-card>
  </q-dialog>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { useDialogPluginComponent } from 'quasar'
  import { IRequestData } from 'components/models';

  export default defineComponent({
    name: 'RequestDialog',

    emits: [
      // REQUIRED; need to specify some events that your
      // component will emit through useDialogPluginComponent()
      ...useDialogPluginComponent.emits
    ],

    setup() {
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
      const requestData: IRequestData = reactive({
        inn: null,
        passport: null,
        snils: null,
        powerOfAttorneyMvm: null,
        otherDocs: null
      });
      const passportUrl = ref('');
      const snilsUrl = ref('');
      const powerOfAttorneyMvmUrl = ref('');

      return {
        // This is REQUIRED;
        // Need to inject these (from useDialogPluginComponent() call)
        // into the vue scope for the vue html template
        dialogRef,
        onDialogHide,

        // other methods that we used in our vue html template;
        // these are part of our example (so not required)
        onOKClick () {
            // on OK, it is REQUIRED to
          // call onDialogOK (with optional payload)
          onDialogOK()
          // or with payload: onDialogOK({ ... })
          // ...and it will also hide the dialog automatically
        },

        // we can passthrough onDialogCancel directly
        onCancelClick: onDialogCancel,


        requestData,

        passportUrl,
        snilsUrl,
        powerOfAttorneyMvmUrl,
        updatePassportFile() {
          if (requestData.passport) {
            passportUrl.value = URL.createObjectURL(requestData.passport)
          }
        },
        updateSnilsFile() {
          if (requestData.snils) {
            snilsUrl.value = URL.createObjectURL(requestData.snils)
          }
        },
        updatePowerOfAttorneyMvmFile() {
          if (requestData.powerOfAttorneyMvm) {
            powerOfAttorneyMvmUrl.value = URL.createObjectURL(requestData.powerOfAttorneyMvm)
          }
        },
        change() {
          console.log('change');
        }
      }
    }
  });
</script>

<style scoped lang="sass">
@import "src/css/custom.variables"

.request-dialog-card
  font-size: 16px
  border-radius: 12px

  &__header
    margin-top: 26px
    margin-bottom: 41px
    font-weight: 400
    font-size: 1.5rem
    line-height: 28px
    text-align: center
    color: $base-text-color

  /*&__form
    .q-card__section
      margin-bottom: 30%*/

  .q-btn.disabled
    background: $disabled-color !important

.btn
  justify-content: center
  align-items: center
  padding: 9px 27px
  border-radius: 4px
  font-style: normal
  font-weight: bold
  font-size: 0.875rem
  line-height: 16px
  letter-spacing: 1.25px
  text-transform: uppercase

.btn:before
  box-shadow: none

.btn-primary
  background: $purple-color !important
  color: white !important

.btn-default
  background: white
  color: $base-text-color

.row-form
  margin-bottom: 30px

  &__preview img
    border: 1px solid #B5B5B5
    box-sizing: border-box
    max-width: 184px
    margin-top: 20px
    overflow: hidden

.base-docs
  display: flex

  &__col:not(:last-child)
    margin-right: 30px

@media (max-width: 600px)
  .request-dialog-card
    font-size: 14px

    &__form .q-card__section
        margin-bottom: 0

  .base-docs
    display: block

    .q-field
      margin-right: 0 !important
      margin-bottom: 30px !important
      color: #f2c037

@media (min-width: 1024px)
  .request-dialog-card
    width: 54%
    max-width: 54%
</style>
