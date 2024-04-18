'use client'

import PlayingCard from "./PlayingCard"
import { Box, HStack } from "@chakra-ui/react"

export default function Hand({hand, inGame, setToDiscard}){
    console.log(hand)
    const CardComps = hand.map((card, index) => {
        return(
            <PlayingCard card={card} inGame={inGame} cardIndex={index} hand={hand} setToDiscard={setToDiscard}/>
        )
    });

    return(
        <HStack>
            {CardComps}
        </HStack>
    )
}