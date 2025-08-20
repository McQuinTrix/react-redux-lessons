import {formatDistanceToNow, parseISO} from "date-fns";

const TimeAgo = ({ timestamp }) => {
    let timeAgoStr = '';

    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgoStr = `${timePeriod} ago`
    }

    return <span title={timestamp}>
        &nbsp;
        <i>{timeAgoStr}</i>
    </span>
}

export default TimeAgo;
