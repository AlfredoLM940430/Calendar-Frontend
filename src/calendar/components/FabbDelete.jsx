import { useCalendarStore, useUiStore } from "../../hooks"

export const FabbDelete = () => {

    const {starDeleteEvent, hasEventSelected} = useCalendarStore();

    const handleDelete = () => {
        starDeleteEvent();
    }

    return (
        <button 
            className="btn btn-danger fab-danger" 
            onClick={handleDelete} 
            style={{
            display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
)}