/**
 * Bu dosya, uygulamanın backend API'si ile iletişim kurmak için kullanılan
 * temel API istemcisini (Axios tabanlı) içerir.
 * HTTP isteklerini yönetir, kimlik doğrulama token'ını ekler ve
 * merkezi hata yönetimi sağlar.
 */
import axios from "axios";
import { toast } from "react-toastify";

// Axios'un varsayılan temel URL'si.
axios.defaults.baseURL = "";
// Çapraz kaynak isteklerinde kimlik bilgilerinin (çerezler, HTTP kimlik doğrulama) gönderilmesini sağlar.
axios.defaults.withCredentials = true;

// Her giden HTTP isteğine, varsa kimlik doğrulama (Authorization) başlığını ekler.
axios.interceptors.request.use((request) => {
  const token = null; //sonra eklenecek
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
});

// Gelen HTTP yanıtlarını işler ve merkezi hata yönetimi sağlar.
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { data, status } = error.response;
    debugger;
    switch (status) {
      case 400: // Kötü İstek (Bad Request)
        toast.error(data.message);
        break;
      case 401: // Yetkisiz (Unauthorized)
        toast.error(data.message);
        break;
      case 403: // Yasak (Forbidden)
        toast.error(data.message);
        break;
      case 404: // Bulunamadı (Not Found)
        break;
      case 500: // Sunucu Hatası (Internal Server Error)
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);

// Temel HTTP metotları (GET, POST, PUT, DELETE) için yardımcı fonksiyonlar.
// Her yanıtın sadece 'data' kısmını döndürür.
const methods = {
  get: (url) => axios.get(url).then((response) => response.data),
  post: (url, body) => axios.post(url, body).then((response) => response.data),
  put: (url, body) => axios.put(url, body).then((response) => response.data),
  delete: (url) => axios.delete(url).then((response) => response.data),
};

const products = {
  list: () => methods.get("products"),
  details: (id) => methods.get(`products/${id}`),
};

const cart = {
  get: () => methods.get("carts"),
  addItem: (productId, quantity = 1) =>
    methods.post(`carts?productId=${productId}&quantity=${quantity}`, {}),
  deleteItem: (productId, quantity = 1) =>
    methods.delete(`carts?productId=${productId}&quantity=${quantity}`),
};

const account = {
  login: (formData) => methods.post("users/login", formData),
  register: (formData) => methods.post("users/register", formData),
  getUser: () => methods.get("users/getUser"),
};

const orders = {
  getOrders: () => methods.get("orders"),
  getOrder: (id) => methods.get(`orders/${id}`),
  createOrder: (formData) => methods.post("orders", formData),
};

const wishlist = {
  get: () => methods.get("wishlist"),
  addItem: (productId) => methods.post(`wishlist?productId=${productId}`, {}),
  removeItem: (productId) => methods.delete(`wishlist?productId=${productId}`),
};

export { methods, products, cart, account, orders, wishlist };
