import { Card, CardContent, CardHeader, LinearProgress, List, ListItemButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import useStateContext from "../hooks/useStateContext";

export default function Quiz() {

    const [questions, setQuestions] = useState([])
    const [questionIndex, setQuestionIndex] = useState(0);
    const { context, setContext } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.question)
            .fetch()
            .then(res => {
                setQuestions(res.data)
            })
            .catch(err => { console.log(err); })
    }, [])

    const updateAnswer = (qnId, optionIdx) => {
        const temp = [...context.selectedOptions]
        temp.push({
            qnId,
            selected: optionIdx
        })
        if (questionIndex < 3) {
            setContext({ selectedOptions: [...temp] })
            setQuestionIndex(questionIndex + 1)
        }
        else {
            setContext({ selectedOptions: [...temp] })
            navigate("/result")
        }
    }

    return (
        questions.length !== 0
            ? <Card sx={{ maxWidth: 640, mx: "auto", mt: 5,
            "& .MultiCardHeader-action" : {m:0, alignSelf: "center"} }}>
                <CardHeader title={"Question " + (questionIndex + 1) + " of 4"}></CardHeader>
                <Box>
                    <LinearProgress variant="determinate" value={((questionIndex + 1) * 100/4)} />
                </Box>
                <CardContent>   
                    <Typography variant="h6">
                        {questions[questionIndex].questionText}
                    </Typography>
                    <List>
                        {questions[questionIndex].options.map((item, index) =>
                            <ListItemButton key={index} onClick={() => updateAnswer(questions[questionIndex].questionId, index)}>
                                <div>
                                    {item}
                                </div>
                            </ListItemButton>
                        )}
                    </List>
                </CardContent>
            </Card>
            : null
    )
}