// import restaurant from '../router/modules/restaurant';

/** 用户相关模块 */
declare namespace Auth {
  /**
   * 用户角色类型(前端静态路由用角色类型进行路由权限的控制)
   * - super: 超级管理员(该权限具有所有路由数据)
   * - admin: 管理员
   * - user: 用户
   */
  type RoleType = 'super' | 'admin' | 'user' | 'customer' | 'restaurant' | 'delivery';

  /** 用户信息 */
  interface UserInfo {
    /** 用户id */
    userId: string;
    /** 用户名 */
    userName: string;
    /** 用户角色类型 */
    userRole: RoleType;
  }
}

declare namespace UserManagement {
  interface User extends ApiUserManagement.User {
    /** 序号 */
    index: number;
    /** 表格的key（id） */
    key: string;
  }

  /**
   * 用户性别
   * - 0: 女
   * - 1: 男
   */
  type GenderKey = NonNullable<User['gender']>;

  /**
   * 用户状态
   * - 1: 启用
   * - 2: 禁用
   * - 3: 冻结
   * - 4: 软删除
   */
  type UserStatusKey = NonNullable<User['userStatus']>;
}
declare namespace FoodManagement {
  interface Food extends ApiFoodManagement.Food {
    /** 序号 */
    index: number;
    /** 表格的key（id） */
    key: string;
  }
  /**
   * 食物状态
   * - 1: 上架
   * - 2: 下架
   * - 3: 软删除
   */
  type FoodStatusKey = NonNullable<Food['status']>;
}

declare namespace OrderManagement {
  interface Order extends ApiOrderManagement.Order {
    /** 序号 */
    index: number;
    /** 表格的key（id） */
    key: string;
  }
  /**
   * 订单状态
   * - 1: 已下单
   * - 2: 已接单
   * - 3: 已完成
   * - 4: 已取消
   */
  type OrderStatusKey = NonNullable<Order['status']>;
}
declare namespace RestaurantManagement {
  interface Restaurant extends ApiRestaurantManagement.Restaurant {
    /** 序号 */
    index: number;
    /** 表格的key（id） */
    key: string;
  }
  /**
   * 餐厅状态
   * - 1: 启用
   * - 2: 禁用
   * - 3: 软删除
   */
  // type restaurantStatusKey = NonNullable<restaurant['status']>;
}
