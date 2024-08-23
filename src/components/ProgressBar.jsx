import styled from 'styled-components';

function ProgressBar({progressWidth, budgetPosition}) {
    return (
        <ProgressBarContainer>
            <Progress width={progressWidth}/>
            {budgetPosition !== "0%" && <BudgetIndicator position={budgetPosition}/>}
        </ProgressBarContainer>
    );
}

export default ProgressBar;

const ProgressBarContainer = styled.div`
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
