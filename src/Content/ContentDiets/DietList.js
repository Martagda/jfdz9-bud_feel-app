import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Typography, Paper} from '@material-ui/core';

import DietFilter from './DietFilter';
import DietTable from './DietTable';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    root2: {
        width: '100%',
    },
    table: {
        minWidth: 700,
    },
});


class DietList extends Component {

    state = {
        diets: [],
        dietTypes: [],
        periods: [],
        filter: {
            text: '',
            type: '',
            period: '',
        }
    };

    componentDidMount() {
        const p1 = fetch('/data/diets.json')
            .then(response => response.json());
        const p2 = fetch('/data/types.json')
            .then(response => response.json());
        Promise.all([p1, p2]).then(([diets, dietTypes]) => {
            const periods =
                diets.map(diet => diet.period)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .sort((a, b) => a - b);
            this.setState({
                diets,
                dietTypes,
                periods,
            })
        })
    }

    onFilterChanged = filter => {
        this.setState({
            filter: {
                ...this.state.filter,
                text: filter,
            }
        })
    };

    onTypeChanged = type => {
        this.setState({
            filter: {
                ...this.state.filter,
                type: type,
            }
        })
    };

    onPeriodChanged = period => {
        this.setState({
            filter: {
                ...this.state.filter,
                period: period,
            }
        })
    };

    getDiets() {
        return this.state.diets.filter(diet => {
            return diet.name.toLowerCase().includes(this.state.filter.text.toLowerCase())
                && (this.state.filter.type === ''
                    || this.state.dietTypes[diet.typeId - 1].name === this.state.filter.type)
                && (this.state.filter.period === ''
                    || diet.period === this.state.filter.period);
        })
    }

    render() {
        const {dietTypes, periods} = this.state;
        const {classes} = this.props;

        return (
            <Fragment>
                <Typography variant='display3'>Lista Diet</Typography>
                <Paper className={classes.root}>
                    <DietFilter
                        onFilterChanged={this.onFilterChanged}
                        onTypeChanged={this.onTypeChanged}
                        onPeriodChanged={this.onPeriodChanged}
                        periods={periods}
                        dietTypes={dietTypes}
                        filter={this.state.filter.text}/>
                </Paper>
                <Paper className={classes.root}>
                    <DietTable diets={this.getDiets()} dietTypes={dietTypes}/>
                </Paper>
            </Fragment>
        )
    }
}

export default withStyles(styles)(DietList);

