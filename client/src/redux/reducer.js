import {GET_STUDENT,STUDENT} from './action-type'

const initial = {
    students: [
    ],
    token:'',
    users: [],
    roles:[],
    salles:[],
    msg: '',

}

export const appReducer = (state=initial,action) => {
    switch (action.type) {
        case GET_STUDENT: 
        localStorage.setItem('student', JSON.stringify(action.payload));     
        return{
            ...state,    
            students:JSON.parse(localStorage.getItem('student'))  
        }
        case STUDENT:  
        return{
            ...state,   
            token:action.payload
        }
        case 'Get_All_Users':  
        return{
            ...state,   
            users:action.payload 
        }
        case 'Get_All_ROLES':  
        return{
            ...state,   
            roles:action.payload 
        }
        case 'delete':  
        return{
            ...state,    
            users:action.payload
        }
        case 'UPDATE_USER': 
        return{
            ...state,    
            UPDATE_USER:action.payload,

        }
        case 'ADD_SALLE': 
        return{
            ...state,    
            msg:action.payload,

        }
        case 'Get_All_SALLES': 
        return{
            ...state,    
            salles:action.payload, 
        }
        default: return state;
    }
}