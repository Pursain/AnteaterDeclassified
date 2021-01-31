import React, { useEffect, useState, useRef } from 'react'
import { Grid, Box, Avatar, Text } from 'grommet'
import { Scrollbar } from "react-scrollbars-custom";
import Cat from '../../assests/cat.png'

export const RMPReviews = ({ selectedInstructor }) => {
    const scrollRef = useRef()
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        if (selectedInstructor) {
            // fetch
            const TEMP_REVIEWS = [{
                text: `Review on ${selectedInstructor.instructor} Fusce elementum justo vitae felis sollicitudin pharetra. Sed mattis id purus nec sollicitudin. Quisque ullamcorper convallis justo sit amet porttitor. Suspendisse tincidunt ultricies orci, non lacinia odio tempor at. Donec iaculis tellus nibh, eu lacinia erat pulvinar vitae. Etiam nec tempus leo. Nulla vel erat quis justo laoreet volutpat. Fusce quis neque a turpis elementum aliquet. Donec mollis non leo non convallis.`,
                date: "12/12/12"
            }, {
                text: `Review on ${selectedInstructor.instructor} Fusce elementum justo vitae felis sollicitudin pharetra. Donec mollis non leo non convallis.`,
                date: "12/12/12"
            }, {
                text: `Review on ${selectedInstructor.instructor} Fusce elementum justo vitae felis sollicitudin pharetra. Sed mattis id purus nec sollicitudin. Quisque ullamcorper convallis justo sit amet porttiio tempor at. Donec iaculis tellus nibh, eu lacinia erat pulvinar vitae. Etiam nec tempus leo. Nulla vel erat quis justo laoreet volutpat. Fusce quis neque a turpis elementum aliquet. Donec mollis non leo non convallis.`,
                date: "12/12/12"
            }, {
                text: `Review on ${selectedInstructor.instructor} Fusce elementum justo vitae felis sollicitudin pharetra. Sed mattis id purus nec sollicitudin. Quisque u at. Donec iaculis tellus nibh, eu lacinia erat pulvinar vitae. Etiam nec tempus leo. Nulla vel erat quis justo laoreet volutpat. Fusce quis neque a turpis elementum aliquet. Donec mollis non leo non convallis.`,
                date: "12/12/12"
            }, {
                text: `Review on ${selectedInstructor.instructor}`,
                date: "12/12/12"
            }, {
                text: `Review on ${selectedInstructor.instructor} Fusce elementum justo vitae felis sollicitudin pharetra. Sed mattis id purus nec sollicitudin. Quisque u at. Donec iaculis tellus nibh, eu lacinia erat pulvinar vitae. Etiam nec tempus leo. Nulla vel erat quis justo laoreet volutpat. Fusce quis neque a turpis elementum aliquet. Donec mollis non leo non convallis.`,
                date: "12/12/12"
            }, {
                text: `Professor Douglas is so well-rounded and the perfect professor during these rough times. He doesn't take attendance, only weekly quizzes (no tests), little homework, extra credit, and no final. I wouldn't say it's a show up and pass class, but 100% an easy A! Douglas is just so kind, informative, and organized. I really loved him, he's great!!`,
                date: "12/12/12"
            },]
            setReviews(TEMP_REVIEWS)
        }
    }, [selectedInstructor, setReviews])

    // scroll to bottom
    useEffect(() => {
        if (scrollRef)
            scrollRef.current.scrollToBottom()
    }, [reviews, scrollRef])

    return (
        <Box background="light-3" round={{ size: "small", corner: "bottom-right" }} style={{ overflowY: "auto" }}>
            <Scrollbar ref={scrollRef}>
                {reviews && reviews.map((review, index) => (
                    <Grid
                        rows={['flex']}
                        columns={['80px', 'flex']}
                        areas={[
                            { name: 'Icon', start: [0, 0], end: [0, 0] },
                            { name: 'Review', start: [1, 0], end: [1, 0] }
                        ]}
                        key={index}
                    >
                        <Box gridArea="Icon" margin="small" align="center" justify="end">
                            <Avatar size="medium" src={Cat} />
                        </Box>

                        <Box gridArea="Review" round="small" margin="small" background="light-4" pad="small">
                            <Text textAlign="end">{review.date}</Text>
                            <Text textAlign="start">{review.text}</Text>
                        </Box>
                    </Grid>
                ))}
            </Scrollbar>
        </Box >
    )
}
