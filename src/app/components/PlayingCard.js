import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@chakra-ui/react"
import { useState } from "react"
export default function PlayingCard({card}){

    const [discard, setDiscard] = useState(false)
    function handleDiscard(e){
        setDiscard(curr => !curr)
    }

    return(
        <Card className={[discard ? "discard" : null]}>
            <CardBody>
                <Image
                src={card.image}
                />
                <Button onClick={handleDiscard}>Discard</Button>
            </CardBody>
        </Card>
    )
}