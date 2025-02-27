import 'reflect-metadata';
import { container } from 'tsyringe';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AnyType } from 'one-frontend-framework';
import { AuthService } from './services/auth.Service';
import { AppRouterName } from './AppRouter';

/**
 * For protected route with authentication
 * @param param0 
 * @returns 
 */
export const ProtectedRoute = ({ children }: AnyType): React.ReactElement | null => {
    const authService = container.resolve(AuthService);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    async function initAuth(): Promise<void> {
        const isAuth = await authService.isAuthenticated();
        setIsAuthenticated(isAuth);
        setIsLoading(false);
    }

    useEffect(() => {
        // userEffect implement here
        initAuth();
    }, []);

    if (!isLoading)
    {
        if (!isAuthenticated) {
            // user is not authenticated
            return <Navigate to={AppRouterName.login} />;
        }
        return children;
    }
    else {
        return null;
    }
};