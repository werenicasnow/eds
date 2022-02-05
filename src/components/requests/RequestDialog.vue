<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form @submit="$emit('submit')">
        <q-card-section>
          Форма
        </q-card-section>
        <!--
          ...content
          ... use q-card-section for it?
        -->

        <!-- buttons example -->
        <q-card-actions align="right">
          <q-btn label="Отмена" class="btn btn-default" @click="onCancelClick" />
          <q-btn label="Отправить" class="btn btn-primary" type="submit" @click="onOKClick" />
        </q-card-actions>
      </q-form>
      </q-card>
  </q-dialog>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDialogPluginComponent } from 'quasar'

  export default defineComponent({
    name: 'RequestDialog',

    emits: [
      // REQUIRED; need to specify some events that your
      // component will emit through useDialogPluginComponent()
      ...useDialogPluginComponent.emits
    ],

    setup() {
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

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
      }
    }
  });
</script>

<style scoped lang="sass">
@import "src/css/custom.variables"

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
</style>
