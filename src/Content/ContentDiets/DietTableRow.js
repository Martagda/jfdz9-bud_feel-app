import React, { Component } from 'react';
import {
    TableRow,
    TableCell,
    Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    row: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class DietTableRow extends Component {
    render() {
        const { dietType, diet: { id, name, description, age, weight, period } } = this.props;
        const { classes } = this.props;
        console.log(dietType);

        return (
            <TableRow key={id} className={classes.row}>
                <TableCell >{name}</TableCell>
                <TableCell >
                    <Typography >{description}</Typography>
                </TableCell>
                <TableCell >{dietType}</TableCell>
                <TableCell numeric>{`${age.min} - ${age.max}`}</TableCell>
                <TableCell numeric>{`${weight.min} - ${weight.max}`}</TableCell>
                <TableCell numeric>{period}</TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(DietTableRow);