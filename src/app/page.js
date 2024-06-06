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
  const [chips, setChips] = useState(1)
  const [inGame, setIngame] = useState(false)

  
  function handleClick(e){
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(r => r.json())
    .then(data => {
      setDeckId(data.deck_id)
      fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`)
      .then(r  => r.json())
      .then(result => {
        setHand(result.cards)
      })
    })}


  return (
    <>
      <Heading>Virtual Poker</Heading>
      <VStack paddingY={'10px'} bg={'green'}>
        <Hand hand={hand} inGame={inGame} setToDiscard={setToDiscard}/>
        <Controls hand={hand} setHand={setHand} chips={chips} deckId={deckId} toDiscard={toDiscard} setToDiscard={setToDiscard} setChips={setChips} handleClick={handleClick} inGame={inGame} setIngame={setIngame}/>
      </VStack>
    </>
  )
}