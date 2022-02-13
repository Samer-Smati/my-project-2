import {GET_STUDENT,STUDENT} from './action-type'
import axios from 'axios' 

export const myStudentHandler = (data) => { 
    return (dispatch) => {
    return axios.post("http://localhost:4000/api/auth/signin",data).then((res) => { 
        dispatch({ 
        type: GET_STUDENT, 
        payload: res.data,   
      });
    });
  };
}

export const deleteHandler = (data) => { 
  
  return async (dispatch) => {  
  return await axios.post("http://localhost:4000/delete",{email:data}).then((res) => {  
      dispatch({  
      type: 'DELETE', 
      payload: res.data,   
    });
  }); 
}; 
}

export const updateHandler = (data) => {
  return (dispatch) => {  
  return axios.put("http://localhost:4000/updateUser",data).then((res) => {
      dispatch({ 
      type: 'UPDATE_USER',
      payload: res.data,   
    });
  }); 
};
}
 
export const SingnUp = (data) => {
  return (dispatch) => {
  return axios.post("http://localhost:4000/api/auth/signup",data).then((res) => { 
      dispatch({ 
      type: 'SingnUp', 
      payload: res.data,   
    });
  });
};
}

export const studentContent = (data) => {
    return (dispatch,getState) => {
    return axios.get("http://localhost:4000/api/student",{
        headers: {
          'x-access-token': data
        }
      }).then((res) => {
        dispatch({ 
        type: STUDENT,  
        payload: res.data,   
      });
    });
  };
}

export const adminContent = (data) => {
  return (dispatch) => {
  return axios.get("http://localhost:4000/api/admin",{
    
      headers: {
        'x-access-token': data.accessToken 
      }
    }).then((res) => {
      dispatch({ 
      type: data.roles[0],  
      payload: res.data,
    });
  });
};
}

export const allUsers = (data,currentPage,perPage) => {  
  return (dispatch) => {
  return axios.get(`http://localhost:4000/users?currentPage=${currentPage}&perPage=${perPage}`,{
      headers: { 
        'x-access-token': data.accessToken,
      }
    }).then((res) => {
      dispatch({  
      type: 'Get_All_Users',  
      payload: res.data,   
    });
  });
};
}
/*************************Roles************************ */
export const allRoles = (data) => {   
  console.log(data)
  return (dispatch) => { 
  return axios.get(`http://localhost:4000/roles`,{
      headers: { 
        'x-access-token': data.accessToken,
      }
    }).then((res) => {
      dispatch({  
      type: 'Get_All_ROLES',  
      payload: res.data,   
    });
  });
};
}
/******************************Salles********************* */
export const allSalles = (data) => {   
  return (dispatch) => { 
  return axios.get(`http://localhost:4000/salles`).then((res) => {
      dispatch({  
      type: 'Get_All_SALLES',  
      payload: res.data,   
    });
  });
};
}

export const addSalle = (data) => {
  return (dispatch) => {
  return axios.post("http://localhost:4000/addSalle",data).then((res) => { 
      dispatch({ 
      type: 'ADD_SALLE', 
      payload: res.data,    
    });
  });
}; 
}

export const deleteSalle = (data) => {
  console.log(data);
  return (dispatch) => {   
  return axios.post("http://localhost:4000/deleteSalle",data).then((res) => {  
      dispatch({ 
      type: 'DELETE_SALLE',  
      payload: res.data,     
    });
  });
}; 
}

export const updateSalle = (data) => {
  console.log(data); 
  return (dispatch) => {   
  return axios.put("http://localhost:4000/editSalle",data).then((res) => {   
      dispatch({ 
      type: 'UPDATE_SALLE',  
      payload: res.data,     
    });
    dispatch(allSalles())
  });
}; 
}
