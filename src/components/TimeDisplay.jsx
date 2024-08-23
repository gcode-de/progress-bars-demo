import PropTypes from 'prop-types';

function TimeDisplay({hoursPassed, hoursTotal}) {
    const formatTime = (hours) => {
        const days = Math.floor(hours / 8);
        const remainingHours = hours % 8;
        const minutes = Math.round((remainingHours % 1) * 60);
        return `${days > 0 ? days + 'd ' : ''}${Math.floor(remainingHours)}:${minutes.toString().padStart(2, '0')}h`;
    };

    return <span>{formatTime(hoursPassed)} / {formatTime(hoursTotal)}</span>;
}

TimeDisplay.propTypes = {
    hoursPassed: PropTypes.number.isRequired,
    hoursTotal: PropTypes.number.isRequired,
};

export default TimeDisplay;
