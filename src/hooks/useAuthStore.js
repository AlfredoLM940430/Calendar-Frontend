import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/CalendarApi";
import { clearErrorMsg, onCheking, onLogin, onLogout } from "../store/auth/authSlice";
import { onLogoutCalendar } from "../store/calendar/calendarSlice";

export const useAuthStore = () => {
    
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const startLogin = async ({email, contraseña}) => {
        
        dispatch(onCheking());
        
        try {
            const {data} = await calendarApi.post('/auth', {email, contraseña});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));

        } catch (error) {
            dispatch(onLogout('Credenciales Incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMsg())
            }, 10);
        }
    }

    const startRegister = async ({name, email, contraseña}) => {

        try {
            const {data} = await calendarApi.post('/auth/new', {name, email, contraseña});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));

        } catch (error) {
            dispatch(onLogout(error.response.data?.msj || '--'));
            setTimeout(() => {
                dispatch(clearErrorMsg())
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout());

        try {
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        //* Propiedades
        errorMessage,
        user,
        status,

        //* Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}