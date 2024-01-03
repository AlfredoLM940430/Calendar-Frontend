import { CalendarEvent, CalendarModal, FabbAddNew, FabbDelete, NavBar } from "../"
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessages, localizer } from "../../helpers";
import { useEffect, useState } from "react";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPage = () => {

    const {user} = useAuthStore();

    const {OpenDateModal} = useUiStore();
    const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (e, start, end, isSelected) => {

        const isMyEvent = (user.uid === e.user._id) || (user.uid === e.user.uid)

        const style = {
            backgroundColor: isMyEvent ? '#347cf7' : '#465660',
            borderRadius: 0.8,
            color: 'white',
        }
    
        return {
            style
        }
    }

    const ondbClick = (e) => {
        OpenDateModal();
    }

    const onSelect = (e) => {
        setActiveEvent(e);
    }

    const onviewChange = (e) => {
        localStorage.setItem('lastView', e);
        setLastView(e);
    }

    useEffect(() => {
      startLoadingEvents();
    }, [])
    
    return (
    <>
        <NavBar />

        <Calendar
            culture='es'
            localizer={localizer}
            events={events}
            defaultView={lastView}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            messages={getMessages()}
            eventPropGetter={eventStyleGetter}
            components={{
                event: CalendarEvent
            }}
            onDoubleClickEvent={ondbClick}
            onSelectEvent={onSelect}
            onView={onviewChange}
        />

        <CalendarModal />
        <FabbAddNew />
        <FabbDelete />

    </>
)}