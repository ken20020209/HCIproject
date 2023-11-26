/** 手机号码正则 */

// hong kong phone number with out 852
export const REGEXP_PHONE = /^\d{8}$/;

/** 邮箱正则 */
export const REGEXP_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

/** 密码正则(密码为6-18位数字/字符/符号的组合) */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){6,18}$/;

/** 6位数字验证码正则 */
export const REGEXP_CODE_SIX = /^\d{6}$/;

/** 4位数字验证码正则 */
export const REGEXP_CODE_FOUR = /^\d{4}$/;

/** url链接正则 */
export const REGEXP_URL =
  /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
