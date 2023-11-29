<template>
  <n-card title="User Management">
    <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
      <!-- <n-form-item path="role"> -->
      <!-- <n-space>
          <n-button
            v-for="role in roles"
            :key="role"
            @click="
              curRole = role;
              model.username = 'ken123';
              model.phone = '57020018';
              model.code = '';
              model.pwd = '';
              model.confirmPwd = '';
              model.restaurantName = 'hot dog restaurant';
              model.restaurantAddress = '53 Victoria St\nNottingham\nEngland';
            "
          >
            {{ role }}
          </n-button>
        </n-space> -->
      <!-- <n-button type="primary">Restaurant</n-button>
      <n-button type="primary">Delivery</n-button> -->
      <!-- </n-form-item> -->

      <transition name="fade">
        <div>
          <!-- {{ curRole }} -->
          User name:
          <n-form-item path="username">
            <n-input v-model:value="model.username" placeholder="Please enter new user name" />
          </n-form-item>
          Phone number:
          <n-form-item path="phone">
            <n-input v-model:value="model.phone" :placeholder="$t('page.login.common.phonePlaceholder')" />
          </n-form-item>
          <n-form-item path="code">
            <div class="flex-y-center w-full">
              <n-input v-model:value="model.code" :placeholder="$t('page.login.common.codePlaceholder')" />
              <div class="w-18px"></div>
              <n-button size="large" :disabled="isCounting" :loading="smsLoading" @click="handleSmsCode">
                {{ label }}
              </n-button>
            </div>
          </n-form-item>
          <n-form-item path="pwd">
            <n-input
              v-model:value="model.pwd"
              type="password"
              show-password-on="click"
              placeholder="Please enter new password"
            />
          </n-form-item>
          <n-form-item path="confirmPwd">
            <n-input
              v-model:value="model.confirmPwd"
              type="password"
              show-password-on="click"
              placeholder="Please enter new password again"
            />
          </n-form-item>
          <transition name="fade">
            <n-form-item
              v-if="hasPermission('restaurant')"
              path="restaurantName"
              label="Restaurant name"
              :show-label="true"
            >
              <n-input v-model:value="model.restaurantName" placeholder="Please enter new restaurant name" />
            </n-form-item>
          </transition>
          <transition name="fade">
            <n-form-item
              v-if="hasPermission('restaurant')"
              path="restaurantAddress"
              label="Restaurant address"
              :show-label="true"
            >
              <n-input
                v-model:value="model.restaurantAddress"
                type="textarea"
                placeholder="Please enter new restaurant address"
              />
            </n-form-item>
          </transition>
          <n-space :vertical="true" :size="18">
            <!-- <login-agreement v-model:value="agreement" /> -->
            <n-button type="primary" size="large" :block="true" :round="true" @click="handleSubmit">update</n-button>
            <n-button size="large" :block="true" :round="true" @click="reset()">Reset</n-button>
          </n-space>
        </div>
      </transition>
    </n-form>
  </n-card>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
// import { create, rest } from 'lodash';
import { usePermission } from '@/composables';
import { useSmsCode } from '@/hooks';
import { createRequiredFormRule, formRules, getConfirmPwdRule } from '@/utils';
import { $t } from '@/locales';

const { hasPermission } = usePermission();
// const { toLoginModule } = useRouterPush();
const { label, isCounting, loading: smsLoading, start } = useSmsCode();

const formRef = ref<HTMLElement & FormInst>();
// const curRole = ref<string>('');

const model = reactive({
  phone: '',
  code: '',
  pwd: '',
  confirmPwd: '',
  username: '',
  restaurantName: '',
  restaurantAddress: ''
});

function reset() {
  model.username = 'ken123';
  model.phone = '57020018';
  model.code = '';
  model.pwd = '';
  model.confirmPwd = '';
  model.restaurantName = 'hot dog restaurant';
  model.restaurantAddress = '53 Victoria St\nNottingham\nEngland';
}
reset();
// const roles: string[] = ['customer', 'restaurant', 'delivery'];

const rules: FormRules = {
  phone: formRules.phone,
  code: formRules.code,
  pwd: formRules.pwd,
  username: [createRequiredFormRule('Please enter new user name')],
  confirmPwd: getConfirmPwdRule(toRefs(model).pwd),
  restaurantName: createRequiredFormRule('Please enter new restaurant name'),
  restaurantAddress: createRequiredFormRule('Please enter new restaurant address')
};

// const agreement = ref(false);

function handleSmsCode() {
  start();
}

async function handleSubmit() {
  await formRef.value?.validate();
  window.$message?.success($t('page.login.common.validateSuccess'));
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
