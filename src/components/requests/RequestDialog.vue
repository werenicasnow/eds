<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" v-model="dialogDisplay">
    <q-card class="q-dialog-plugin">
      Карточка
      <!--
        ...content
        ... use q-card-section for it?
      -->

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useDialogPluginComponent } from 'quasar'

  export default defineComponent({
    name: 'RequestDialog',

    props: {
      showDialog: {
        readonly: false,
        type: Boolean,
        required: true
      },
    },

    emits: [
      // REQUIRED; need to specify some events that your
      // component will emit through useDialogPluginComponent()
      ...useDialogPluginComponent.emits
    ],

    setup(props) {
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
      const dialogDisplay = ref(props.showDialog);
      //watch(props.showDialog, () => dialogDisplay.value = props.showDialog);
      //watch(() => props.showDialog, () => dialogDisplay.value = props.showDialog);

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
        dialogDisplay,
      }
    }
  });
</script>

<style scoped>

</style>
