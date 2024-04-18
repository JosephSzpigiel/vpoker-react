import { Button, Box, Card, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, Text, NumberInputStepper, Center, VStack, Spacer, Grid } from "@chakra-ui/react";
import { useState } from "react";


export default function Controls({chips, hand, setHand, setChips, handleClick, inGame, setIngame, toDiscard, setToDiscard, deckId}){

    const [bet, setBet] = useState(1)
    const [currBet, setCurrBet] = useState(null)

    let results = []

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
                results = assessHand(newHand)
                console.log(results)
                setChips(curr => parseInt(curr) + parseInt(bet*results[1]))
                setHand(newHand)
                setCurrBet(null)
                setToDiscard([])
                setIngame(false)
            })
        }else{
            results = assessHand(hand)
            console.log(results)
            setChips(curr => parseInt(curr) + parseInt(bet*results[1]))
            setCurrBet(null)
            setToDiscard([])
            setIngame(false)
        }
    }

    function assessHand(h){
        const cards = h.map((card)=> card.code)
        const findPairResults = findPairs(cards)
        if(findPairResults[0]){
            const cardsRemaining = findPairs(cards)[2]
            const matchCard = findPairs(cards)[1][0]
            if(findThree(cardsRemaining,matchCard)[0]){
                if(findThree(findThree(cardsRemaining,matchCard)[2],matchCard)[0]){
                    return(['Four of a Kind!', 25])
                }else if(findPairs(findThree(cardsRemaining,matchCard)[2])[0]){
                    return(['Full House!', 9])
                }else{
                    return(['Three of a Kind!', 3])
                }
            }else if (findPairs(findPairResults[2])[0]){
                if (findThree(findPairs(findPairResults[2])[2],findPairs(findPairResults[2])[1])[0]){
                    return(['Full House!', 9])
                }else{
                    return(['Two Pair!', 2])
                }
            }else{
                if(Number.isInteger(parseInt(matchCard))){
                    return(['Better Luck Next Time!', 0])
                }else{
                    return(['Jacks or Better!', 1])
                }
            }
        }else{
            if(findStraight(cards)[0]){
                if(findFlush(cards)){
                    if(findStraight(cards)[1]){
                        return(['ROYAL FLUSH!!', 250])
                    }else{
                        return(['Straight Flush!', 50])
                    }
                }else{
                    return(['Straight!', 4])
                }
            }else if(findFlush(cards)){
                return(['Flush!', 6])
            }else{
                return(['Better Luck Next Time!', 0])
            }
        }
    }

    function findPairs(cardsArray){
        let hasPairs = false
        let pairCard = ''
        let remainingCards = ''
        cardsArray.forEach((card, index) =>{
            const cardsArray2 = cardsArray.filter((otherCard,otherIndex)=>{
                return index !== otherIndex
            })
            cardsArray2.forEach((secondCard, secondIndex)=>{
                if((card[0] === secondCard[0])){
                    hasPairs = true
                    pairCard = card[0]
                    remainingCards = cardsArray2.filter((thirdCard,thirdIndex)=>{
                        return secondIndex !== thirdIndex
                    })
                }
            })
        })
        return [hasPairs, pairCard, remainingCards]
    }
    
    function findThree(remainingCards,pairCard){
        let hasThree = false
        let finalRemainingCards = []
        remainingCards.forEach((card,index)=>{
            if((card[0]=== pairCard)){
                hasThree = true
                finalRemainingCards = remainingCards.filter((remainingCard,remainingIndex)=>{
                    return index !== remainingIndex
                })
            }
        })
        return [hasThree, pairCard, finalRemainingCards]
    }
    
    function findFlush(cardsArray){
        let isFlush = true
        const toCheck = cardsArray[0][1]
        cardsArray.forEach((card)=>{
            if(card[1] !== toCheck){
                isFlush = false
            }
        })
        return isFlush
    }
    
    function findStraight(cardsArray){
        let isStraight = false
        let isRoyal = false
        const valuesArray = cardsArray.map(card => card[0])
        const intValues = []
        let intValuesConsecutive = true
        const strValues = []
        valuesArray.forEach((value)=>{
            if(Number.isInteger(parseInt(value))){
                if(parseInt(value) === 0){
                    intValues.push(10)
                }else{
                    intValues.push(parseInt(value))
                }
            }else{
                strValues.push(value)
            }
        })
        intValues.sort((a, b) => a - b)
        strValues.sort()
        intValues.forEach((value, index)=>{
            if(index === (intValues.length - 1)){
            }else if((value + 1) !== intValues[index+1]){
                intValuesConsecutive  = false
            }
        })
        if(intValuesConsecutive === true){
            if(intValues.length === 5){
                isStraight = true
            }else if(intValues[0] === 2 && intValues.length === 4){
                if(strValues[0] === 'A'){
                    isStraight = true
                }
            }else if(intValues[0] === 7 && intValues.length === 4){
                if(strValues[0] === 'J'){
                    isStraight = true
                }
            }else if(intValues[0] === 8 && intValues.length === 3){
                if(strValues[0] === 'J' && strValues[1] === 'Q'){
                    isStraight = true
                }
            }else if(intValues[0] === 9 && intValues.length === 2){
                if((strValues[0] === 'J') && (strValues[1] === 'K') && (strValues[2] === 'Q')){
                    isStraight = true
                }
            }else if(intValues[0] === 10){
                if((strValues[0] === 'A') && (strValues[1] === 'J') && (strValues[2] === 'K') 
                && (strValues[3] === 'Q')){
                    isStraight = true
                    isRoyal = true
                }
            }
        }
        return [isStraight, isRoyal]
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