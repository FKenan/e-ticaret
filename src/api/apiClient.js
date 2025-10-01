/**
 * Bu dosya, uygulamanın backend API'si ile iletişim kurmak için kullanılan
 * temel API istemcisini (Axios tabanlı) içerir.
 * HTTP isteklerini yönetir, kimlik doğrulama token'ını ekler.
 */
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Çapraz kaynak isteklerinde kimlik bilgilerinin (çerezler, HTTP kimlik doğrulama) gönderilmesini sağlar.
axios.defaults.withCredentials = true;

// Her giden HTTP isteğine, varsa kimlik doğrulama (Authorization) başlığını ekler.
axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem("authToken");
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
});

// Temel HTTP metotları (GET, POST, PUT, DELETE) için yardımcı fonksiyonlar.
const methods = {
  get: (url) => axios.get(url).then((response) => response.data),
  post: (url, body) => axios.post(url, body).then((response) => response.data),
  put: (url, body) => axios.put(url, body).then((response) => response.data),
  delete: (url) => axios.delete(url).then((response) => response.data),
};

const products = {
  all: () => methods.get("products"),
  byId: (id) => methods.get(`products/${id}`),
  byCategory: (categoryId) => methods.get(`products/by-category/${categoryId}`),
};

const categories = {
  all: () => methods.get("categories"),
};

const cart = {
  get: (userId) => methods.get(`carts/${userId}`),
  addItem: (userId, productId, amount = 1) =>
    methods.post(`carts/increase`, { userId, productId, amount }),
  decreaseItem: (userId, productId, amount = 1) =>
    methods.post(`carts/decrease`, { userId, productId, amount }),
  clear: (userId) => methods.delete(`carts/clear/${userId}`),
};

const account = {
  login: (formData) => methods.post("auth/login", formData),
  register: (formData) => methods.post("auth/register", formData),
  getUser: () => methods.get("auth/profile"),
};

const orders = {
  getOrders: (userId) => methods.get(`orders/user/${userId}`),
  getOrder: (id) => methods.get(`orders/${id}`),
  createOrder: (formData) => methods.post("orders", formData),
};

const wishlist = {
  get: (userId) => methods.get(`wishlists/user/${userId}`),
  addItem: (item) => methods.post("wishlists", item),
  removeItem: (id) => methods.delete(`wishlists/${id}`),
};

const addresses = {
  get: (userId) => methods.get(`addresses/user/${userId}`),
  addItem: (address) => methods.post("addresses", address),
  update: (id, updatedAddress) =>
    methods.put(`addresses/${id}`, updatedAddress),
  delete: (id) => methods.delete(`addresses/${id}`),
};

const requests = {
  products,
  wishlist,
  cart,
  account,
  orders,
  categories,
  addresses,
};

export default requests;
