import { useDispatch, useSelector } from "react-redux"
import { onOpenDateModal } from "../store";
import { onCloseDateModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {isDateModalOpen} = useSelector(state => state.ui);

    const OpenDateModal = () => {

        dispatch(onOpenDateModal());
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    }

    return {
        isDateModalOpen,
        OpenDateModal,
        closeDateModal,
    }
}