import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectWelcomeMessage } from '../Auth/store';


const Home: React.FC = () => {
    const welcomeMessage = useSelector(selectWelcomeMessage)
    console.log(welcomeMessage, '123')
    return <span>{welcomeMessage}</span>
}


export default Home