/**
 * Класс Transaction наследуется от Entity.
 * Управляет транзакциями пользователя.
 * Имеет свойство URL со значением '/transaction'
 */
class Transaction extends Entity {

   static URL = '/transaction';

   static get(id = '', callback) {
     const url = `${this.URL}/${id}`;
 
     createRequest({
       url: url,
       method: 'GET',
       callback: (err, response) => {
         callback(err, response);
       }
     });
   }

   static create(data, callback) {    
     const url = this.URL;
 
     createRequest({
       url: url,
       method: 'POST',
       data: data,
       callback: (err, response) => {
         callback(err, response);
       }
     });
   }

   static remove(id, callback) {
     const url = `${this.URL}/${id}`;
 
     createRequest({
       url: url,
       method: 'DELETE',
       callback: (err, response) => {
         callback(err, response);
       }
     });
   }
 }
 

