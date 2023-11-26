import type { Ref } from 'vue';
import type { FormItemRule } from 'naive-ui';
import { REGEXP_CODE_SIX, REGEXP_EMAIL, REGEXP_PHONE, REGEXP_PWD } from '@/config';

/** 创建自定义错误信息的必填表单规则 */
export const createRequiredFormRule = (message = 'cant null'): FormItemRule => ({ required: true, message });

export const requiredFormRule = createRequiredFormRule();

/** 表单规则 */
interface CustomFormRules {
  /** 手机号码 */
  phone: FormItemRule[];
  /** 密码 */
  pwd: FormItemRule[];
  /** 验证码 */
  code: FormItemRule[];
  /** 邮箱 */
  email: FormItemRule[];
}

/** 表单规则 */
export const formRules: CustomFormRules = {
  phone: [
    createRequiredFormRule('Please enter phone number'),
    { pattern: REGEXP_PHONE, message: 'wrong phone number formate', trigger: 'input' }
  ],
  pwd: [
    createRequiredFormRule('Please enter password'),
    // 密码为6-18位数字/字符/符号，至少2种组合
    {
      pattern: REGEXP_PWD,
      message: 'Password must be 6-18 characters long and contain at least 2 types of characters',
      trigger: 'input'
    }
  ],
  code: [
    createRequiredFormRule('Please enter verification code'),
    { pattern: REGEXP_CODE_SIX, message: 'Invalid verification code format', trigger: 'input' }
  ],
  email: [{ pattern: REGEXP_EMAIL, message: 'Invalid email format', trigger: 'blur' }]
};

/** 是否为空字符串 */
function isBlankString(str: string) {
  return str.trim() === '';
}

/** 获取确认密码的表单规则 */
export function getConfirmPwdRule(pwd: Ref<string>) {
  const confirmPwdRule: FormItemRule[] = [
    { required: true, message: 'Please enter password' },
    {
      validator: (rule, value) => {
        if (!isBlankString(value) && value !== pwd.value) {
          return Promise.reject(rule.message);
        }
        return Promise.resolve();
      },
      message: 'The input value does not match the password',
      trigger: 'input'
    }
  ];
  return confirmPwdRule;
}

/** 获取图片验证码的表单规则 */
export function getImgCodeRule(imgCode: Ref<string>) {
  const imgCodeRule: FormItemRule[] = [
    { required: true, message: 'enter the verification code' },
    {
      validator: (rule, value) => {
        if (!isBlankString(value) && value !== imgCode.value) {
          return Promise.reject(rule.message);
        }
        return Promise.resolve();
      },
      message: 'The verification code is incorrect',
      trigger: 'blur'
    }
  ];
  return imgCodeRule;
}
