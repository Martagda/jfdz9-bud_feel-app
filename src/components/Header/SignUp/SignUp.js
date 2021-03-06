import React, { Component } from 'react';
import firebase from 'firebase';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Divider } from '@material-ui/core';

class SignUp extends Component {

    state = {
        open: false,
        email: '',
        password: '',
        error: null
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ error: null });
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(
            error => this.setState({ error })
        ).then(() => {
            if (this.state.error === null) {
                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set({favs: ''});
                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set({form: {}});
                this.handleClose()
            }
        });
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen} color='inherit'>Zarejestruj</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Zarejestruj</DialogTitle>
                    <Divider style={{marginBottom: '.6rem'}}/>

                    <DialogContent>
                        {
                            this.state.error === null
                                ? <DialogContentText>Aby się zarejestrować wprowadź adres e-mail oraz hasło.</DialogContentText>
                                : <DialogContentText color='error'>Niepoprawny format adresu e-mail lub taki użytkownik już istnieje.</DialogContentText>

                        }
                        <TextField
                            autoFocus
                            margin="dense"
                            id="outlined-name"
                            label="E-mail"
                            type="email"
                            name="email"
                            variant='outlined'
                            required
                            fullWidth
                            onChange={this.handleChange}
                            style={{marginTop: '1.2rem'}}
                        />
                        <TextField
                            margin="dense"
                            id="outlined-password"
                            label="Hasło"
                            type="password"
                            name="password"
                            variant='outlined'
                            onChange={this.handleChange}
                            required
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Zamknij
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Zarejestruj
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default SignUp;