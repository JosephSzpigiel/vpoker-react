import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
export default function PlayingCard({card, inGame, cardIndex, hand, setToDiscard}){

    const [discard, setDiscard] = useState(false)
    function handleDiscard(e){
        if(!discard){
            setToDiscard(curr => [...curr, cardIndex])
        }else{
            setToDiscard(curr => curr.filter((i)=>{
                return(i != cardIndex)
            }))
        }
        setDiscard(curr => !curr)

    }

    useEffect(()=>setDiscard(false), [inGame])

    return(
        <Card bg={'transparent'} shadow={'none'} margin={'0px'}  padding={'0px'}>
            <CardBody padding={'5px'}>
                <Image
                src={card.image} opacity={discard ? .4 : 1} paddingBottom={'5px'}
                />
                <Button onClick={handleDiscard} isDisabled={!inGame} width={'100%'}>{discard? 'Keep': 'Discard'}</Button>
            </CardBody>
        </Card>
    )
}