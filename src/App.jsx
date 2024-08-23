import {useState} from 'react';
import styled from 'styled-components';
import IssuePanel from './components/IssuePanel';
import ControlPanel from './components/ControlPanel';

function App() {
    const [timespent, setTimespent] = useState(1);
    const [timeoriginalestimate, setTimeoriginalestimate] = useState(4);
    const [timeestimate, setTimeestimate] = useState(3);
    const [timebudget, setTimebudget] = useState(0);

    const handleButtonClick = (field, increment) => {
        switch (field) {
            case 'aptis-esu-time-spent':
                setTimespent(prev => Math.min(Math.max(prev + increment, 0), 100));
                break;
            case 'aptis-esu-remaining':
                setTimeestimate(prev => Math.min(Math.max(prev + increment, 0), 100));
                break;
            case 'aptis-esu-original-estimate':
                setTimeoriginalestimate(prev => Math.min(Math.max(prev + increment, 0), 100));
                break;
            case 'aptis-esu-time-budget':
                setTimebudget(prev => Math.min(Math.max(prev + increment, 0), 100));
                break;
            default:
                break;
        }
    };

    return (
        <AppContainer>
            <IssuePanel
                timeSpent={timespent}
                timeRemaining={timeestimate}
                timeOriginalEstimate={timeoriginalestimate}
                timeBudget={timebudget}
                title="Time"
            />
            <ControlPanel
                timeSpent={timespent}
                timeRemaining={timeestimate}
                timeOriginalEstimate={timeoriginalestimate}
                timeBudget={timebudget}
                handleButtonClick={handleButtonClick}
            />
        </AppContainer>
    );
}

export default App;

const AppContainer = styled.div`
    padding: 20px;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    font-family: Arial, sans-serif;
`;
