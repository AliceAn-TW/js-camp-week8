// ========================================
// API 請求函式
// ========================================

const axios = require("axios");
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require("./config");

// ========== 客戶端 API ==========

const customerApi = axios.create({
  baseURL: `${BASE_URL}/api/livejs/v1/customer/${API_PATH}`,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  // 請實作此函式
  // 回傳 response.data.products
  try {
    const response = await customerApi.get("/products");
    return response.data.products;
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  // 請實作此函式
  try {
    const response = await customerApi.get("/carts");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  // 請實作此函式
  try {
    const response = await customerApi.post("/carts", {
      data: {
        productId,
        quantity,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  // 請實作此函式
  try {
    const response = await customerApi.patch("/carts", {
      data: {
        id: cartId,
        quantity,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  // 請實作此函式
  const response = await customerApi.delete(`/carts/${cartId}`);
  return response.data;
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  // 請實作此函式
  const response = await customerApi.delete("/carts");
  return response.data;
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  // 請實作此函式
  const response = await customerApi.post("/orders", {
    data: {
      user: {
        name: userInfo.name,
        tel: userInfo.tel,
        email: userInfo.email,
        address: userInfo.address,
        payment: userInfo.payment,
      },
    },
  });
  return response.data;
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */
const adminApi = axios.create({
  baseURL: `${BASE_URL}/api/livejs/v1/admin/${API_PATH}`,
  headers: {
    "Content-Type": "application/json",
    authorization: ADMIN_TOKEN,
  },
});

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  // 請實作此函式
  try {
    const response = await adminApi.get("/orders");
    return response.data.orders;
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  // 請實作此函式
  const response = await adminApi.put("/orders", {
    data: {
      id: orderId,
      paid: isPaid,
    },
  });
  return response.data;
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  // 請實作此函式
  const response = await adminApi.delete(`/orders/${orderId}`);
  return response.data;
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
};
