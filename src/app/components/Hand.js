'use client'

import PlayingCard from "./PlayingCard"
import { Box, HStack } from "@chakra-ui/react"

export default function Hand({hand}){

    const CardComps = hand.map(card => {
        return(
            <PlayingCard card={card}/>
        )
    });

    return(
        <HStack>
            {CardComps}
        </HStack>
    )
}