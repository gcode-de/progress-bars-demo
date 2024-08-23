import {useEffect, useState} from 'react';
import styled from 'styled-components';

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
            <FieldsContainer>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {title && <span>{title}</span>}
                    <ProgressBar>
                        <Progress width={progressWidth}/>
                        {budgetPosition !== "0%" && <BudgetIndicator position={budgetPosition}/>}
                    </ProgressBar>
                    <span>{timeDisplay}</span>
                </div>
            </FieldsContainer>
        </IssuePanelContainer>
    );
}

export default IssuePanel;

const IssuePanelContainer = styled.div`
    box-shadow: 0 0 6px #A2A2A2;
    background-color: #EFEFEF;
    padding: 20px;
    margin-bottom: 20px;
`;

const FieldsContainer = styled.div`
    margin-top: 5px;
`;

const ProgressBar = styled.div`
    height: 10px;
    background-color: #ccc;
    position: relative;
    flex-grow: 1;
    margin: 0 10px;
`;

const Progress = styled.div`
    height: 100%;
    background-color: #4caf50;
    width: ${props => props.width || '0%'};
    transition: width 0.5s ease-in-out;
`;

const BudgetIndicator = styled.div`
    height: calc(100% + 5px);
    width: 2px;
    background-color: black;
    position: absolute;
    left: ${props => props.position || '0%'};
    top: -5px;
`;
