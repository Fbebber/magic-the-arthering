import { useEffect, useState } from "react";
import RequestCardList from "./request";
import CardType from "../../types/Card";
import Card from "../Card";
import CardListContext from "../../context/CardList";

type CardListType = {
    filter: string,
    amount: number,
    sizes: {
        container: string,
        card: string
    },
    visibility: boolean
}

function CardList({ filter, amount, sizes, visibility }: CardListType) {

    const [Cards, setCards] = useState<[] | CardType[]>([]);

    const [cardSelect, setCardSelected] = useState<null>(null);

    useEffect(() => {
        async function getData() {
            const data = await RequestCardList(filter);

            if (data !== null) {
                setCards(data.cards);
            } else if (!data) {
                // 
            }
        }

        if (visibility && Cards.length === 0) {
            getData();
        }
    }, [visibility]);

    return (
        <CardListContext.Provider value={{ cardSelect, setCardSelected }}>
            <div className={`grid grid-cols-4 gap-3 ${sizes.container} ${visibility ? '' : 'hidden'}`}>
                {Cards.length > 0 ?
                    Cards.map(function (item) {
                        return (
                            <div key={item.id + filter}>
                                <Card item={item} sizes={sizes.card} />
                            </div>
                        )
                    }) : [...Array(amount)].map((e, i) => {
                        return (<div key={`${filter}${i}`} className={`${sizes.card} relative bg-black bg-opacity-50 rounded-[17px]`}><div className="loader"></div></div>)
                    })
                }
            </div>
        </CardListContext.Provider>
    )
};

export default CardList;


// h-[334px]