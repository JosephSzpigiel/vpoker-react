import { Button, Box, Card, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, Text, NumberInputStepper, Center, VStack, Spacer, Grid } from "@chakra-ui/react";
import { useState } from "react";


export default function Controls({chips, hand, setHand, setChips, handleClick, inGame, setIngame, toDiscard, setToDiscard, deckId}){

    const [bet, setBet] = useState(1)
    const [currBet, setCurrBet] = useState(null)

    function handleChange(bet){
        setBet(bet)
    }

    function handleBet(e){
        setIngame(true)
        setChips(curr => curr - bet)
        setCurrBet(bet)
        handleClick(e)
    }

    function handleEnd(e){
        if(toDiscard){
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${toDiscard.length}`)
            .then(r  => r.json())
            .then(result => {
                console.log(result.cards)
                let newCardIndex = 0 
                const newHand = hand.map((card, index)=>{
                    if(toDiscard.includes(index)){
                        newCardIndex += 1
                        return(result.cards[newCardIndex-1])
                    }else{
                        return(card)
                    }
                })
                setHand(newHand)
                console.log(hand)
            })
        }

        setIngame(false)
        setChips(curr => parseInt(curr) + parseInt(bet))
        setCurrBet(null)
        setToDiscard([])
    }


    return(
        <Card direction={'row'} padding={'10px'} w={'400px'}>
            <VStack>

                {currBet ? <Text align={'center'}>Current Bet: {currBet}</Text> : <Text> Current Bet:</Text>}
                <Flex>
                    <Center h={'100%'}>
                        <Text as='b'>Total Chips: {chips}</Text>
                    </Center>
                    <Spacer/>
                    <Box direction={'row'} paddingLeft={'5px'} paddingRight={'5px'}>
                        <NumberInput max={Math.min(5,chips)} min={1} value={bet} onChange={handleChange} isDisabled={inGame}>
                            <NumberInputField w={'60px'}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper/>
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Box>
                    <Spacer/>
                    <Box>
                        <Button onClick={inGame ? handleEnd : handleBet}>{inGame ? 'Redeal' : 'Place Bet'}</Button>
                    </Box>
                </Flex>
            </VStack>
        </Card>
    )
}