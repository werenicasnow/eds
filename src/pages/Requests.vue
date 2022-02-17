<template>
  <div class="container">
    <q-checkbox v-model="isAdmin" label="Администратор (временное служебное поле)"></q-checkbox>
    <div class="header">Корпоративный удостоверяющий центр</div>

    <div class="tabs">
      <q-tabs v-model="activeTab">
        <q-tab name="requests" label="Заявки и ЭЦП" v-if="!isAdmin"/>
        <template v-if="isAdmin">
          <q-tab name="requestsAdmin" label="Заявки" />
          <q-tab name="tasks" label="Задачи">
            <q-badge color="red" rounded floating>2</q-badge>
          </q-tab>
        </template>
      </q-tabs>
    </div>

    <div v-if="activeTab === 'requests'">
      <div class="request-card">
        <div class="request-card__header">Электронные ключи</div>

        <div class="request-card__list">
          <q-list>
            <q-expansion-item
              v-for="digitalSignature in digitalSignatures"
              :key="digitalSignature.id"
              switch-toggle-side
              expand-icon-toggle
              expand-icon="chevron_right"
              expanded-icon="expand_more"
              expand-icon-class="text-purple"
            >
              <template v-slot:header>
                <q-item-section>
                  {{ digitalSignature.name }}
                </q-item-section>

                <q-item-section side :class="digitalSignatureStatusList.find(c => c.label === digitalSignature.status).color  + '-color'">
                  {{ digitalSignature.status }}
                </q-item-section>
              </template>

              <q-card>
                <q-card-section class="info">
                  <div class="row">
                    <div class="col-6 col-md-6 col-sm-8">
                      <div class="row">
                        <div class="col">Владелец:</div>
                        <div class="col text-bold">{{ employeeFio(digitalSignature.owner) }}</div>
                      </div>
                      <div class="row">
                        <div class="col">Карточка доступа к МВС:</div>
                        <a :href="digitalSignature.MVCAccessCard" class="col link">Ссылка</a>
                      </div>
                      <div class="row">
                        <div class="col">Серийный номер:</div>
                        <div class="col serial">{{ digitalSignature.serialNumber }}</div>
                      </div>
                    </div>

                    <div class="col-6 col-md-6 col-sm-4 text-right">
                      <span>Действителен: </span>
                      <span class="text-bold">с {{digitalSignature.startDate }} по {{ digitalSignature.endDate }}</span>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>

      <div class="request-card">
        <div class="request-card__header">
          Заявки на выдачу ЭЦП
          <q-btn class="btn new_request-btn" label="Заявка" icon="add" @click="showDialog()" />
        </div>

        <div class="request-card__list">
          <q-list>
            <q-expansion-item
              v-for="userRequest in userRequests"
              :key="userRequest.id"
              switch-toggle-side
              expand-icon-toggle
              expand-icon="chevron_right"
              expanded-icon="expand_more"
              expand-icon-class="text-purple"
            >
              <template v-slot:header>
                <q-item-section>
                  Заявка на выпуск сертификата
                </q-item-section>

                <q-item-section side >
                  <span class="status" :class="statusColor(taskStatusList, userRequest.status) + '-bgr'">
                    {{ userRequest.status }}</span>
                </q-item-section>
              </template>

              <q-card>
                <q-card-section class="info-reject" v-if="userRequest.comment">
                  Сообщение от Администратора:<span class="info-reject__reason">{{ userRequest.comment }}</span>
                </q-card-section>
                <q-card-section class="info" v-else>
                  ...
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
    </div>

    <div v-else-if="activeTab === 'requestsAdmin'">
      <div class="request-card">
        <div class="request-card__header">Заявки на выдачу ЭЦП</div>

        <div class="flex request-card__content">
          <div class="request-card__content__grid">
            <q-table
              :rows="activeRequests"
              :columns="columnsRequests"
              row-key="id"
              hide-pagination
              flat
              auto-width
              v-model:pagination="pagination"
              table-header-class="request-card__content__grid__title"
              table-class="request-card__content__grid__body"
              :card-style="{ borderRadius: '12px' }"
            >
              <template v-slot:body-cell-employee="props">
                <q-td :props="props">
                  {{ employeeFio(props.row.employee) }}
                </q-td>
              </template>

              <template v-slot:body-cell-status="props">
                <q-td :props="props" :class="'text-' + taskStatusList.find(c => c.label === props.row.status).color">
                  {{ props.row.status }}
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-icon name="visibility" size="24px" class="actions-icon"/>
                </q-td>
              </template>
            </q-table>
          </div>

          <div class="request-card__content__filter">
            <q-input label="поиск по фамилии" outlined class="input-field" dense>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>

            <div class="status-list">
              <q-option-group
                v-model="statusFilter"
                :options="taskStatusList"
                type="checkbox"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="activeTab === 'tasks'">
      <div class="request-card">
        <div class="request-card__header">
          Задачи
        </div>

        <div class="request-card__list">
          <q-list>
            <q-expansion-item
              v-for="task in tasks"
              :key="task.id"
              expand-icon-toggle
              expand-separator
              expand-icon="chevron_right"
              expanded-icon="expand_more"
              expand-icon-class="text-purple"
            >
              <template v-slot:header>
                <q-item-section @click="showDialog(task)">
                  <div class="task-item">
                    Согласование заявки <span>{{ employeeFio(task.employee) }}</span>
                  </div>
                </q-item-section>
              </template>

              <q-card>
                <q-card-section class="info">
                  ...
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, computed, watch } from 'vue';
  import RequestDialog from 'components/requests/RequestDialog.vue';
  import { useQuasar } from 'quasar'
  import { useStore } from 'src/store';
  import { IRequest } from 'src/store/requests/state';

  export default defineComponent({
    name: 'Requests',
    setup() {
      const isShowDialog = ref(false);
      const $q = useQuasar();
      const columnsRequests = [
        { name: 'employee', label: 'От', field: 'employee', sortable: true, align: 'left' },
        { name: 'date', label: 'Дата заявки', field: 'date', sortable: true, align: 'left' },
        { name: 'status', label: 'Статус заявки', field: 'status', align: 'left' },
        { name: 'actions', label: 'Действия', align: 'center' },
      ];

      const statusFilter = ref(['На согласовании', 'В работе', 'Отклонена', 'Сертификат выпущен']);
      const taskStatusList = [
        {
          label: 'На согласовании',
          value: 'На согласовании',
          color: 'purple',
        },
        {
          label: 'В работе',
          value: 'В работе',
          color: 'yellow',
        },
        {
          label: 'Отклонена',
          value: 'Отклонена',
          color: 'red',
        },
        {
          label: 'Сертификат выпущен',
          value: 'Сертификат выпущен',
          color: 'green',
        },
      ];
      const digitalSignatureStatusList = [
        {
          label: 'Действующий сертификат',
          value: 'Действующий сертификати',
          color: 'green',
        },
        {
          label: 'Истек срок сертификата',
          value: 'Истек срок сертификата',
          color: 'red',
        },
      ];

      const showDialog = (dataAgreement: IRequest | null = null) => {
        $q.dialog({
          component: RequestDialog,
          componentProps: {
            title: dataAgreement ? 'Согласование заявки' : 'Заявка на выпуск ЭЦП',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            dataAgreement: dataAgreement ? {...dataAgreement, ...{employeeFio: employeeFio(dataAgreement.employee)}} : null
          }
        }).onOk((oper) => {
          switch (oper) {
            case 'onAccept':
              console.log('OK', 'accepted');
              break;
            case 'onReject':
              console.log('OK', 'rejected');
              break;
            default:
              console.log('OK', 'saved');
              break;
          }
        }).onCancel(() => {
           console.log('Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      };

      const $store = useStore();

      const isAdmin = ref(false);

      const activeTab = ref(isAdmin.value ? 'requestsAdmin' : 'requests');
      watch(isAdmin, () => activeTab.value = isAdmin.value ? 'requestsAdmin' : 'requests');

      onMounted(async () => {
        await $store.dispatch('digitalSignatures/setDigitalSignatures');
        await $store.dispatch('persons/setPersons');
        await $store.dispatch('requests/setRequests');
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      const digitalSignatures = computed(() => $store.getters['digitalSignatures/getDigitalSignatures']);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      const employeeFio = (id: number) => $store.getters['persons/getFioPerson'](id);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
      const userRequests = computed(() => $store.getters['requests/getUserRequests']);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      const activeRequests = computed(() => $store.getters['requests/getRequests']);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      const tasks = computed(() => $store.getters['requests/getTasks']);

      const statusColor = (statusList: { label: string, color: string }[], status: string) => {
        const statusData = statusList.find(c => c.label === status);
        return statusData ? statusData.color : ''
      };

      return {
        isShowDialog,
        showDialog,
        isAdmin,
        activeTab,
        columnsRequests,
        statusFilter,
        taskStatusList,
        digitalSignatureStatusList,
        statusColor,
        pagination: {
          page: 1,
          rowsPerPage: 0 // 0 means all rows
        },
        digitalSignatures,
        employeeFio,
        userRequests,
        activeRequests,
        tasks,
      }
    },
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
  min-height: 100vh
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

.tabs
  font-size: 0.875rem
  font-weight: 400
  letter-spacing: 0.25px
  color: $purple-color
  margin: 43px 0 39px
  line-height: 20
  width: fit-content

  .q-tab
    padding: 0 30px
    text-transform: none

  .bg-red
    background: #FF5F5F !important

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

    .info-reject
      line-height: 24px
      font-size: 0.875rem
      color: #9C9C9C

      &__reason
        color: $red-color
        text-transform: uppercase
        margin-left: 8px

    .status
      color: white
      border-radius: 12px
      padding: 8px 10px

  &__content
    &__grid
      font-size: 0.875rem
      letter-spacing: 0.25px
      border-radius: 12px
      margin-right: 20px
      overflow-x: auto

      &__title
        line-height: 24px
        font-weight: 500
        background: #E5E6E8

      &__body
        tr
          height: 63px

        tr:nth-child(even)
          background-color: #E5E6E8

        .actions-icon
          color: $purple-color
          cursor: pointer

    &__filter
      background-color: white
      padding: 17px
      border-radius: 12px
      max-height: 250px

      .input-field
        margin-bottom: 20px

  .text-purple
    color: $purple-color !important

  .text-yellow
    color: #EEBA00 !important

  .text-red
    color: #EC1C24 !important

  .text-green
    color: #72BE44 !important

  .green-color
    color: $green-color

  .red-color
    color: #FF5F5F

  .green-bgr
    background: $green-color

  .red-bgr
    background: $red-color

  .btn:hover
    opacity: 0.9

  .task-item
    span
      color: $purple-color

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

    &__content
      &__grid tr
        height: 20px

      &__filter
        margin-top: 30px
</style>
