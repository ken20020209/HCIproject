// 后端接口返回的数据类型

/** 后端返回的用户权益相关类型 */
declare namespace ApiAuth {
  /** 返回的token和刷新token */
  interface Token {
    token: string;
    refreshToken: string;
  }
  /** 返回的用户信息 */
  type UserInfo = Auth.UserInfo;
}

/** 后端返回的路由相关类型 */
declare namespace ApiRoute {
  /** 后端返回的路由数据类型 */
  interface Route {
    /** 动态路由 */
    routes: AuthRoute.Route[];
    /** 路由首页对应的key */
    home: AuthRoute.AllRouteKey;
  }
}

declare namespace ApiUserManagement {
  interface User {
    /** 用户id */
    id: string;
    /** 用户名 */
    userName: string | null;
    /** 用户年龄 */
    age: number | null;
    /**
     * 用户性别
     * - 0: 女
     * - 1: 男
     */
    gender: '0' | '1' | null;
    /** 用户手机号码 */
    phone: string;
    /** 用户邮箱 */
    email: string | null;
    /**
     * 用户状态
     * - 1: 启用
     * - 2: 禁用
     * - 3: 冻结
     * - 4: 软删除
     */
    userStatus: '1' | '2' | '3' | '4' | null;
  }
}

declare namespace ApiFoodManagement {
  interface Food {
    /** 食物id */
    id: string;
    /** 食物名称 */
    name: string | null;
    /** 食物价格 */
    price: number | null;
    /** 食物数量 */
    quantity: number | null;
    /** 食物状态 */
    status: '1' | '2' | '3' | null;
    /** 食物图片 */
    image: string | null;
    /** 食物描述 */
    description: string | null;
  }
}
declare namespace ApiRestaurantManagement {
  interface Restaurant {
    /** 餐厅id */
    id: string;
    /** 餐厅名称 */
    name: string | undefined;
    /** 餐厅地址 */
    address: string | null;
    /** 餐厅电话 */
    phone: string | null;
    /** 餐厅图片 */
    image: string | undefined;
    /** 餐厅描述 */
    description: string | null;
  }
}
declare namespace ApiOrderManagement {
  interface Order {
    /** 订单id */
    id: string;
    // name
    name: string;
    // time
    time: string;
    /** 订单状态 */
    status: '1' | '2' | '3' | '4' | '5' | string | null;
    /** 订单总价 */
    price: number | null;
    /** 订单地址 */
    address: string | null;
    /** 订单电话 */
    phone: string | null;
    /** 订单描述 */
    description: string | null;
  }
}
