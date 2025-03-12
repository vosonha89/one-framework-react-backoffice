import React from 'react';
import './Login.scss';
import languageHook from '../../common/hooks/languageHook';
import LoginHook from './Login.hook';
import NotReady from '../../common/components/notReady/NotReady';
import { AppRouterName } from '../../AppRouter';
import { UIHelper } from '../../common/functions/uiHelper';

function Login(): React.JSX.Element {
    const language = languageHook();
    const elHook = LoginHook();

    if (elHook.componentState.isReady) {
        return (
            <div className="page page-center page-content">
                <div className="container container-tight py-4">
                    <div className="text-center mb-4">
                        <a href={AppRouterName.home} className="navbar-brand navbar-brand-autodark d-flex justify-content-center align-items-center">
                            <img className="w-50px" src="/logo.svg" alt="app-logo"></img>
                            <h1 className="mb-0">{language.appName}</h1>
                        </a>
                    </div>
                    <div className="card card-md">
                        <div className="card-body">
                            <h2 className="h2 text-center mb-4">
                                {language.auth.loginHeader}
                            </h2>
                            <div className="mb-3">
                                <label htmlFor="userEmail" className="form-label">
                                    {language.auth.username}
                                </label>
                                <input
                                    id="userEmail"
                                    type="email"
                                    placeholder={language.auth.username}
                                    name="username" required
                                    value={elHook.componentState.model.username}
                                    onChange={(e) => { elHook.handleFormInputChanged(e.target); }}
                                    className={
                                        "form-control" + (elHook.componentState.model.checkError('username') ? " is-invalid" : "")
                                    }
                                    autoComplete="email" />
                                {
                                    elHook.componentState.model.checkError('username') &&
                                    <div className="invalid-feedback"
                                        dangerouslySetInnerHTML={UIHelper.createElementFromString(elHook.componentState.model.getError('username'))}>
                                    </div>
                                }
                            </div>
                            <div className="mb-2">
                                <label htmlFor="userPassword" className="form-label">
                                    {language.auth.password}
                                </label>
                                <div
                                    className={
                                        "input-group" + (elHook.componentState.model.checkError('password') ? " is-invalid has-validation" : " input-group-flat")
                                    }>
                                    <input
                                        id="userPassword"
                                        type="password"
                                        placeholder={language.auth.password}
                                        name="password" required
                                        value={elHook.componentState.model.password}
                                        onChange={(e) => { elHook.handleFormInputChanged(e.target); }}
                                        className={
                                            "form-control" + (elHook.componentState.model.checkError('password') ? " is-invalid border-end border-danger" : "")
                                        }
                                        autoComplete="off"
                                        onKeyDown={async (event) => {
                                            if (event.key == "Enter") {
                                                await elHook.login();
                                            }
                                        }}
                                    />
                                    <span
                                        className={
                                            "input-group-text bg-white" + (elHook.componentState.model.checkError('password') ? " d-none" : "")
                                        }
                                    >
                                        <button
                                            className="link-secondary cursor-pointer btn border-0 p-0"
                                            title="Show password"
                                            data-bs-toggle="tooltip"
                                            onClick={() => { elHook.showHidePassword(); }}
                                        >
                                            <i className="ti ti-eye fs-2"></i>
                                        </button>
                                    </span>
                                </div>
                                {
                                    elHook.componentState.model.checkError('password') &&
                                    <div className="invalid-feedback"
                                        dangerouslySetInnerHTML={UIHelper.createElementFromString(elHook.componentState.model.getError('password'))}>
                                    </div>
                                }
                            </div>
                            <div className="form-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => { elHook.login() }}>{language.auth.login}</button>
                            </div>
                        </div>
                    </div>
                </div>
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
