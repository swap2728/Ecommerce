export function createUser(userData) {
    return new Promise(async (resolve) => {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }


  export function loginUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
      try{
        const response = await fetch('/auth/login',{
          method: 'POST',
          body: JSON.stringify(loginInfo),
          headers: { 'content-type': 'application/json' },
        });
        
        if(response.ok){
          const data = await response.json();
          
          console.log(data)
        resolve({ data});
        }
        else {
          const err = await response.text();
         
        reject({ err});
        }
      }
      catch(err){
        // console.log(err)
        reject({err});
      }
      // TODO: on server it will only return some info of user (not password)
    });
  }

  export function checkAuth() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/auth/check');
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }

  export function updateUser(update) {
    return new Promise(async (resolve) => {
      const response = await fetch('//users/'+update.id, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }

  // export function signOut(userId){
  //   return new Promise(async (resolve)=>{
  //     resolve({data:'success'});
  //   })
  // }

  export function signOut() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('//users/auth/logout');
        if (response.ok) {
          resolve({ data:'success' });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        console.log(error)
        reject( error );
      }
    });
  }
  