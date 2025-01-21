/**
 * Основная функция для совершения запросов на сервер.
 */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const { url, method = 'GET', data = {}, callback } = options;

    if (!url || typeof callback !== 'function') {
        throw new Error('Необходимо указать URL и функцию callback');
    }

    let requestUrl = url;
    let requestData = null;

    if (method === 'GET') {
        const queryParams = new URLSearchParams(data).toString();
        if (queryParams) {
            requestUrl += `?${queryParams}`;
        }
    } else {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        requestData = formData;
    }

    xhr.open(method, requestUrl);
    xhr.responseType = 'json';

    xhr.onload = () => {
        callback(null, xhr.response);
    };

    xhr.onerror = () => {
        callback(new Error('Ошибка'), null);
    };

    xhr.send(requestData);
};

 
  