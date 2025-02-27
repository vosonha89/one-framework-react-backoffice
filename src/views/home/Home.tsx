import React from 'react';
import './Home.scss';
import LanguageHook from '../../common/hooks/languageHook';
import { HomeHook } from './Home.hook';
import NotReady from '../../common/components/notReady/NotReady';

function Home(): React.JSX.Element {
    const language = LanguageHook();
    const elHook = HomeHook();
    if (elHook.componentState.isReady) {
        return (
            <div className="home-view">
                {language.label.hi}
            </div>
        );
    }
    else {
        return (
            <NotReady></NotReady>
        );
    }
}

export default Home;