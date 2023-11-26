<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="role">
      <n-space>
        <n-button v-for="role in roles" :key="role" @click="curRole = role">
          {{ role }}
        </n-button>
      </n-space>
      <!-- <n-button type="primary">Restaurant</n-button>
      <n-button type="primary">Delivery</n-button> -->
    </n-form-item>

    <transition name="fade">
      <div v-if="curRole">
        {{ curRole }}
        <n-form-item path="username">
          <n-input placeholder="Please enter user name" />
        </n-form-item>
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
            :placeholder="$t('page.login.common.passwordPlaceholder')"
          />
        </n-form-item>
        <n-form-item path="confirmPwd">
          <n-input
            v-model:value="model.confirmPwd"
            type="password"
            show-password-on="click"
            :placeholder="$t('page.login.common.confirmPasswordPlaceholder')"
          />
        </n-form-item>
        <transition name="fade">
          <n-form-item v-if="curRole == 'restaurant'" path="restaurantName">
            <n-input placeholder="Please enter restaurant name" />
          </n-form-item>
        </transition>
        <transition name="fade">
          <n-form-item v-if="curRole == 'restaurant'" path="restaurantAddress">
            <n-input type="textarea" placeholder="Please enter restaurant address" />
          </n-form-item>
        </transition>
        <n-space :vertical="true" :size="18">
          <login-agreement v-model:value="agreement" />
          <n-button type="primary" size="large" :block="true" :round="true" @click="handleSubmit">
            {{ $t('page.login.common.confirm') }}
          </n-button>
          <n-button size="large" :block="true" :round="true" @click="toLoginModule('pwd-login')">
            {{ $t('page.login.common.back') }}
          </n-button>
        </n-space>
      </div>
    </transition>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
import { useRouterPush } from '@/composables';
import { useSmsCode } from '@/hooks';
import { formRules, getConfirmPwdRule } from '@/utils';
import { $t } from '@/locales';

const { toLoginModule } = useRouterPush();
const { label, isCounting, loading: smsLoading, start } = useSmsCode();

const formRef = ref<HTMLElement & FormInst>();

const model = reactive({
  phone: '',
  code: '',
  pwd: '',
  confirmPwd: ''
});

const curRole = ref<string>('');

const roles: string[] = ['customer', 'restaurant', 'delivery'];

const rules: FormRules = {
  phone: formRules.phone,
  code: formRules.code,
  pwd: formRules.pwd,
  confirmPwd: getConfirmPwdRule(toRefs(model).pwd)
};

const agreement = ref(false);

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
