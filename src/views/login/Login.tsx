import React from 'react';
import './Login.scss';
import languageHook from '../../common/hooks/languageHook';
import LoginHook from './Login.hook';
import NotReady from '../../common/components/notReady/NotReady';

function Login(): React.JSX.Element {
    const language = languageHook();
    const elHook = LoginHook();

    if (elHook.componentState.isReady) {
        return (
            <div className="container">
                <label htmlFor="uname"><b>{language.auth.username}</b></label>
                <input
                    type="text"
                    placeholder="Enter Username"
                    name="uname" required
                    value={elHook.componentState.model.username}
                    onChange={(e) => { elHook.componentState.handleFormInputChanged(e.target); }}
                />

                <label htmlFor="psw"><b>{language.auth.password}</b></label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    name="psw" required
                    value={elHook.componentState.model.password}
                    onChange={(e) => { elHook.componentState.handleFormInputChanged(e.target); }}
                />

                <button type="button" onClick={() => { elHook.login() }}>{language.auth.login}</button>
            </div>
        );
    }
    else {
        return (
            <NotReady></NotReady>
        );
    }
}

export default Login;
