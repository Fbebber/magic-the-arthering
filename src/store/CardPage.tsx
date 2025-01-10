import { create } from 'zustand';


type CardPageStoreType = {
    card: null | object,
    setCard: (card: object) => void;
}

const useCardPageStore = create<CardPageStoreType>((set) => ({
    card: null,
    setCard: (card: object) => set(() => ({ card: card })),
}));

export default useCardPageStore;