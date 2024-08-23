import {useEffect, useState} from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import TimeDisplay from './TimeDisplay';

function IssuePanel({timeSpent, timeRemaining, timeOriginalEstimate, timeBudget, title}) {
    const [progressWidth, setProgressWidth] = useState('0%');
    const [budgetPosition, setBudgetPosition] = useState('0%');
    const [timeDisplay, setTimeDisplay] = useState('');

    useEffect(() => {
        updateProgressbar();
    }, [timeSpent, timeOriginalEstimate, timeRemaining, timeBudget]);

    const formatTime = (hours) => {
        const days = Math.floor(hours / 8);
        const remainingHours = hours % 8;
        const minutes = Math.round((remainingHours % 1) * 60);
        return `${days > 0 ? days + 'd ' : ''}${Math.floor(remainingHours)}:${minutes.toString().padStart(2, '0')}h`;
    };

    const updateProgressbar = () => {
        const total = Math.max(timeOriginalEstimate, timeBudget, timeSpent + timeRemaining);
        const spentProgress = total ? (timeSpent / total) * 100 : 0;
        const budgetIndicator = total ? (timeBudget / total) * 100 : 0;

        setProgressWidth(`${Math.min(spentProgress, 100)}%`);
        setBudgetPosition(`${Math.min(budgetIndicator, 100)}%`);

        const maxTime = Math.max(timeOriginalEstimate, timeSpent + timeRemaining);
        setTimeDisplay(`${formatTime(timeSpent)} / ${formatTime(maxTime)}`);
    };

    return (
        <IssuePanelContainer>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {title && <span>{title}</span>}
                <ProgressBar progressWidth={progressWidth} budgetPosition={budgetPosition}/>
                <TimeDisplay timeDisplay={timeDisplay}/>
            </div>
        </IssuePanelContainer>
    );
}

export default IssuePanel;

const IssuePanelContainer = styled.div`
    box-shadow: 0 0 6px #A2A2A2;
    background-color: #EFEFEF;
    padding: 20px;
    padding-top: 25px;
    margin-bottom: 20px;
`;
