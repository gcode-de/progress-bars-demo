import styled from 'styled-components';
import PropTypes from 'prop-types';

function ControlPanel({timeSpent, timeRemaining, timeOriginalEstimate, timeBudget, handleButtonClick}) {
    return (
        <ControlPanelContainer>
            <div>
                <FieldName>Time spent</FieldName>
                <Button onClick={() => handleButtonClick('aptis-esu-time-spent', -1)}>-</Button>
                <FieldValue>{timeSpent}h</FieldValue>
                <Button onClick={() => handleButtonClick('aptis-esu-time-spent', 1)}>+</Button>
            </div>
            <div>
                <FieldName>Remaining</FieldName>
                <Button onClick={() => handleButtonClick('aptis-esu-remaining', -1)}>-</Button>
                <FieldValue>{timeRemaining}h</FieldValue>
                <Button onClick={() => handleButtonClick('aptis-esu-remaining', 1)}>+</Button>
            </div>
            <div>
                <FieldName>Original estimate</FieldName>
                <Button onClick={() => handleButtonClick('aptis-esu-original-estimate', -1)}>-</Button>
                <FieldValue>{timeOriginalEstimate}h</FieldValue>
                <Button onClick={() => handleButtonClick('aptis-esu-original-estimate', 1)}>+</Button>
            </div>
            <div>
                <FieldName>Time budget</FieldName>
                <Button onClick={() => handleButtonClick('aptis-esu-time-budget', -1)}>-</Button>
                <FieldValue>{timeBudget}h</FieldValue>
                <Button onClick={() => handleButtonClick('aptis-esu-time-budget', 1)}>+</Button>
            </div>
        </ControlPanelContainer>
    );
}

ControlPanel.propTypes = {
    timeSpent: PropTypes.number.isRequired,
    timeRemaining: PropTypes.number.isRequired,
    timeOriginalEstimate: PropTypes.number.isRequired,
    timeBudget: PropTypes.number.isRequired,
    handleButtonClick: PropTypes.func.isRequired,
};

export default ControlPanel;

const ControlPanelContainer = styled.div`
    padding: 20px;

    & > div {
        margin-left: auto;
        margin-right: auto;
        width: 300px;
        margin-bottom: 10px;
    }
`;

const FieldName = styled.label`
    width: 140px;
    display: inline-block;
    font-weight: bold;
    color: #333;
`;

const FieldValue = styled.label`
    display: inline-block;
    width: 40px;
    text-align: center;
    background-color: #ffffff;
    margin-inline: 3px;
    line-height: 2em;
`;

const Button = styled.button`
    margin-bottom: 6px;
    border: 1px solid #ccc;
    background-color: #f4f4f4;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
    font-family: Arial, sans-serif;
    color: #333;

    &:hover {
        background-color: #e1e1e1;
    }
`;
