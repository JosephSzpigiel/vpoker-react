'use client'
import { Link } from '@chakra-ui/next-js'
import { Button, Center, Heading, VStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Hand from './components/Hand'
import Controls from './components/Controls'

export default function Page() {

  const defaultCard = {'image': 'https://www.deckofcardsapi.com/static/img/back.png'}
  const defaultHand = [defaultCard, defaultCard, defaultCard, defaultCard, defaultCard]

  const [deckId, setDeckId] = useState('')
  const [hand, setHand] = useState(defaultHand)
  const [toDiscard, setToDiscard] = useState([])
  const [chips, setChips] = useState(3)
  const [inGame, setIngame] = useState(false)

  
  function handleClick(e){
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(r => r.json())
    .then(data => {
      console.log(data.deck_id)
      setDeckId(data.deck_id)
      fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`)
      .then(r  => r.json())
      .then(result => {
        setHand(result.cards)
      })
    })}

    useEffect(() => {
      console.log("List is updated", hand);
  }, [hand]);

  function testToDiscard(){
    console.log(toDiscard)
  }


  return (
    <>
      <Heading>Virtual Poker</Heading>
      <Center height={'lg'} bg={'skyblue'}>
        <VStack>
          <Hand hand={hand} inGame={inGame} setToDiscard={setToDiscard}/>
          <Button onClick={testToDiscard}>Test</Button>
          <Controls hand={hand} setHand={setHand} chips={chips} deckId={deckId} toDiscard={toDiscard} setToDiscard={setToDiscard} setChips={setChips} handleClick={handleClick} inGame={inGame} setIngame={setIngame}/>
        </VStack>
      </Center>
    </>
  )
}