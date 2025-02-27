import 'reflect-metadata';
import { useEffect, useState } from 'react';
import { HomeState } from './Home.state';

export function HomeHook() {
    const [componentState, setcomponentState] = useState(new HomeState());

    async function loadData(): Promise<void> {
        const pageState: HomeState = componentState.copy();
        await pageState.init();
        setcomponentState(pageState);
    }

    useEffect(() => {
        // userEffect implement here
        loadData();
    }, []);
    return {
        componentState
    };
}