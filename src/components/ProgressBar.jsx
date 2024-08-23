import styled from 'styled-components';
import PropTypes from 'prop-types';

function ProgressBar({
                         budgetPosition = 0,
                         greenPercent = 0,
                         greyPercent = 0,
                         redPercent = 0,
                         whitePercent = 100,
                         blankPercent = 0
                     }) {
    const sections = [
        {color: 'green', width: `${greenPercent}%`},
        {color: 'grey', width: `${greyPercent}%`},
        {color: 'red', width: `${redPercent}%`},
        {color: 'white', width: `${whitePercent}%`},
        {color: 'blank', width: `${blankPercent}%`},
    ];
    return (
        <ProgressBarContainer>
            {sections
                .filter(section => parseFloat(section.width) > 0)
                .map((section) => (
                    <ProgressSection key={section.color} width={section.width} color={section.color}/>
                ))}
            <BudgetIndicator position={budgetPosition}/>
        </ProgressBarContainer>
    );
}

ProgressBar.propTypes = {
    budgetPosition: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    greenPercent: PropTypes.number,
    greyPercent: PropTypes.number,
    redPercent: PropTypes.number,
    whitePercent: PropTypes.number,
    blankPercent: PropTypes.number,
};

export default ProgressBar;

const ProgressBarContainer = styled.div`
    height: 10px;
    background-color: #ccc;
    position: relative;
    flex-grow: 1;
    margin: 0 10px;
    display: flex;
    box-sizing: border-box;
`;

const ProgressSection = styled.div`
    height: 100%;
    width: ${props => props.width || '0%'};
    background-color: ${props => {
        switch (props.color) {
            case 'green':
                return '#66BB6A';
            case 'grey':
                return '#BDBDBD';
            case 'red':
                return '#EF5350';
            case 'white':
                return '#F5F5F5';
            case 'blank':
                return 'transparent';
            default:
                return '#F5F5F5';
        }
    }};
    border: ${props => {
        switch (props.color) {
            case 'green':
                return '1px solid #4CAF50';
            case 'grey':
                return '1px dashed #9E9E9E';
            case 'red':
                return '1px dashed #E53935';
            case 'white':
                return '1px solid #E0E0E0';
            case 'blank':
                return 'none';
            default:
                return '1px solid #E0E0E0';
        }
    }};
    transition: width 0.5s ease-in-out;
    box-sizing: border-box;
`;

const BudgetIndicator = styled.div`
    height: calc(100% + 6px);
    width: 2px;
    background-color: black;
    position: absolute;
    left: calc(${props => `${props.position || 0}%`} - 1px);
    top: -3px;
    opacity: ${props => (props.position === 0 ? 0 : 1)};
    transition: left 0.5s ease-in-out, opacity 0.5s ease-in-out;
    box-sizing: border-box;
`;
