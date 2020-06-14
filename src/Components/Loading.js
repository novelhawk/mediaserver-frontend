import React from 'react';
import loading from '../Images/Loading.png';
import '../StyleSheets/Loading.scss';

class Loading extends React.Component {
    render() { 
        return (
            <img className="SpinningImage" width={121} src={loading} alt="Loading" />
        );
    }
}
 
export default Loading;
