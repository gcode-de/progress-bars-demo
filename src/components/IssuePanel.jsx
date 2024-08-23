import {useEffect, useState, useCallback} from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import TimeDisplay from './TimeDisplay';

function IssuePanel({timeSpent, timeRemaining, timeOriginalEstimate, timeBudget, title}) {
    const [budgetPosition, setBudgetPosition] = useState('0%');

    const [hoursPassed, setHoursPassed] = useState('');
    const [hoursTotal, setHoursTotal] = useState('');

    const [greenPercent, setGreenPercent] = useState(0);
    const [greyPercent, setGreyPercent] = useState(0);
    const [redPercent, setRedPercent] = useState(0);
    const [whitePercent, setWhitePercent] = useState(100);
    const [blankPercent, setBlankPercent] = useState(0);

    const updateProgressbar = useCallback(() => {
        const total = Math.max(timeOriginalEstimate, timeBudget, timeSpent + timeRemaining);
        const spentProgress = total ? (timeSpent / total) * 100 : 0;
        const remainingProgress = total ? (timeRemaining / total) * 100 : 0;

        const overrun = Math.max(0, timeSpent + timeRemaining - timeOriginalEstimate);
        const redProgress = total ? (overrun / total) * 100 : 0;

        const remainingGreyProgress = remainingProgress - redProgress;
        const whiteProgress = 100 - spentProgress - remainingProgress;

        setGreenPercent(spentProgress);
        setGreyPercent(Math.max(0, remainingGreyProgress));
        setRedPercent(redProgress);
        setWhitePercent(Math.max(0, whiteProgress));
        setBlankPercent(0);

        const budgetIndicator = total ? (timeBudget / total) * 100 : 0;
        setBudgetPosition(`${Math.min(budgetIndicator, 100)}%`);

        const maxTime = Math.max(timeOriginalEstimate, timeSpent + timeRemaining);
        setHoursPassed(timeSpent);
        setHoursTotal(maxTime);
    }, [timeSpent, timeRemaining, timeOriginalEstimate, timeBudget]);

    useEffect(() => {
        updateProgressbar();
    }, [timeSpent, timeOriginalEstimate, timeRemaining, timeBudget, updateProgressbar]);

    return (
        <IssuePanelContainer>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {title && <span>{title}</span>}
                <ProgressBar
                    budgetPosition={budgetPosition}
                    greenPercent={greenPercent}
                    greyPercent={greyPercent}
                    redPercent={redPercent}
                    whitePercent={whitePercent}
                    blankPercent={blankPercent}
                />
                <TimeDisplay hoursPassed={hoursPassed} hoursTotal={hoursTotal}/>
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
