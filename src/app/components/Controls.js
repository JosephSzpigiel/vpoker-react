import { Button, Box, Card, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, Text, NumberInputStepper, Center, VStack, Spacer, Grid } from "@chakra-ui/react";
import { useState } from "react";


export default function Controls({chips, setChips, handleClick, inGame, setIngame}){

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
        setIngame(false)
        setChips(curr => parseInt(curr) + parseInt(bet))
        setCurrBet(null)
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
                    <Button onClick={inGame ? handleEnd : handleBet}>{inGame ? 'Redeal' : 'Place Bet'}</Button>
                </Flex>
            </VStack>
        </Card>
    )
}