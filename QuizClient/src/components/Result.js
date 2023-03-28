import { Button, Card, CardContent, Container, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { createAPIEndpoint, ENDPOINTS } from '../api'
import useStateContext from '../hooks/useStateContext'
import { green } from '@mui/material/colors';

export default function Result() {
    const { context, setContext } = useStateContext();
    const [score, setScore] = useState(0);
    const [participantName, setParticipantName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        createAPIEndpoint(ENDPOINTS.participant)
            .fetchById(context.participantId)
            .then((res) => {
                setParticipantName(res.data.name);
            });

        createAPIEndpoint(ENDPOINTS.getAnswers)
            .post()
            .then(res => {
                calculateScore(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    const calculateScore = (questionAnswers) => {
        let tempScore = 0;

        for (let i = 0; i < 4; i++) {
            if (context.selectedOptions[i].selected === questionAnswers[i].questionAnswer) {
                tempScore++;
            }
        }

        setScore(tempScore);
    }

    const restart = () => {
        setContext({
            selectedOptions: []
        })
        navigate("/quiz")
    }

    const submitScore = () => {
        createAPIEndpoint(ENDPOINTS.participant)
            .put(context.participantId, {
                participantId: context.participantId,
                score: score,
            })
            .then(() => {
                alert("Your result successfully submited!");
            })
            .catch(err => { console.log(err) })
    }

    return (
        <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
                    <Typography variant="h4">Congratulations, {participantName}!</Typography>
                    <Container>
                        <div>
                            &nbsp;
                        </div>
                    </Container>
                    <Typography variant="h6">
                        YOUR SCORE
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        <Typography variant="span" color={green[500]}>
                            {score}
                        </Typography>/4
                    </Typography>

                    <Container>
                        <div>
                            &nbsp;
                            &nbsp;
                        </div>
                    </Container>

                    <Button variant="contained"
                        sx={{ mx: 2 }}
                        size="big"
                        onClick={submitScore}>
                        Submit
                    </Button>
                    <Button variant="contained"
                        sx={{ mx: 2 }}
                        size="big"
                        onClick={restart}>
                        Re-try
                    </Button>
                </CardContent>
            </Box>
        </Card>
    )
}