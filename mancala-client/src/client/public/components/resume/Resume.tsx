import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';


import {resume} from '../../textJson/Resume';

import './resume.css'
import {ListItemAvatar, Typography} from "@material-ui/core";



interface IResumeProps {

}

interface IResumeState {

}

interface ResumeItem {
    text: string
    level?: number
}

interface ResumeSegment {
    items: Array<ResumeItem>;
    label: string;
}


export default class Resume extends React.Component<IResumeProps, IResumeState> {



    generateResumeSegment(segment: Array<ResumeSegment>) {

        if (segment) {
            const data = segment.map((element) => {
                return (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>{element.label}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {this.generate(element.items)}
                        </AccordionDetails>

                    </Accordion>
                )
            });

            return data;
        }
        return;
    }

    generate(items: Array<ResumeItem>) {

        if (items) {
            let data;
            data = items.map((item) => {
                return (
                    <div >
                        <ListItem id="list-item">
                            <ListItemText>{item.text}</ListItemText>
                            {item.level &&
                            <ListItemAvatar>
                                    <LinearProgress value={item.level} variant="determinate"/>
                            </ListItemAvatar>
                            }
                        </ListItem>

                        <Divider variant="middle"/>
                    </div>
                )
            })

            return (<List >{data}</List>)
        }
        return;

    }

    render() {
        return (
            <div>
                {this.generateResumeSegment(resume)}
            </div>
        )
    }
}