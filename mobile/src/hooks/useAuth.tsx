import {useContext} from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { AuthContextDataProps } from '../Contexts/types';

export function useAuth():AuthContextDataProps {
    const context = useContext(AuthContext);
    
    return context;
}
