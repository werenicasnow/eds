<template>
  <q-dialog ref="dialogRef" :full-width="$q.screen.lt.md" class="request-dialog">
    <q-card class="q-dialog-plugin request-dialog-card">
      <div class="request-dialog-card__header">
        {{ title }}
        <div v-if="isAgreement" class="request-dialog-card__header__subheader">
          {{ dataAgreement.employeeFio }}
        </div>
      </div>

      <q-form class="request-dialog-card__form">
        <q-card-section>
          <div class="row-form">
            <q-input v-if="!isAgreement" outlined v-model="requestData.inn" label="ИНН" />
            <div v-else class="inn-data">
              <span class="inn-data__label">Инн: </span>
              <span class="inn-data__content">{{ dataAgreement.inn }}</span>
            </div>
          </div>
          <div class="row-form base-docs row">
            <div class="block base-docs__col col-md-4">
              <q-file v-if="!isAgreement" outlined v-model="requestData.passport" label="Паспорт" @update:model-value="updatePassportFile">
                <template v-slot:append>
                  <q-avatar>
                    <img src="../../../public/icons/akar-icons_link-chain.svg">
                  </q-avatar>
                </template>
              </q-file>
              <div v-if="passportUrl">
                <a href="#" class="row-form__preview">
                  <img :src="passportUrl"/>
                  <span class="preview__content"><q-icon name="delete_outline" class="preview__btn" size="20px"/></span>
                </a>
              </div>
              <div v-if="isAgreement && dataAgreement.passport">
                <a href="#" class="row-form__preview q-mt-0">
                  <img :src="dataAgreement.passport"/>
                </a>
              </div>
            </div>
            <div class="block base-docs__col col-md-4">
              <q-file v-if="!isAgreement" outlined v-model="requestData.snils" label="СНИЛС" @update:model-value="updateSnilsFile">
                <template v-slot:append>
                  <q-avatar>
                    <img src="../../../public/icons/akar-icons_link-chain.svg">
                  </q-avatar>
                </template>
              </q-file>
              <div v-if="snilsUrl">
                <a href="#" class="row-form__preview row-form__preview">
                  <img :src="snilsUrl"/>
                  <span class="preview__content"><q-icon name="delete_outline" class="preview__btn" size="20px"/></span>
                </a>
              </div>
              <div v-if="isAgreement && dataAgreement.snils">
                <a href="#" class="row-form__preview q-mt-0">
                  <img :src="dataAgreement.snils"/>
                </a>
              </div>
            </div>
            <div class="block base-docs__col col-md-4">
              <q-file v-if="!isAgreement" outlined v-model="requestData.powerOfAttorneyMvm" label="Доверенность" @update:model-value="updatePowerOfAttorneyMvmFile">
                <template v-slot:append>
                  <q-avatar>
                    <img src="../../../public/icons/akar-icons_link-chain.svg">
                  </q-avatar>
                </template>
              </q-file>
              <div v-if="powerOfAttorneyMvmUrl">
                <a href="#" class="row-form__preview row-form__preview">
                  <img :src="powerOfAttorneyMvmUrl"/>
                  <span class="preview__content"><q-icon name="delete_outline" class="preview__btn" size="20px"/></span>
                </a>
              </div>
              <div v-if="isAgreement && dataAgreement.powerOfAttorneyMvmUrl">
                <a href="#" class="row-form__preview q-mt-0">
                  <img :src="dataAgreement.powerOfAttorneyMvmUrl"/>
                </a>
              </div>
            </div>
          </div>
          <div class="row-form">
            <q-file v-if="!isAgreement" outlined multiple v-model="requestData.otherDocs" label="Прочие документы">
              <template v-slot:append>
                <q-avatar>
                  <img src="../../../public/icons/akar-icons_link-chain.svg">
                </q-avatar>
              </template>
            </q-file>
          </div>

          <div v-if="onRejected" class="row-form">
            <q-input
              v-model="reasonReject"
              type="textarea"
              placeholder="Укажите причину отклонения заявки"
              outlined
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="request-dialog-card__actions">
          <q-btn label="Отмена" class="btn btn-default" @click="onCancelClick" />
          <q-btn v-if="!isAgreement" label="Отправить" class="btn flat btn-primary" @click="onOKClick('onSave')" :disable="!requestData.inn || !requestData.passport"/>
          <q-btn v-if="isAgreement" label="Отклонить" class="btn flat red text-white" @click="onRejected ? onOKClick('onReject') : onRejected = true"/>
          <q-btn v-if="isAgreement" label="Согласовать" class="btn flat purple text-white" @click="onOKClick('onAccept')"/>
        </q-card-actions>
      </q-form>
      </q-card>
  </q-dialog>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed } from 'vue';
  import { useDialogPluginComponent } from 'quasar'
  import { IRequestData } from 'components/models';

  export default defineComponent({
    name: 'RequestDialog',

    emits: [
      // REQUIRED; need to specify some events that your
      // component will emit through useDialogPluginComponent()
      ...useDialogPluginComponent.emits
    ],
    props: {
      title: String,
      dataAgreement: Object
    },

    setup(props) {
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

      const isAgreement = computed(() => props.dataAgreement);

      const reasonReject = ref(null);
      const onRejected = ref(false);

      return {
        // This is REQUIRED;
        // Need to inject these (from useDialogPluginComponent() call)
        // into the vue scope for the vue html template
        dialogRef,
        onDialogHide,

        // other methods that we used in our vue html template;
        // these are part of our example (so not required)
        onOKClick (oper: string) {
            // on OK, it is REQUIRED to
          // call onDialogOK (with optional payload)
          onDialogOK(oper)
          // or with payload: onDialogOK({ ... })
          // ...and it will also hide the dialog automatically
        },

        // we can passthrough onDialogCancel directly
        onCancelClick: onDialogCancel,

        requestData,
        isAgreement,
        reasonReject,
        onRejected,
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
      }
    }
  });
</script>

<style scoped lang="sass">
@import "src/css/custom.variables"

.request-dialog-card
  font-size: 16px
  border-radius: 12px
  color: $base-text-color

  &__header
    margin-top: 26px
    margin-bottom: 41px
    font-weight: 400
    font-size: 1.5rem
    line-height: 28px
    text-align: center

    &__subheader
      color: $grey-color
      font-size: 0.875rem
      font-weight: 700

  /*&__form
    .q-card__section
      margin-bottom: 30%*/

  .q-btn.disabled
    background: $disabled-color !important

  &__actions
    font-size: 0.875rem
    letter-spacing: 1.25px

  .inn-data
    &__label
      font-size: 0.75rem
      color: $grey-color
      letter-spacing: 0.25px

    &__content
      font-weight: bold
      margin-left: 7px

  .red
    background: $red-color

  .purple
    background: $purple-color

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

.row-form
  margin-bottom: 30px

  &__preview
    display: block
    position: relative
    border: 1px solid #B5B5B5
    box-sizing: border-box
    margin-top: 20px

    img
      max-width: 100%

    .preview__content
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba(0,0,0,.5)
      opacity: 0

    .preview__content:hover
      opacity: 1

    .preview__btn
      position: relative
      top: calc(50% - 10px)
      left: calc(50% - 10px)
      color: white

.base-docs
  display: flex

  &__col:not(:last-child)
    padding-right: 30px

@media (max-width: 600px)
  .request-dialog-card
    font-size: 14px

    &__form .q-card__section
        margin-bottom: 0

  .base-docs
    display: block

    &__col
      padding-right: unset !important
      margin-bottom: 30px

    .q-field
      margin-right: 0 !important
      margin-bottom: 30px !important
      color: #f2c037

@media (min-width: 1024px)
  .request-dialog-card
    width: 54%
    max-width: 54%
</style>
