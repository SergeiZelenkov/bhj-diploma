/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
   const xhr = new XMLHttpRequest();
   const { url, method, data, callback } = options;

   
   let requestUrl = url;
   if (method === 'GET' && data) {
       const queryParams = new URLSearchParams(data).toString();
       requestUrl += `?${queryParams}`;
   }

   xhr.open(method, requestUrl);
   xhr.responseType = 'json'; 

   
   xhr.onload = () => {
       if (xhr.status >= 200 && xhr.status < 300) {
           callback(null, xhr.response); 
       } else {
           callback(new Error(`Ошибка: ${xhr.status} ${xhr.statusText}`), null); 
       }
   };

   
   xhr.onerror = () => {
       callback(new Error('Ошибка соединения'), null);
   };

   
   if (method !== 'GET' && data) {
       const formData = new FormData();
       for (const key in data) {
           formData.append(key, data[key]);
       }
       xhr.send(formData);
   } else {
       xhr.send();
   }
};

 
