import React from 'react'
import { Box, Avatar, Text, Anchor } from 'grommet';
import Github from '../../assests/Github.png'
import AntAlmanac from '../../assests/AntAlmanac.png'
import ZotCourse from '../../assests/ZotCourse.png'
import ZotCurve from '../../assests/ZotCurve.png'


export const LearnMore = () => {
    return (
        <Box
            gridArea="Content"
            round={{ "size": "xsmall", "corner": "bottom" }}
            animation="fadeIn"
        >
            <Box
                direction="row"
                justify="center"
                align="center"
                pad="large"
            >
                <Anchor href="#"><Avatar src={Github} margin="small" size="large" /></Anchor>
                <Text alignSelf="center" size="30px" margin="small">|</Text>
                <Anchor href="#"><Avatar src={AntAlmanac} margin="small" size="large" /></Anchor>
                <Anchor href="#"><Avatar src={ZotCourse} margin="small" size="large" /></Anchor>
                <Anchor href="#"><Avatar src={ZotCurve} margin="small" size="large" /></Anchor>
            </Box>
            <Box
                justify="center"
                align="center"
                pad="medium"
                fill="vertical"
            >
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipis Duis tincidunt leo id nisl cursus viverra. Phasellus nec est suscipit,i ipsum, iaculis nec dictum eu, rutrum et ex. Nullam vestibulum facilisis ex in pretium. Phasellus odio mauris, posuere fermentum ultricies eget, porttitor non metus. Integer porttitor dui et porta maximus. In ut eros scelerisque, tempus tortor non, fermentum dolor. Proin at risus justo. Mauris congue sapien leo, eu tincidunt arcu imperdiet ac.
                </Text>
            </Box>
        </Box>
    )
}
