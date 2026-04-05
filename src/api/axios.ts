import axios from 'axios';

const api = axios.create({
  // الرابط الأساسي للباك إند الخاص بك
  baseURL: 'https://sentrykbackend.onrender.com/api',
});

/**
 * Interceptor للطلبات الصادرة (Request)
 * يقوم بحقن التوكن في الـ Headers إذا كان موجوداً في الـ localStorage
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor للاستجابات الواردة (Response)
 * يعالج الأخطاء المركزية مثل الـ 401 (Unauthorized)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // نتحقق من حالة الخطأ 401
    if (error.response?.status === 401) {
      
      /* 
         السر هنا: 
         نحن نتحقق هل المستخدم حالياً في صفحة تسجيل الدخول؟
         - إذا كان في صفحة Login ووصله 401، فهذا يعني "بيانات خطأ" (إيميل أو باسورد غلط).
         - لا نقوم بعمل ريلود، بل نترك صفحة الـ Login تمسك الخطأ وتعرضه للمستخدم.
      */
      const isLoginPage = window.location.pathname.includes('/login');

      if (!isLoginPage) {
        // إذا لم يكن في صفحة اللوجين (مثلاً كان في الداشبورد والتوكن انتهى)
        // نقوم بمسح البيانات القديمة وتوجيهه للوجين مع ريلود لتنظيف الحالة
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // يفضل مسح بيانات المستخدم أيضاً
        window.location.href = '/login';
      }
    }

    // إرسال الخطأ للـ Catch الموجودة في الصفحة التي استدعت الطلب
    return Promise.reject(error);
  }
);

export default api;
