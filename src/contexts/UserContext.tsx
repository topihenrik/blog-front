import { createContext } from 'react';
import { getEmptyContext } from '../utils/getemptycontext.ts';

export const UserContext = createContext(getEmptyContext());
