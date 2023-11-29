import { $t } from '@/locales';
import { transformObjectToOption } from './_shared';

export const loginModuleLabels: Record<UnionKey.LoginModule, string> = {
  'pwd-login': $t('page.login.pwdLogin.title'),
  'code-login': $t('page.login.codeLogin.title'),
  register: $t('page.login.register.title'),
  'reset-pwd': $t('page.login.resetPwd.title'),
  'bind-wechat': $t('page.login.bindWeChat.title')
};

export const userRoleLabels: Record<Auth.RoleType, string> = {
  super: $t('page.login.pwdLogin.superAdmin'),
  admin: $t('page.login.pwdLogin.admin'),
  user: $t('page.login.pwdLogin.user'),

  // 以下为自定义的角色
  restaurant: 'restaurant',
  delivery: 'delivery',
  customer: 'customer'
};
export const userRoleOptions = transformObjectToOption(userRoleLabels);

/** 用户性别 */
export const genderLabels: Record<UserManagement.GenderKey, string> = {
  0: '女',
  1: '男'
};
export const genderOptions = transformObjectToOption(genderLabels);

/** 用户状态 */
export const userStatusLabels: Record<UserManagement.UserStatusKey, string> = {
  1: '启用',
  2: '禁用',
  3: '冻结',
  4: '软删除'
};
export const userStatusOptions = transformObjectToOption(userStatusLabels);

export const foodStatusLabels: Record<FoodManagement.FoodStatusKey, string> = {
  1: 'on stock',
  2: 'sold out',
  3: 'removed'
};
export const foodStatusOptions = transformObjectToOption(foodStatusLabels);

export const orderStatusLabels: Record<OrderManagement.OrderStatusKey, string> = {
  // english
  1: 'pending',
  2: 'confirmed',
  3: 'delivered',
  4: 'completed',
  5: 'cancelled'
};
export const orderStatusOptions = transformObjectToOption(orderStatusLabels);
