import copyImg from '../../assets/images/copy.svg';

import './style.scss';

type RoomCodeProps = {
    code: string
}

export function RoomCode(props: RoomCodeProps) {
    return(
        <button className = "roo-code">
        <div>
            <img src={copyImg} alt="copy" />
        </div>
        <span>Sala #{props.code}</span>
    </button>
    );
}